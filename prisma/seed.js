import { PrismaClient } from '@prisma/client';
import fs from 'node:fs/promises';
import path from 'node:path';
import { randomUUID } from 'node:crypto';

const prisma = new PrismaClient();

const UPLOAD_DIR = path.join(process.cwd(), 'database', 'uploads');
const PLACEHOLDER_BASES = [
	(seed, w, h) => `https://picsum.photos/seed/${encodeURIComponent(seed)}/${w}/${h}.jpg`,
	(_seed, w, h) => `https://placekitten.com/${w}/${h}`,
	(_seed, w, h) => `https://placebear.com/${w}/${h}`
];

// Config
const VENDOR_COUNT = 5; // number of vendor users to create
const ARTICLES_TOTAL = 30; // total articles across all vendors
const IMAGES_PER_ARTICLE_MIN = 2;
const IMAGES_PER_ARTICLE_MAX = 4;

// Simple helpers
const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const sample = (arr) => arr[randInt(0, arr.length - 1)];

const adjectives = [
	'Ultra', 'Eco', 'Pro', 'Smart', 'Compact', 'Premium', 'Classic', 'Modern', 'Advanced', 'Lite'
];
const nouns = [
	'Phone', 'Laptop', 'Headphones', 'Backpack', 'Shoes', 'Watch', 'Mixer', 'Lamp', 'Camera', 'Speaker',
	'Keyboard', 'Mouse', 'Mug', 'Bottle', 'Fan', 'Chair', 'Table', 'Jacket', 'T-Shirt', 'Sneakers'
];
const categories = [
	'electronique', 'maison', 'mode', 'sport', 'livres', 'beauté', 'jardin', 'bureau', 'gaming', 'cuisine'
];

async function ensureUploadDir() {
	await fs.mkdir(UPLOAD_DIR, { recursive: true });
}

async function downloadPlaceholderToUploads(seed, width = 800, height = 600) {
	// Try multiple providers for robustness
	let lastErr;
	for (const makeUrl of PLACEHOLDER_BASES) {
		const url = makeUrl(seed, width, height);
		try {
			const res = await fetch(url, { redirect: 'follow' });
			if (!res.ok) {
				lastErr = new Error(`Failed to fetch image: ${url} -> ${res.status}`);
				continue;
			}
			const arrayBuffer = await res.arrayBuffer();
			const buffer = Buffer.from(arrayBuffer);
			const fileName = `${randomUUID()}.jpg`;
			const filePath = path.join(UPLOAD_DIR, fileName);
			await fs.writeFile(filePath, buffer);
			return `/uploads/${fileName}`; // what the app expects in DB
		} catch (e) {
			lastErr = e;
		}
	}
	throw lastErr ?? new Error('All placeholder providers failed');
}

function makeUniqueTitle(existing) {
	let tries = 0;
	while (tries < 10000) {
		const title = `${sample(adjectives)} ${sample(nouns)} ${randInt(100, 999)}`;
		if (!existing.has(title)) {
			existing.add(title);
			return title;
		}
		tries++;
	}
	throw new Error('Unable to generate a unique article title');
}

function makeTags() {
	// join with spaces since UI splits by spaces
	const count = randInt(1, 3);
	const picks = new Set();
	while (picks.size < count) picks.add(sample(categories));
	return Array.from(picks).join(' ');
}

async function createVendors(count) {
	const vendors = [];
	for (let i = 0; i < count; i++) {
		const id = randomUUID();
		const email = `vendor_${i + 1}@example.com`;
		const vendor = await prisma.user.upsert({
			where: { email },
			update: {},
			create: {
				id,
				name: `Vendeur ${i + 1}`,
				email,
				emailVerified: true,
				password: null,
				image: null,
				vender: true,
				createdAt: new Date(),
				updatedAt: new Date()
			}
		});
		vendors.push(vendor);
	}
	return vendors;
}

async function createArticleForUser(userId, titleSet) {
	const article = await prisma.articles.create({
		data: {
			userId,
			titre: makeUniqueTitle(titleSet),
			description: 'Produit fictif pour tests et démonstrations. Images libres (picsum.photos).',
			tag: makeTags(),
			prix: randInt(1000, 150000),
			stock: randInt(1, 50)
		}
	});

	// Attach 2-4 images
	const imageCount = randInt(IMAGES_PER_ARTICLE_MIN, IMAGES_PER_ARTICLE_MAX);
	const urls = [];
	for (let i = 0; i < imageCount; i++) {
		const seed = `${article.titre}-${i}-${randomUUID()}`;
		const url = await downloadPlaceholderToUploads(seed);
		urls.push(url);
	}

	await Promise.all(
		urls.map((url) =>
			prisma.articleImages.create({
				data: { articleId: article.id, image: url }
			})
		)
	);

	return { article, images: urls };
}

async function main() {
	console.log('Seeding database with fake articles and local royalty-free images...');
	await ensureUploadDir();

	const vendors = await createVendors(VENDOR_COUNT);
	console.log(`Ensured ${vendors.length} vendor users.`);

	const titleSet = new Set();
	let created = 0;
	const tasks = [];
	for (let i = 0; i < ARTICLES_TOTAL; i++) {
		const vendor = sample(vendors);
		tasks.push(createArticleForUser(vendor.id, titleSet));
	}
	const results = await Promise.all(tasks);
	created = results.length;

	const imageTotal = results.reduce((sum, r) => sum + r.images.length, 0);
	console.log(`Created ${created} articles and ${imageTotal} images.`);
}

main()
	.catch((e) => {
		console.error(e);
		process.exitCode = 1;
	})
	.finally(async () => {
		await prisma.$disconnect();
	});


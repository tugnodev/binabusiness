import { readFile } from 'node:fs/promises';
import path from 'node:path';

export const GET = async ({ params }) => {
    const slug = params.slug;
    const filePath = path.join(process.cwd(), 'database', 'uploads', slug);
    
    try {
        const file = await readFile(filePath);
        const extension = path.extname(filePath).slice(1);
        const contentType = getContentType(extension);
        
        return new Response(file, {
            headers: {
                'Content-Type': contentType,
                'Cache-Control': 'public, max-age=31536000', // Cache for 1 year
            },
        });
    } catch (error) {
        console.error('File serving error:', error);
        return new Response('File not found', { status: 404 });
    }
};

function getContentType(extension: string): string {
    const types: Record<string, string> = {
        jpg: 'image/jpeg',
        jpeg: 'image/jpeg',
        png: 'image/png',
        gif: 'image/gif',
        webp: 'image/webp',
        svg: 'image/svg+xml',
        ico: 'image/x-icon',
        pdf: 'application/pdf',
    };
    
    return types[extension.toLowerCase()] || 'application/octet-stream';
}
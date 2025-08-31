import { prisma } from '$lib/server/prisma.js';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';

export type ImageData = {
    id: number,
    articleId: number,
    image: string,
};


class ImageRepo {
    async saveImage( articleId: number, urls: string[]) {
        const image = urls.map(async url => await prisma.articleImages.create({
            data: {
                articleId,
                image: url,
            }
        }));
        return image;
    }

    async deleteImage(image: ImageData) {
        //delete from fs
        const deleted = await imageFsRepo.deleteImage(image.image);
        if(!deleted) {
            console.log("Image doesn't exist in fs or failed to delete" + deleted);
        }
        const imageDeleted = await prisma.articleImages.delete({
            where: {
                id: image.id,
            }
        });
        return imageDeleted;
    }

    async deleteImagesByArticleId(articleId: number) {
        const result = await prisma.articleImages.deleteMany({
            where: {
                articleId,
            }
        });
        return result;
    }

    async getImagesByArticleId(articleId: number) {
        const images = await prisma.articleImages.findMany({
            where: {
                articleId,
            }
        });
        return images;
    }
}

export class ImageFsRepo {
    async saveImage(file: File) {
        try {
        const uploadDir = path.join(process.cwd(),'database', 'uploads');
        if (!fs.existsSync(uploadDir)){
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        // Get the file extension
        const extension = file.name.split('.').pop();
        // Generate a uuid for the file name
        const fileName = crypto.randomUUID();
        const filePath = path.join(uploadDir, `${fileName}.${extension}`);
        
        // Read the file as an array buffer and write it to disk
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        fs.writeFileSync(filePath, buffer);

        const url = `/uploads/${fileName}.${extension}`;
        
        return url;
    } catch (error) {
        throw new Error('Failed to save image : ' + error);
        }
    }

    async deleteImage(filePath: string) {
        try {
            fs.unlinkSync(filePath);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

export const imageRepo = new ImageRepo();
export const imageFsRepo = new ImageFsRepo();
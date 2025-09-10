import { prisma } from '$lib/server/prisma.js';
import crypto from 'crypto';
// ...existing code...
import { supabaseAdmin } from '$lib/server/supabaseAdmin.js';

export type ImageData = {
    id: number,
    articleId: number,
    image: string,
};

function extractPathFromUrl(url: string): string | null {
  const marker = '/object/public/'
  const index = url.indexOf(marker)
  if (index === -1) return null
  return url.substring(index + marker.length)
}


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
        // delete from storage
        const deleted = await imageFsRepo.deleteImage(image.image);
        if(!deleted) {
            console.log("Image doesn't exist in storage or failed to delete: " + image.image);
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
    // file: File (Web File API) expected
    async saveImage(file: File, folder: string) {
        try {
            const bucket = 'images'; // change si besoin
            const extension = (file.name.split('.').pop() || '').replace(/[^a-zA-Z0-9]/g, '');
            const fileName = crypto.randomUUID();
            const pathInBucket = `/${folder}/${fileName}.${extension}`;

            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            console.log('Uploading to bucket:', bucket, 'path:', pathInBucket);
            const { error: uploadError } = await supabaseAdmin.storage
                .from(bucket)
                .upload(pathInBucket, buffer, {
                    contentType: file.type,
                    cacheControl: '3600',
                    upsert: false,
                });

            if (uploadError) {
                console.error('Supabase upload error:', uploadError);
            }

            // get public url (works for public buckets)
            const { data: publicData } = supabaseAdmin.storage
                .from(bucket)
                .getPublicUrl(pathInBucket);


            const publicUrl = publicData?.publicUrl ?? null;
            // return object: path (to use for deletion) and url (for DB/frontend)
            return { url: publicUrl ?? `${bucket}/${pathInBucket}`, path: pathInBucket, bucket };
        } catch (error) {
            console.error('Failed to save image :', error);
        }
    }

    // input filePath can be:
    // - publicURL (https://.../storage/v1/object/public/<bucket>/<path>)
    // - stored path returned earlier (path only)
    async deleteImage(url: string) {
        console.log('Deleting image with URL:', url);
        try {
            const bucket = 'images';

            const objectPath = extractPathFromUrl(url) || url;
            if (!objectPath) {
                console.error('Invalid URL, cannot extract path:', url);
                return false;
            }

            console.log('Deleting from bucket:', bucket, 'path:', objectPath);
            // delete from supabase storage

            const { error } = await supabaseAdmin.storage.from(bucket).remove([objectPath]);

            if (error) {
                console.error('Supabase remove error:', error);
                return false;
            }

            return true;
        } catch (error) {
            console.error('Failed to delete image from supabase:', error);
            return false;
        }
    }
}

export const imageRepo = new ImageRepo();
export const imageFsRepo = new ImageFsRepo();
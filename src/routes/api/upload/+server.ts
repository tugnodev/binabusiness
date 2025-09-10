import type { RequestHandler } from "@sveltejs/kit";
import { imageFsRepo, imageRepo } from "$lib/server/domaine/imageRepo.js";

export const DELETE: RequestHandler = async ({ request }) => {
    console.log("begin")
    try {
        const { url, id } = await request.json();
        console.log(url, id);
        if (!url || !id) {
            return new Response(JSON.stringify({ success: false, message: 'Invalid input' }), { status: 400 });
        }

        // Delete from storage
        const res = await imageFsRepo.deleteImage(url);
        if (!res) {
            return new Response(JSON.stringify({ success: false, message: 'Failed to delete image from storage' }), { status: 500 });
        }

        // Delete from database
        const deleted = await imageRepo.deleteImage({ id, articleId: 0, image: url });
        if (!deleted) {
            return new Response(JSON.stringify({ success: false, message: 'Failed to delete image from database' }), { status: 500 });
        }

        return new Response(JSON.stringify({ success: true, message: 'Image deleted successfully' }), { status: 200 });
    } catch (error) {
        console.error('Error deleting image:', error);
        return new Response(JSON.stringify({ success: false, message: 'Error deleting image' }), { status: 500 });
    }
};

export const POST: RequestHandler = async ({ request }) => {
    try {
        const formData = await request.formData();
        console.log(formData.getAll("images"));
        const files = formData.getAll('images') as File[];
        const articleId = formData.get('articleId') as string;
        console.log(articleId);
        const imagePromises = await Promise.all(files.map(file => imageFsRepo.saveImage(file, "articles")));
        const images = await imageRepo.saveImage(Number(articleId), imagePromises.map(image => image!.url));
        return new Response(JSON.stringify({ images: images }), { status: 200 });
    } catch (error) {
        console.error('Error uploading image:', error);
        return new Response(JSON.stringify({ success: false, message: 'Error uploading image' }), { status: 500 });
    }
}
import { imageFsRepo } from '$lib/server/domaine/imageRepo.js';
import { prisma } from '$lib/server/prisma.js';


export const POST = async ({ request }) => {
    console.log("Request received in /market/settings");
    const data = await request.formData();
    const file = data.get('image') as File;
    const id = data.get('id') as string;
    const imageData = await imageFsRepo.saveImage(file, "profiles");

    const res = await prisma.user.update({
        where: {
            id
        },
        data: {
            image: imageData!.url
        }
    });
    if(res){
        return new Response(JSON.stringify({ success: true }));
    }else{
        return new Response(JSON.stringify({ success: false }));
    }
}
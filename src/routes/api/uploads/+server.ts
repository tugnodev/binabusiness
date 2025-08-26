import fs from 'fs';
import path from 'path';
import crypto from 'crypto';



export async function POST({request}: {request: Request}) {
    const files = await request.formData().then(data => data.getAll('files') as File[]);

    if(!files || files.length === 0) {
        return new Response(JSON.stringify({ error: 'No files uploaded' }), { status: 400 });
    }

    const fileUrls: string[] = [];

    try {
        for(const file of files){
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const uploadDir = path.join(process.cwd(),'static', 'uploads');
            if (!fs.existsSync(uploadDir)){
                fs.mkdirSync(uploadDir, { recursive: true });
            }
            //catch the extension of the file
            const extension = file.name.split('.').pop();
            //generate a uuid for the file name
            const fileName = crypto.randomUUID();
            const filePath = path.join(uploadDir, `${fileName}.${extension}`);
            fs.writeFileSync(filePath, buffer);
            fileUrls.push(`/uploads/${fileName}.${extension}`)
        }

        return new Response(JSON.stringify(fileUrls), {status : 200})

    } catch (error) {
        console.log(error);
    }
    
}
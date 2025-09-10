export type UploadImage = {
        file: File | null;
        preview: string;
        uploading: boolean;
    };

export class ImageClient {
    private images: UploadImage[] = [];

    upload = async (images: UploadImage[]) => {
        this.images = images;

        const formData = new FormData();
        await Promise.all(this.images.map(async (img) => formData.append('files', img.file as Blob)));
        
            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });
            const data = await response.json() as string[];
            return data;
    };

    getPreviewImages = () => {
        return this.images.map(img => img.preview);
    }

    deleteImage = async (url: string, id: number) => {
        try {
               const result = await fetch("/api/upload", { method: "DELETE", body:  JSON.stringify({url, id}) });
               console.log(result);
            
        } catch (error) {
            console.error(error);
        }
    }
}

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
        
            console.log("Go to endpoint...")
            const response = await fetch("/api/uploads", {
                method: "POST",
                body: formData,
            });
            console.log("Comming back...")
            const data = await response.json() as string[];
            return data;
    };

    getPreviewImages = () => {
        return this.images.map(img => img.preview);
    }
    getImages = () => {
        return this.images;
    }
}

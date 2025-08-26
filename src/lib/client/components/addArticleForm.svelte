<script lang="ts">
    import { ImageClient } from "../imageClient.js";
    import type { UploadImage } from "../imageClient.js";


    let fileInput: HTMLInputElement;
    let preview = $state(false);
    let uploading = $state(false);
    let images = $state<UploadImage[]>([]);
    const imageClient = $state(new ImageClient());
    let previewImages: string[] = $state([]);

    //$state() pour le formulaire
    let titre = $state('');
    let description = $state('');
    let prix = $state(0);
    let stock = $state(0);
    let categorie = $state('');


    const onSubmit = (e: Event, images: string[]) => {
        e.preventDefault();
        //submit form
    }


    
    let onchange = async (e: Event) => {
        uploading = true;
        const content = e.target as HTMLInputElement;

        if(!content){
            console.log("Pas dimage");
            return;
        }
        const files = content.files ? Array.from(content.files) : [];
        console.log("debug 1");
        
        
        if(images.length >= 1){
            images = [...images, ...files.map(file => ({
                file,
                preview: URL.createObjectURL(file),
                uploading: true,
            }))];
        }else{
            images = files.map(file => ({
            file,
            preview: URL.createObjectURL(file),
            uploading: true,
            }));
        }

        const urls = await imageClient.upload(images);
        previewImages = urls;
        //add image urls to images
        images = images.map((image, index) => ({
            ...image,
            file: null,
            preview: urls[index],
            uploading: false,
        }));
        uploading = false;
    }

</script>


<form class="w-96 bg-base-200/60 p-6 flex flex-col gap-4" action="" enctype="multipart/form-data" method="post">
    <div class="w-full flex items-center justify-center">
        <h1 class="text-2xl font-Raleway font-bold text-secondary">Ajouter un article</h1>
    </div>
    <div class="flex">
        {#if previewImages.length > 0}
            <div class="w-full flex gap-2 carousel">
                {#each previewImages as img (img)}
                        <button type="button" onclick={() => preview = true} class="xv w-24 h-24 flex-shrink-0 rounded-lg bg-base-300 overflow-hidden join-item">
                            <img src={img} alt="preview" class="w-full h-full object-cover">
                        </button>
                    <button class="indicator-item b-i btn btn-primary btn-xs" onclick={(e: Event) => { 
                        e.preventDefault();
                        previewImages = previewImages.filter((previewImage) => previewImage !== img);
                        images = images.filter((image) => image.preview !== img);
                        //faire une requete vers /api/
                    }}>X</button>
                {#if preview}
                    <div class="fixed top-0 left-0 right-0 bottom-0 z-50 bg-base-200/90 flex flex-col items-center justify-center gap-2 w-full h-full">
                        <img src={img} alt="preview" class="w-full">
                        <button class="btn btn-primary" onclick={() => preview = false}>Fermer</button>
                    </div>

                {/if}
                {/each}
            </div>
        {/if}
        <button class="btn btn-secondary bg-secondary/60 w-24 h-24 flex justify-center items-center"
        onclick={(e: Event) => {
            e.preventDefault();
            fileInput.click();
            console.log("debug 3");
        }}
        aria-label="Ajouter des images">IMAGE</button>
        <input class="hidden" type="file" multiple accept="image/*" bind:this={fileInput} onchange={onchange} />
    </div>
    <input type="text" bind:value={titre} placeholder="Titre" class="fr input w-full input-secondary">
    <div class="fr w-full flex gap-2">
        <input type="number" placeholder="Prix" bind:value={prix} class="fr input input-secondary">
        <input type="number" placeholder="Stock" bind:value={stock} class="fr input input-secondary">
    </div>
    <textarea placeholder="Description" bind:value={description} class="fr w-full textarea textarea-secondary"></textarea>
    <input type="text" placeholder="Catégorie" bind:value={categorie} class="fr input w-full input-secondary">
    <button class="btn btn-primary" type="submit" >Enregistrer</button>
</form>

<style>
    .fr{
        background-color: transparent;
    }
    .fr:focus{
        border: none;
        background-color: var(--bg-base-200);
    }
</style>
<script lang="ts">
    import { ImageClient } from "../../imageClient.js";
    import type { UploadImage } from "../../imageClient.js";
    import type { createArticleDto, articleImagesDto } from "$lib/client/articlesClient.js";
    import { eventBus } from "$lib/client/articlesClient.js"
    import { articlesClient } from "$lib/client/articlesClient.js";
	import { fade } from "svelte/transition";

    const { id, articlesState, articleImages } = $props();

    type imageDto = {
        id: number;
        articleId: number;
        image: string;
    }

    let fileInput: HTMLInputElement;
    let preview = $state(false);
    let uploading = $state(false);
    let images = $state<UploadImage[]>([]);
    const imageClient = $state(new ImageClient());
    let previewImages: imageDto[] = $state([]);

    //$state() pour le formulaire
    let titre = $state('');
    let description = $state('');
    let prix = $state(0);
    let stock = $state(0);
    let categorie = $state('');

    let alert = $state(false);


    eventBus.addEventListener('article', (e: Event) => {
        const article = (e as CustomEvent).detail.article;
        titre = article.titre;
        prix = article.prix;
        stock = article.stock;
        description = article.description;
        categorie = article.tag.split('+').join(', ');
        previewImages = articleImages.filter((image: articleImagesDto) => image.articleId === article.id).map((image: articleImagesDto) => image.image);

        
        
        const btn = document.getElementById('sbt')!;
        btn.innerHTML = 'Modifier';
    });

    const onSubmit = async (e: Event) => {
        e.preventDefault();
        const article: createArticleDto = {
            titre,
            prix,
            stock,
            description,
            tag: categorie,
            images: previewImages.map((image: imageDto) => image.image),
            userId: id,
        };
        const res = await articlesClient.create(article);
        if(res.status !== 201){
            alert = true;
            setTimeout(() => {
                alert = false;
            }, 5000);
        }else{
            const retourned = await res.json();
            articlesState.push(retourned);
        }
    }

    
    
    let onchange = async (e: Event) => {
        uploading = true;
        const content = e.target as HTMLInputElement;

        if(!content){
            return;
        }
        const files = content.files ? Array.from(content.files) : [];
        
        
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
        previewImages.push(...urls.map((url: string, index: number) => ({
            id: index,
            articleId: id,
            image: url
        })));
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
    <div class="w-full flex flex-col items-center justify-center">
        {#if alert}
            <div in:fade={{duration: 500, delay: 100}} out:fade={{duration: 500, delay: 100}} class="w-full flex items-center justify-center alert alert-error">
                <span>Cette article existe deja</span>
            </div>
        {/if}
        <h1 class="text-2xl font-Raleway font-bold text-secondary">Ajouter un article</h1>
    </div>
    <div class="flex">
        {#if previewImages.length > 0}
            <div class="w-full flex gap-2 carousel">
                {#each previewImages as img}
                        <button type="button" onclick={() => preview = true} class="xv w-24 h-24 flex-shrink-0 rounded-lg bg-base-300 overflow-hidden join-item">
                            <img src={img.image} alt="preview" class="w-full h-full object-cover">
                        </button>
                    <button class="indicator-item b-i btn btn-primary btn-xs" onclick={(e) => { 
                        e.preventDefault();
                        imageClient.deleteImage(img.image, id);
                        previewImages = previewImages.filter((previewImage) => previewImage !== img);
                        images = images.filter((image) => image.preview !== img.image);
                    }}>X</button>
                {#if preview}
                    <div class="fixed top-0 left-0 right-0 bottom-0 z-50 bg-base-200/90 flex flex-col items-center justify-center gap-2 w-full h-full">
                        <img src={img.image} alt="preview" class="w-full">
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
        }}
        aria-label="Ajouter des images">IMAGE</button>
        <input class="hidden" type="file" multiple accept="image/*" bind:this={fileInput} onchange={onchange} />
    </div>
    <input type="text" bind:value={titre} placeholder="Titre" class="fr input w-full input-secondary">
    <div class="fr w-full flex gap-2">
        <input type="number" placeholder="Prix" bind:value={prix} class="fr input input-secondary">
        <input type="number" placeholder="Stock" bind:value={stock} class="fr input input-secondary">
    </div>
    <input type="text" placeholder="Catégorie" bind:value={categorie} class="fr input w-full input-secondary">
    <textarea placeholder="Description" bind:value={description} class="fr w-full textarea textarea-secondary"></textarea>
    <button id="sbt" class="btn btn-primary" onclick={onSubmit} >Enregistrer</button>
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
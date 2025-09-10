<script lang="ts">
	import Img from "./img.svelte";
    import { eventBus } from "$lib/client/articlesClient.js";
    import type { articleDto, articleImagesDto } from "$lib/client/articlesClient.js";

    let {userId} = $props()

    // State
    let input: HTMLInputElement = $state(null)!;
    let images = $state<articleImagesDto[]>([]);
    let files = $state<File[]>([]);
    let method = $state('POST');
    let formState = $state({
        id: 0,
        titre: '',
        description: '',
        tag: '',
        prix: 0,
        stock: 0,
    })

    // Delete image in the state
    let deleteImg = async (image: string) => {
        if(method === 'POST'){
            images = images.filter(img => img.image !== image);
        }else{
            console.log(image);
            const res = await fetch(`/api/upload`, {
                method: 'DELETE',
                body: JSON.stringify({url: image, id: images.find(img => img.image === image)?.id})
            })
            console.log(res);
            if(res.ok){
                images = images.filter(img => img.image !== image);
            }
        }
    }

    // Define the event type
    type EditEvent = CustomEvent<{ 
        article: articleDto; 
        articleImages: articleImagesDto[]
    }>;

    // Handle edit event
    const handleEdit = (event: Event) => {
        const customEvent = event as unknown as EditEvent;
        const { articleImages, article } = customEvent.detail;

        formState.id = article.id;
        formState.titre = article.titre;
        formState.description = article.description;
        formState.tag = article.tag;
        formState.prix = article.prix;
        formState.stock = article.stock;
        method = 'PATCH';
        images = articleImages.map(image => ({
            id: image.id,
            articleId: image.articleId,
            image: image.image
        }));
        console.log(images);
    };

    // Set up the event listener
    eventBus.addEventListener('edit', handleEdit);

    // Handle onchange event for images
    let onchange = async (e: Event) => {
        const content = e.target as HTMLInputElement;
        if(!content?.files) return;

        const filesop = Array.from(content.files);

        if(method === 'PATCH'){
            const formData = new FormData();
            formData.append('articleId', formState.id.toString());
            filesop.forEach(file => formData.append('images', file));
            const res = await fetch(`/api/upload`, {
                method: 'POST',
                body: formData
            })
            const data = await res.json();
            images.push(...data.images.map((image:{url:string}) => ({
                image: image.url
            })));
        }

        filesop.map(file => {
            images.push({
                image: URL.createObjectURL(file)
            })
        })
        files.push(...filesop);
    }

    // Handle reset form
    function resetForm(){
        formState = {
            id: 0,
            titre: '',
            description: '',
            tag: '',
            prix: 0,
            stock: 0,
        }
        method = 'POST';
        files = [];
        images = []
    }

    //handle submit
    let onSubmit = async () => {
        //upload les images
        const formData = new FormData();
        formData.append('userId', userId);
        formData.append('titre', formState.titre);
        formData.append('description', formState.description);
        formData.append('tag', formState.tag);
        formData.append('prix', formState.prix.toString());
        formData.append('stock', formState.stock.toString());
        if(method === 'PATCH'){
            formData.append('articleId', formState.id.toString());
            images.forEach(image => formData.append('images', JSON.stringify(image.image)));
        }else{
            files.forEach(file => formData.append('images', file));
        }

        const res = await fetch('/admin/articles', {
            method: method,
            body: formData,
        })
        const data = await res.json();
        resetForm();
        console.log(data);
        window.location.reload();
    }
</script>

<form class="w-96 bg-base-200/60 p-6 backdrop-blur-xs border-2 border-base-200 rounded-lg flex flex-col gap-4" enctype="multipart/form-data" method="POST">
    <div class="w-full flex flex-col items-center justify-center">
        <h1 class="text-2xl font-Raleway font-bold text-secondary">Ajouter un article</h1>
    </div>
    <div class="flex gap-2 overflow-x-auto">
        {#each images as image}
            <div class="flex flex-col gap-1">
                <Img src={image.image} input={input} />
                <button type="button" onclick={(e: Event) => deleteImg(image.image)} class="btn btn-error btn-xs">X</button>
            </div>
        {/each}
        <input type="file" name="images[]" bind:this={input} onchange={onchange} multiple accept="image/*" class="fr hidden input w-full input-secondary">
        <button type="button" class="btn btn-secondary bg-secondary/60 w-24 h-24 flex justify-center items-center"
        onclick={(e: Event) => {
            e.preventDefault();
            input.click();
        }}
        aria-label="Ajouter des images">IMAGE</button>
    </div>
    <div class="flex flex-col gap-2">
        <input type="text" bind:value={formState.titre} name="titre" placeholder="Titre" class="fr input w-full input-secondary">
        <div class="flex gap-2">
            <input type="number" bind:value={formState.prix} name="prix" placeholder="Prix" class="fr input w-full input-secondary">
            <input type="number" bind:value={formState.stock} name="stock" placeholder="Stock" class="fr input w-full input-secondary">
        </div>
        <input type="text" bind:value={formState.tag} name="tag" placeholder="Catégorie" class="fr input w-full input-secondary">
        <textarea bind:value={formState.description} name="description" placeholder="Description" class="fr w-full textarea textarea-secondary"></textarea>
        <div class="flex gap-2" >
            <button type="button" onclick={onSubmit} class="flex-4 btn btn-primary">{method === 'POST' ? 'Ajouter' : 'Modifier'}</button>
            <button onclick={resetForm} type="button" class="flex-1 btn btn-error">Vider</button>
        </div>
    </div>
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
<script lang="ts">
	import ArticleForm from '$lib/client/components/admin/articleForm.svelte';
	import { eventBus } from "$lib/client/articlesClient.js";
    import Section from '$lib/client/components/Section.svelte';
    import type { articleDto, articleImagesDto } from "$lib/client/articlesClient.js";

    let { data } = $props()
    let articlesState = $state<articleDto[]>(data.articles);
    let imagesState = $state<articleImagesDto[]>(data.articleImages);
    let userId = $state(data.userId)



    const deleteArticle = async (id: number) => {
        const res = await fetch(`/admin/articles/`, {
            method: 'DELETE',
            body: JSON.stringify(id)
        })
        if(res.ok){
            articlesState = articlesState.filter(article => article.id !== id)
        }
    }
    

    function pushToForm(article: articleDto, images: articleImagesDto[]) {
        let articleImages = images.filter(image => image.articleId === article.id);

        eventBus.dispatchEvent(new CustomEvent('edit', { detail: { article, articleImages } }));
    }
</script>

<main class="z-10 w-full h-full xl:flex">
    <Section class="flex flex-col h-full overflow-y-auto no-scrollbar gap-4 xl:mt-0 p-4 bg-base-200/60 w-full items-center justify-center">
        <h1 class="text-4xl font-Raleway font-bold alert alert-success alert-dash">Articles</h1>
        <div class="flex flex-col xl:flex-row gap-4 justify-center items-center">
            <div>
                <ArticleForm userId={userId} />
            </div>
            <div class="w-full">
                <div class="overflow-y-auto min-w-80 rounded-lg border-2 border-base-200 backdrop-blur-xs w-full bg-base-200/60 p-4" >
                    <div class="flex pt-2 items-center justify-center w-full">
                        <h2 class="text-2xl font-bold">Liste des articles</h2>
                    </div>
                    <div class="divider"> </div>
                    <table class="table table-sm w-full">
                        <thead>
                            <tr>
                                <th class="text-center">titre</th>
                                <th class="text-center">prix</th>
                                <th class="text-center">stock</th>
                                <th class="text-center">Modifier</th>
                                <th class="text-center">Supprimer</th>
                            </tr>
                        </thead>
                        <tbody>
                            {#if articlesState.length < 0}
                                <tr>
                                    <td colspan="7" class="text-center">Aucun article</td>
                                </tr>
                            {:else}
                            {#each articlesState as article}
                                <tr class="" >
                                    <td>{article.titre}</td>
                                    <td>{article.prix}</td>
                                    <td>{article.stock}</td>
                                    <td class="text-center">
                                        <button aria-label="edit" onclick={() => pushToForm(article, imagesState)} class="btn btn-primary btn-sm">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                                        </button>
                                    </td>
                                    <td class="text-center">
                                        <button aria-label="delete" onclick={() => deleteArticle(article.id)} class="btn btn-error btn-sm">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                                        </button>
                                    </td>
                                </tr>
                            {/each}
                            {/if}
                        </tbody>
                    </table>
                </div>
                
            </div>
        </div>
    </Section>
</main>
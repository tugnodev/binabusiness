<script lang="ts">
    import Section from "$lib/client/components/Section.svelte";
	import { fly } from "svelte/transition";

    type Order = {
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        articleDetails: {
            titre: string;
            prix: number;
            quantity: number;
        }[];
        buyerId: string;
        orderStatus: string;
    }

    const { data } = $props<{ orders: Order[] }>();
    let openIndex = $state<number | null>(null);

    const orders = $state(data.orders);

    function toggleDropdown(idx: number) {
        openIndex = openIndex === idx ? null : idx;
    }
</script>

<div class="z-10 w-full bg-base-200/60 h-full overflow-y-auto no-scrollbar">
    <Section class="flex flex-col items-center">
        <div class="w-full max-w-xl min-w-96 p-4 bg-base-200/60 rounded-2xl shadow-xl backdrop-blur-sm">
            <h1 class="text-2xl font-bold text-center text-primary">Mes Commandes</h1>
            <div class="flex justify-center gap-3 items-center">
            <div class="stats bg-base-200/60 shadow-md">
                <div class="stat px-4 py-2">
                <div class="stat-title text-sm text-secondary">Total</div>
                <div class="stat-value text-xl text-primary">{orders.length}</div>
                </div>
            </div>
            <div class="stats bg-base-200/60 shadow-md">
                <div class="stat px-4 py-2">
                <div class="stat-title text-sm text-secondary">En cours</div>
                <div class="stat-value text-xl text-accent"></div>
                    {orders.filter((o: Order) => o.orderStatus.includes('commande en cours')).length}</div>
                </div>
            <div class="stats bg-base-200/60 shadow-md">
                <div class="stat px-4 py-2">
                <div class="stat-title text-sm text-secondary">Expedier</div>
                <div class="stat-value text-xl text-accent"></div>
                    {orders.filter((o: Order) => o.orderStatus.includes('sended')).length}</div>
                </div>
            <div class="stats bg-base-200/60 shadow-md">
                <div class="stat px-4 py-2">
                <div class="stat-title text-sm text-secondary">Recus</div>
                <div class="stat-value text-xl text-accent"></div>
                    {orders.filter((o: Order) => o.orderStatus.includes('receved')).length}</div>
                </div>
            </div>
            </div>
        <div class="w-full max-w-4xl flex p-4 flex-col">
            {#each orders as order, idx}
                <div transition:fly={{y: 100}} class="w-full flex flex-col mb-2">
                    <div class="flex rounded-lg items-center bg-base-200/60 border-2 shadow-sm p-2 border-base-200 justify-between gap-2">
                        <div class="w-full flex-5 overflow-x-hidden">
                            <h2 class="text-lg" ><span class="badge badge-primary font-Raleway font-bold">{order.buyerId}</span> - {order.name}</h2>
                        </div>
                        <div class="flex flex-col flex-2 md:flex-row items-center justify-end gap-2">
                            <h2 class="text-center p-2 w-24 text-sm badge badge-lg badge-warning">
                                {`${order.orderStatus}...`.replace(/commande /g, '').toLowerCase()}
                            </h2>
                            <button
                                class="btn btn-infos"
                                onclick={() => toggleDropdown(idx)}>
                                {#if openIndex === idx}
                                    Voire moins
                                {:else}
                                    Voire plus
                                {/if}
                            </button>
                        </div>
                    </div>
                    {#if openIndex === idx}
                        <div transition:fly={{y: -5, duration: 250}} class="w-full overflow-x-scroll no-scrollbar rounded-lg flex flex-col gap-2 bg-base-200/60 border-2 shadow-sm p-2 border-base-200 justify-between items-center" >
                            {#each order.articleDetails as article}
                                <div class="flex flex-col md:flex-row w-full gap-4 md:items-center md:justify-center">
                                    <div class="flex flex-1 flex-wrap gap-2">
                                        <div class="badge badge-primary">
                                            {article.titre}
                                        </div>
                                    </div>
                                    <div class="flex flex-1 flex-wrap gap-2">
                                        <div class="flex-1 badge badge-info">
                                            {article.prix} XOF
                                        </div>
                                        <div class="flex-1 badge badge-info">
                                            Quantité: {article.quantity}
                                        </div>
                                    </div>
                                    <div class="flex flex-1 flex-wrap gap-2">
                                        <div class="badge badge-outline">
                                            le : {`${order.createdAt}`.replace(/GMT\+0000 \(Coordinated Universal Time\)/g, '')}
                                        </div>
                                    </div>
                                </div>
                            {/each}
                        </div>
                    {/if}
                </div>
            {/each}
        </div>
    </Section>
</div>
<script lang="ts">
	import { authClient } from "../auth.client.js";
	import { goto } from "$app/navigation";
    import EditProfile from "./editProfile.svelte";
	import { fade } from "svelte/transition";
	import { enhance } from "$app/forms";
    
    const {user} = $props();
    let showModal = $state(false);
    
    let fileInput: HTMLInputElement | null = null;
    const logout = () => {
        authClient.signOut();
    }
    const handleImageChange = async (event: Event) => {
        const target = event.target as HTMLInputElement;
        const file = target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const result = e.target?.result as string;
                user.image = result;
            };
            reader.readAsDataURL(file);

            const formData = new FormData();
            formData.append('image', file);
            formData.append('id', user.id);
            const res = await fetch('/market/settings', {
                method: 'POST',
                body: formData
            });
            const data = await res.json();
            if(data.success){
                console.log('Image updated successfully');
            }else{
                console.log('Failed to update image');
            }
        }
    }
    function goToAdmin() {
        window.location.href = '/admin';
    }
</script>

<div class="card w-96 bg-base-200/60 border-2 border-base-200 backdrop-blur-lg rounded-xl shadow-xl">
    <div class="card-body flex flex-col items-center">
        <button onclick={() => fileInput?.click()} class="flex justify-center">
            <input type="file" accept="image/*" class="hidden" bind:this={fileInput} oninput={handleImageChange}>
            <img src={user.image} alt="" class="w-24 h-24 object-cover cursor-pointer rounded-full">
        </button>
        <div class="flex justify-between">
            <h2 class="card-title">{user.name}</h2>
            <h2 class="card-title text-primary">{user.role}</h2>
        </div>
        <div class="flex items-center gap-2">
            <p>{user.email}</p>
        </div>
        <div class="card-actions w-full flex items-center">
            <div class="flex gap-1 flex-1">
                {#if user.vender}
                <button onclick={goToAdmin} class="btn btn-success btn-sm">admin</button>
            {/if}
            </div>
            <div class="flex gap-1 flex-1">
                <button onclick={() => showModal = true} class="btn btn-primary btn-xs">Mot de passe</button>
                <form action="?/logout" method="POST" use:enhance>
                    <input type="hidden" name="logout" value="logout">
                    <button type="submit" class="btn btn-error btn-xs">Deconnexion</button>
                </form>
            </div>
        </div>
    </div>
</div>

{#if showModal}
    <div transition:fade={{duration: 90}} class="absolute z-50 top-0 left-0 w-full h-full backdrop-blur-sm p-2 flex justify-center items-center">
        <div class="max-w-lg w-full bg-base-200/60 border-2 border-base-200 backdrop-blur-xs rounded-lg p-2 flex flex-col items-center">
            <div class="w-full flex justify-end">
                <button onclick={() => showModal = false} class="btn btn-error w-8 h-8 rounded-full">X</button>
            </div>
            <EditProfile user />
        </div>
    </div>
{/if}
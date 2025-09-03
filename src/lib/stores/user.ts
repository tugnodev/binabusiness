import { writable } from "svelte/store";

type UserStore = {
    id: string;
    name: string;
    email: string;
    image: string;
    cardID: number;
}

export const userStore = writable<UserStore | null>(null);

export const setUser = (user: UserStore) => {
    userStore.set(user);
}
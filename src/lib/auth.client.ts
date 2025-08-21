import { createAuthClient } from "better-auth/svelte"; // make sure to import from better-auth/svelte

export const authClient = createAuthClient();


export const signIn = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
    });
    return data;
  };
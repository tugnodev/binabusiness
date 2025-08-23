import { createAuthClient } from "better-auth/svelte"; // make sure to import from better-auth/svelte


class ClientAuth {
  private client;
  
  constructor(){
    this.client = createAuthClient({});
  }


  getSession = () => {
    return this.client.useSession();
  };

  signInWithGoogle = async () => {
    const data = await this.client.signIn.social({
      provider: "google",
      callbackURL: "/market"
    });
    return data;
  };

  signIn = async (email: string, password: string ) => {
    const data = await this.client.signIn.email({
      email,
      password,
    });
    return data;
  };

  signUp = async (email: string, name: string, password: string) => {
    const data = await this.client.signUp.email({
      email,
      name,
      password,
    });
    return data;
  };

  signOut = async () => {
    await this.client.signOut();
    
  };

}

export const authClient = new ClientAuth();

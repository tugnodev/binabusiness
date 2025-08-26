import { goto } from "$app/navigation";
import { createAuthClient } from "better-auth/svelte"; // make sure to import from better-auth/svelte


class ClientAuth {
  client;
  
  constructor(){
    this.client = createAuthClient({
      baseURL: 'http://localhost:5173',
    });
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
    const res = await this.client.signIn.email({
      email,
      password,
      rememberMe : true,
      callbackURL: "/market"
    });
    
    if(res.error){
      throw new Error(res.error.message);
    }else{
      goto("/market");
    }

  };

  signUp = async (email: string, name: string, password: string) => {
    const res = await this.client.signUp.email({
      email,
      name,
      password,
      callbackURL: "/market"
    });


    if(res.data?.user){
      const email = res.data?.user.email;

      this.client.signIn.email({
        email,
        password
      })

    }
  };

  signOut = async () => {
    await this.client.signOut();
    
  };

}

export const authClient = new ClientAuth();

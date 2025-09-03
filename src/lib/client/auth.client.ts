import { goto } from "$app/navigation";
import { redirect } from "@sveltejs/kit";
import { createAuthClient } from "better-auth/svelte"; // make sure to import from better-auth/svelte

class ClientAuth {
  client;
  
  constructor(){
    this.client = createAuthClient({
      baseURL: 'http://localhost:5173',
    });
  }


  getSession = () => {
    const session = this.client.useSession();
    return session;
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
      redirect(308,"/market");
    }

  };

  signUp = async (email: string, name: string, password: string) => {
    const res = await this.client.signUp.email({
      email,
      name,
      password,
      callbackURL: "/market"
    });

    console.log(res)

    if(res.data){
      console.log("render")
      goto("/market");
    }
  };

  signOut = async () => {
    await this.client.signOut();
  };

  eMailVerify = async () => {
    console.log("verify");
    const session = this.getSession();
    const token = session.value?.data?.session?.token as string;
    if(!token){
      return "error pendant la verification de l'email";
    }
    const res = await this.client.verifyEmail({
      query: {
        token,
        callbackURL: "/market"
      }
    });
    console.log(res)
    if(res.error){
      return "error pendant la verification de l'email";
    }else{
      return "email verifié avec succès";
    }
  };

  changePassword = async ({newPassword, currentPassword}: {newPassword: string, currentPassword: string}) => {
    const res = await this.client.changePassword({
      newPassword,
      currentPassword,
    });
    if(res.error){
      return "error pendant le changement de mot de passe";
    }else{
      return "mot de passe changé avec succès";
    }
  };

  getID = () : string | undefined => {
    const session = this.getSession();
    const id = session.value?.data?.user.id;
    return id;
  }

}

export const authClient = new ClientAuth();

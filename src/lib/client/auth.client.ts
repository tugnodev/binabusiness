import { goto } from "$app/navigation";
import { createAuthClient } from "better-auth/svelte";

class ClientAuth {
  client;
  
  constructor(){
    this.client = createAuthClient();
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

    if(data.error){
      console.log(data.error.message);
    }else{
      goto("/market");
    }

  };

  signIn = async (email: string, password: string ) => {
    const res = await this.client.signIn.email({
      email,
      password,
      rememberMe : true,
      callbackURL: "/market"
    });
    
    if(res.error){
      return {error: "email ou mot de passe incorrect"};
    }else{
      goto("/market");
      return {success: "connexion reussie"};
    }

  };

  signUp = async (email: string, name: string, password: string) => {
    const res = await this.client.signUp.email({
      email,
      name,
      password,
      callbackURL: "/market"
    });

    if(res.error){
      return {error: "email ou mot de passe incorrect"};
    }else{
      goto("/market");
      return {success: "inscription reussie"};
    }
  };

  signOut = async () => {
    const res = await this.client.signOut();
    if(res.error){
      console.log(res);
      return {error: "error pendant la deconnexion"};
    }else{
      goto('/');
      return {success: "deconnexion reussie"};
    }
  };

  eMailVerify = async () => {
    const session = this.getSession();
    const token = session.value?.data?.session?.token as string;
    if(!token){
      return {error: "error pendant la verification de l'email"};
    }
    const res = await this.client.verifyEmail({
      query: {
        token,
        callbackURL: "/market"
      }
    });
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

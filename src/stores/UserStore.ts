import { defineStore } from "pinia";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

interface State {
  user: any | null;
  loading: boolean;
  error: string | null;
}

export const useUserStore = defineStore("user", {
  state: (): State => ({
    user: null,
    loading: false,
    error: null,
  }),
  actions: {
    async login(email: string, password: string) {
      try {
        const auth = getAuth();
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password,
        );
        this.user = userCredential.user;
        this.error = null;
      } catch (error: any) {
        this.error = error.message;
      }
    },
    async logout() {
      try {
        const auth = getAuth();
        await signOut(auth);
        this.user = null;
        this.error = null;
      } catch (error: any) {
        this.error = error.message;
      }
    },
  },
});

import { defineStore } from 'pinia';
import type { userState } from '@/models/user-related/user';
import { api } from '@/services/api';
import { jwtDecode } from 'jwt-decode';

export const useUserStore = defineStore('user', {
  state: (): userState => ({
    userName: "",
    password: "",
    loggedIn: false,
    admin: false
  }),
  actions: {
    async authenticate(){
      api.post("/signIn", {
        userName: this.userName,
        password: this.password,
      }).then((response)=>{
        const token: string = response.data.token;
        localStorage.setItem("token",token);
        const decoded: {userName: string, adminRole: boolean} = jwtDecode(token);
        this.loggedIn = decoded.adminRole;
      });
    },
  }
});

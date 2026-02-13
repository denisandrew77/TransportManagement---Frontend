import type { carrier } from "@/models/cargo-related/carrier";
import { api } from "@/services/api";
import { defineStore } from "pinia";

export const useClients = defineStore("clients",{
  state: () =>({
    clientList: [] as carrier[]
  }),
  actions:{
    async getClients(){
      const token = localStorage.getItem("token");
      await api.get("/getClients",{
        headers:{
          'Authorization': token
        }
      }).then((response)=>{
        this.clientList=response.data.clientList;
      })
    },
    async deleteClient(commercialName: string){
      const token = localStorage.getItem("token");
      await api.delete("/deleteClient",{
        headers:{
          'Authorization': token
        },
        params:{
          commercialName: commercialName
        }
      }).then((response)=>{
        console.log(response.data);
      });
    },
  }
})

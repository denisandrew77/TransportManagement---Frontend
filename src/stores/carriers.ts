import type { carrier } from '@/models/cargo-related/carrier'
import { api } from '@/services/api'
import { defineStore } from 'pinia'

export const useCarriers = defineStore('carriers', {
  state: () => ({
    carrierList: [] as carrier[]
  }),
  actions: {
    async getCarriers(){
      const token = localStorage.getItem("token");
      await api.get("/getCarriers",{
        headers:{
          'Authorization': token
        }
      }).then((response)=>{
        this.carrierList = response.data.carrierList;
      })
    }
  }
})

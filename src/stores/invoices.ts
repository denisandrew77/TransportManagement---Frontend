import type { invoice } from "@/models/invoice-related/invoice";
import { api } from "@/services/api";
import { defineStore } from "pinia";

export const useInvoices = defineStore("invoices",{
  state: () =>({
    invoiceList: [] as invoice[]
  }),
  actions:{
    async getInvoices(){
      const token = localStorage.getItem("token");
      await api.get("/getInvoices",{
        headers:{
          'Authorization': token
        }
      }).then((response)=>{
        console.log(response.data);
        this.invoiceList=response.data.invoices;
        this.invoiceList.forEach(invoice=>{
          const paymentDate = new Date(invoice.paymentDate);
          console.log(paymentDate);
          if(paymentDate.getFullYear()<=2000){
            invoice.paymentDate = "";

          }
        });
      })
    },
  }
})

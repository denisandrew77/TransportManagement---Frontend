import type { invoice } from "@/models/invoice-related/invoice";
import { api } from "@/services/api";
import { defineStore } from "pinia";

export const useInvoice = defineStore("invoice",{
  state: (): invoice =>({
    createdAt: "",
    invoiceNumber: 0,
    companyName: "",
    issueDate: "",
    dateReceivingInvoice: "",
    dueDate: "",
    delegateName: "",
    identityCard: "",
    delegateVehicle: "",
    delegateDate: "",
    useVat: false,
    exchangeRateRonEur: 0,
    discount: 0,
    discountLabel: "",
    showLabel: false,
    exchangeRateUsd: "",
    netCostAmountEur: 0,
    grossCostAmountEur: 0,
    vatPercentage: 0,
    paymentAmount: 0,
    paymentDate: "1970-01-01",
  }),
  actions:{
    async createInvoice(orderNumbers: number[]){
      const token = localStorage.getItem("token");
      const createdInvoice = await api.post("/createInvoice",{
        invoiceDetails: {...this.$state, orderNumbers: orderNumbers}
      },{
        headers: {
          'Authorization': token
        }
      }).then((response)=>{
        if(response.data.success){
          return true;
        } else return false;
      });
      return createdInvoice;
    }
  }
})

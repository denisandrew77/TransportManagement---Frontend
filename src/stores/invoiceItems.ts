import type { ordersDbData } from "@/models/dbData/ordersDbData";
import type { invoiceItem } from "@/models/invoice-related/invoiceItem";
import { api } from "@/services/api";
import { defineStore } from "pinia";

export const useInvoiceItems = defineStore("invoiceItems",{
  state: () =>({
    invoiceItemList: [] as invoiceItem[]
  }),
  actions:{
    async getInvoiceItems(clientName:string){
      const token = localStorage.getItem("token");
      await api.get("/getOrdersByClient",{
        params: {
          clientName: clientName
        },
        headers: {
          'Authorization': token
        }
      }).then((response)=>{
        this.transformToTable(response.data.orders);
      })
    },
    transformToTable(orders: ordersDbData[]){
      this.invoiceItemList = [];
      orders.forEach((order)=>{
        this.invoiceItemList.push({
          clientRefference: order.clientRefference,
          route: order.loadingCity + " - " + order.deliveryCity,
          orderDate: order.dateCreated,
          netCostAmountEuro: order.totalPriceCarriers,
          vatPercentage: 21,
          grossCostAmountEuro: order.totalPriceCarriers * 1.21,
          internalOrderNumber: String(order.orderNumber),
          selected: false
        })
      });
    },
    getSelectedItems(){
      const selectedItems: number[] = [];
      this.invoiceItemList.forEach(item=>{
        if(item.selected){
          selectedItems.push(Number(item.internalOrderNumber));
        }
      })
      return selectedItems;
    },
    getTotalNetCost(){
      let totalNetCost = 0;
      this.invoiceItemList.forEach(item=>{
        if(item.selected){
          totalNetCost += item.netCostAmountEuro;
        }
      })
      return totalNetCost;
    },
    getTotalGrossCost(){
      let totalGrossCost = 0;
      this.invoiceItemList.forEach(item=>{
        if(item.selected){
          totalGrossCost += item.grossCostAmountEuro;
        }
      })
      return totalGrossCost;
    }
  }
})

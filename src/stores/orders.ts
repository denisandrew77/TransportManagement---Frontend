import type { carrierDbData } from "@/models/dbData/carrierDbData";
import type { ordersDbData } from "@/models/dbData/ordersDbData";
import type { orderTableColumn } from "@/models/UI-related/ordersTableColumns";
import { api } from "@/services/api";
import { defineStore } from "pinia";

export const useOrders = defineStore("Orders", {
  state: (): { orders: orderTableColumn[] } => ({
    orders: [] as orderTableColumn[]
  }),
  actions: {
    async getOrders() {
      const token = localStorage.getItem("token");
      await api.get("/getAllOrders", {
        headers: {
          'Authorization': token
        }
      }).then((response)=>{
        this.orders = [];
        if(response.data!==null && response.data!==undefined){
          response.data.orders.forEach((order: ordersDbData)=>{
            this.orders.push({
              orderNumber: order.orderNumber,
              plateNumber: this.platesToStringArray(order.carriers),
              carrier: this.carriersToStringArray(order.carriers),
              clientNumber: order.clientRefference,
              client: order.clientName,
              loading: [order.loadingCountry + " - " + order.loadingPostalCode + " - " + order.loadingCity, order.loadingTime+ " / "+ order.loadingDate],
              delivery: [order.deliveryCountry + " - " + order.deliveryPostalCode + " - " + order.deliveryCity, order.deliveryTime+ " / "+ order.deliveryDate],
              status: "N/A",
              info: this.observationsForUpdatesToStringArray(order.carriers)})
          })
        }
      });
    },
    platesToStringArray(carriers: carrierDbData[]): string[]{
        const plates: string[] = [];
        carriers.forEach((carrier)=>{
          plates.push(carrier.plateNumber);
        })
        return plates
    },
    carriersToStringArray(carriers: carrierDbData[]): string[]{
      const carrierNames: string[] = [];
      carriers.forEach((carrier)=>{
        carrierNames.push(carrier.carrierName);
      })
      return carrierNames
    },
    observationsForUpdatesToStringArray(carriers: carrierDbData[]): string[]{
      const additionalInfoForUpdates: string[] = [];
      carriers.forEach((carrier)=>{
        additionalInfoForUpdates.push(carrier.observationsForUpdates);
      })
      return additionalInfoForUpdates
    }
  }
})

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
        this.orders = this.transformToTable(response.data.orders);
      });
    },
    async getOrdersByTextFound(text: string): Promise<orderTableColumn[]>{
      const token = localStorage.getItem("token");
      const records: orderTableColumn[] = await api.get("/searchAll",{
        params:{
          searchText: text
        },
        headers:{
          'Authorization': token
        }
      }).then((response)=>{
        return this.transformToTable(response.data.records);
      });
      console.log(records);
      return records;
    },
    async getOrdersByOrderNumber(orderNumber: number): Promise<orderTableColumn[]>{
      const token = localStorage.getItem("token");
      const orders = await api.get("/getOrdersByOrderNumber",{
        params:{
          orderNumber: orderNumber
        },
        headers:{
          'Authorization': token
        }
      }).then((response)=>{
        console.log(response.data.orders)
        return this.transformToTable(response.data.orders);
      });
      return orders
    },
    async getOrdersByDate(date: Date): Promise<orderTableColumn[]>{
      const token = localStorage.getItem("token");
      const orders = await api.get("/getOrdersByDate",{
        params:{
          date: date
        },
        headers:{
          'Authorization': token
        }
      }).then((response)=>{
        return this.transformToTable(response.data.orders);
      });
      return orders;
    },
    async updateOrderStatus(orderNumber: number, newStatus: object){
      const token = localStorage.getItem("token");
      await api.put("/updateOrderStatus",{
        orderNumber: orderNumber,
        newStatus: newStatus,
      },{
        headers:{
          'Authorization': token
        }
      }).then((response)=>{
        console.log(response.data.message);
      });
    },
    async getOrderByOrderNumber(orderNumber: number): Promise<ordersDbData>{
      const token = localStorage.getItem("token");
      const order = await api.get("/getOrderByOrderNumber",{
        params:{
          orderNumber: orderNumber
        },
        headers:{
          'Authorization': token
        }
      }).then((response)=>{
        return response.data.order;
      });
      return order;
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
    },
    transformToTable(ordersArray: ordersDbData[]){
      const transformedOrders :orderTableColumn[] = [] as orderTableColumn[];
        if(ordersArray!==null && ordersArray!==undefined){
          ordersArray.forEach((order: ordersDbData)=>{
            transformedOrders.push({
              orderNumber: order.orderNumber,
              plateNumber: this.platesToStringArray(order.carriers),
              carrier: this.carriersToStringArray(order.carriers),
              clientNumber: order.clientRefference,
              client: order.clientName,
              loading: [order.loadingCountry + " - " + order.loadingPostalCode + " - " + order.loadingCity, order.loadingTime+ " / "+ order.loadingDate],
              delivery: [order.deliveryCountry + " - " + order.deliveryPostalCode + " - " + order.deliveryCity, order.deliveryTime+ " / "+ order.deliveryDate],
              status: order.currentStatus,
              info: this.observationsForUpdatesToStringArray(order.carriers)})
          })
        }
        return transformedOrders;
    },
  }
});

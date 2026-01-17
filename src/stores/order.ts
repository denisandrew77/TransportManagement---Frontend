import type { cargoOrder } from "@/models/cargo-related/order"
import { defineStore } from "pinia"
export const useOrder = defineStore('orderStore',{
  state: (): cargoOrder => ({
    orderNumber: 0,
    client: "",
    clientRefference: "",
    loading: {
      name: "",
      address: "",
      postalCode: "",
      city: "",
      country: "",
      refferences: "",
      contacts: "",
      date: new Date(),
      time: "",
    },
    delivery: {
      name: "",
      address: "",
      postalCode: "",
      city: "",
      country: "",
      refferences: "",
      contacts: "",
      date: new Date(),
      time: "",
    },
    goods: [{
      type: "",
      number: 0,
      length: 0,
      width: 0,
      height: 0,
      weight: 0,
      stack: false
    }],
    observations: ""
  })
})

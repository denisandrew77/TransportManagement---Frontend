import { defineStore } from 'pinia'
export const useRouteAndPriceDetails = defineStore('priceStore', {
  state: () => ({
    clientPrice: 0,
    carrierPrice: 0,
    totalCarrierPrice: 0,
    highwaysPrice: 0,
    waitingPrice: 0,
    hotelPrice: 0,
    profit: 0,
  }),
  actions: {
    calculateTotalCarrierPrice() {
      this.totalCarrierPrice = this.carrierPrice + this.highwaysPrice + this.waitingPrice + this.hotelPrice;
    },
    calculateProfit() {
      this.profit = this.clientPrice - this.totalCarrierPrice;
    }
  },
  getters:{
    getStore(){
      return this;
    }
  }
})

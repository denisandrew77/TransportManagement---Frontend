import type { routeAndPriceDetails } from '@/models/cargo-related/priceAndTimeCalculation'
import { defineStore } from 'pinia'
export const useRouteAndPriceDetails = defineStore('priceStore', {
  state: (): routeAndPriceDetails => ({
    clientPrice: 0,
    carrierPrice: 0,
  }),
})

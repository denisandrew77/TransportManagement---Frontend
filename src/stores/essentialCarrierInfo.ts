import type { essentialCarrierInfo } from '@/models/cargo-related/essentialCarrierInfo'
import { api } from '@/services/api'
import { defineStore } from 'pinia'

export const useEssentialCarrierInfoStore = defineStore('essentialCarrierInfo', {
  state: (): essentialCarrierInfo => ({
    commercialName: '',
    iban: '',
    city: '',
    country: '',
    address: '',
  }),
  actions: {
    async getEssentialCarrierInfo(carrierName: string): Promise<void> {
      const token = localStorage.getItem('token')
      const response = await api.get('/getCarrierEssentialInfo', {
        params: { carrierName },
        headers: { Authorization: token },
      })
      const data: essentialCarrierInfo = response.data
      this.commercialName = data.commercialName
      this.iban = data.iban
      this.city = data.city
      this.country = data.country
      this.address = data.address
    },
  },
})

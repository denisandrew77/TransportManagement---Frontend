import type { carrier } from '@/models/cargo-related/carrier'
import { defineStore } from 'pinia'

export const useCarrierStore = defineStore('user', {
  state: (): carrier => ({
    nif: '',
    fiscalName: '',
    orc: '',
    commercialName: '',
    country: 'Romania',
    currency: '',
    capital: '',
    registered: '',
    postalCode: '',
    county: '',
    address: '',
    city: '',
    swift: '',
    phone: '',
    bank: '',
    iban: '',
    vatPercentage: 0,
  }),
  actions: {},
})

import type { carrier } from '@/models/cargo-related/carrier'
import { api } from '@/services/api'
import { defineStore } from 'pinia'

export const useCarrierStore = defineStore('carrier', {
  state: (): carrier => ({
    nif: '',
    fiscalName: '',
    orc: '',
    commercialName: '',
    country: '',
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
    vatPercentage: 15,
  }),
  actions: {
    async getViesData() {
      const token = localStorage.getItem('token');
      await api.post("/verifyCarrier", {
        countryCode: this.country,
        vatNumber: this.nif
      },{
        headers: {
          'Authorization': token
        }
      }).then((response)=>{
        this.address = response.data.address
        this.fiscalName = response.data.name
      })
    },
    async createCarrier(){
      const token = localStorage.getItem("token");
      await api.post("/addCarrier",{
        carrier:{
          fiscalCode: this.nif,
        fiscalName: this.fiscalName,
        orc: this.orc,
        commercialName: this.commercialName,
        country: this.country,
        currency: this.currency,
        capital: this.capital,
        registered: this.registered,
        postalCode: this.postalCode,
        county: this.county,
        address: this.address,
        city: this.city,
        swift: this.swift,
        phoneNumber: this.phone,
        bankName: this.bank,
        iban: this.iban,
        vatPercentage: this.vatPercentage,
        }
      },{
        headers:{
          'Authorization':  token
        }
      }).then((response)=>{
        console.log(response.data.message);
      })
    }
  },
})

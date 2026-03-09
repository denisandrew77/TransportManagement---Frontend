import type { carrier } from '@/models/cargo-related/carrier'
import type { carrierContact } from '@/models/cargo-related/carrierContact';
import { api } from '@/services/api'
import { defineStore } from 'pinia'

export const useClient = defineStore('client', {
  state: (): carrier => ({
    fiscalCode: '',
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
    phoneNumber: '',
    bankName: '',
    iban: '',
    vatPercentage: 0,
    contact: {
      name: '',
      phoneNumber: '',
      email: ''
    },
    contacts: [] as carrierContact[],
  }),
  actions: {
    async getViesData():Promise<boolean> {
      const token = localStorage.getItem('token');
      await api.post("/verifyCarrier", {
        countryCode: this.country,
        vatNumber: this.fiscalCode
      },{
        headers: {
          'Authorization': token
        }
      }).then((response)=>{
        if(response.data?.actionSucceed) {
          this.address = response.data.address;
          this.fiscalName = response.data.name;
          return true;
        }
        else return false;
      }).catch((error)=>{
        console.error("Error validating VAT number:", error);
        return false;
      });
      return false;
    },
    async createClient(){
      const token = localStorage.getItem("token");
      await api.post("/addClient",{
        client:{
          fiscalCode: this.fiscalCode,
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
        phoneNumber: this.phoneNumber,
        bankName: this.bankName,
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
    },
    async updateClient(){
      const token = localStorage.getItem("token");
      await api.put("/updateClient",{
        client: this
      }, {
        headers:{
          'Authorization': token
        }
      }).then((response)=>{
        console.log(response);
      })
    },
    resetClientFields(){
      this.fiscalCode = '';
      this.fiscalName = '';
      this.orc = '';
      this.commercialName = '';
      this.country = '';
      this.currency = '';
      this.capital = '';
      this.registered = '';
      this.postalCode = '';
      this.county = '';
      this.address = '';
      this.city = '';
      this.swift = '';
      this.phoneNumber = '';
      this.bankName = '';
      this.iban = '';
      this.vatPercentage = 0;
    },
    resetContactFields(){
      this.contact = {
        name: '',
        phoneNumber: '',
        email: ''
      };
    },
    setClient(carrier: carrier){
      this.fiscalCode = carrier.fiscalCode;
      this.fiscalName = carrier.fiscalName;
      this.orc = carrier.orc;
      this.commercialName = carrier.commercialName;
      this.country = carrier.country;
      this.currency = carrier.currency;
      this.capital = carrier.capital;
      this.registered = carrier.registered;
      this.postalCode = carrier.postalCode;
      this.county = carrier.county;
      this.address = carrier.address;
      this.city = carrier.city;
      this.swift = carrier.swift;
      this.phoneNumber = carrier.phoneNumber;
      this.bankName = carrier.bankName;
      this.iban = carrier.iban;
      this.vatPercentage = carrier.vatPercentage;
    }
  },
})

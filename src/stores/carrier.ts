import type { carrier } from '@/models/cargo-related/carrier'
import type { carrierContact } from '@/models/cargo-related/carrierContact';
import { api } from '@/services/api'
import { defineStore } from 'pinia'

export const useCarrierStore = defineStore('carrier', {
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
    async getViesData(): Promise<boolean> {
      const token = localStorage.getItem('token');
      try {
        const response = await api.post("/verifyCarrier", {
          countryCode: this.country,
          vatNumber: this.fiscalCode
        },{
          headers: {
            'Authorization': token
          }
        });
        if(response.data.valid){
          this.address = response.data.address;
          this.fiscalName = response.data.name;
          return true;
        }
        return false;
      } catch(error){
        console.error("Error validating VAT number:", error);
        return false;
      }
    },
    async createCarrier(){
      const token = localStorage.getItem("token");
      try {
        const response = await api.post("/addCarrier",{
          carrier:{
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
        });
        console.log(response.data.message);
      } catch(error) {
        console.error("Error creating carrier:", error);
      }
    },
    async updateCarrier(){
      const token = localStorage.getItem("token");
      try {
        const response = await api.put("/updateCarrier",{
          carrier: this
        }, {
          headers:{
            'Authorization': token
          }
        });
        console.log(response);
      } catch(error) {
        console.error("Error updating carrier:", error);
      }
    },
    async createCarrierContact(carrier: string){
      const token = localStorage.getItem('token');
      console.log(carrier);
      try {
        await api.post("/addCarrierContact",{
          contact:{
            name: this.contact.name,
            mobile: this.contact.phoneNumber,
            email: this.contact.email
          },
          carrierName: carrier
        },{
          headers:{
            'Authorization': token
          }
        });
      } catch(error) {
        console.error("Error creating carrier contact:", error);
      }
    },
    async getCarrierContacts(commercialName: string){
      const token = localStorage.getItem('token');
      try {
        const response = await api.get("/getCarrierContacts",{
          params:{
            carrierName: commercialName
          },
          headers:{
            'Authorization': token
          }
        });
        this.contacts = response.data.contacts;
      } catch(error) {
        console.error("Error fetching carrier contacts:", error);
      }
    },
    resetCarrierFields(){
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
    setCarrier(carrier: carrier){
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
    },
    validateRequiredFields(): boolean {
      return (
        this.fiscalCode.trim() !== '' &&
        this.fiscalName.trim() !== '' &&
        this.country.trim() !== '' &&
        this.address.trim() !== ''
      );
    }
  },
})

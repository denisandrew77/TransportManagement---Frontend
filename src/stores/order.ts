import type { carrierDetailsForOrder } from '@/models/cargo-related/carrierForOrder';
import type { cargoOrder } from '@/models/cargo-related/order'
import { api } from '@/services/api';
import { defineStore } from 'pinia'
export const useOrder = defineStore('orderStore', {
  state: (): cargoOrder  => ({
    orderNumber: 0,
    client: '',
    clientRefference: '',
    loading: {
      name: '',
      address: '',
      postalCode: '',
      city: '',
      country: '',
      refferences: '',
      contacts: '',
      date: String(new Date().toISOString().split('T')[0]),
      time: '',
    },
    delivery: {
      name: '',
      address: '',
      postalCode: '',
      city: '',
      country: '',
      refferences: '',
      contacts: '',
      date: String(new Date().toISOString().split('T')[0]),
      time: '',
    },
    goods: [
      {
        type: '',
        number: 0,
        length: 0,
        width: 0,
        height: 0,
        weight: 0,
        stack: false,
      },
    ],
    observations: '',
    currentCarrier: {
      number: 1,
      invoice: '',
      carrierName: '',
      contact: '',
      plateNumber: '',
      driverName: '',
      driverPhone: '',
      additionalInfoForOrder: '',
      additionalInfoForUpdates: '',
      highways: 0,
      waiting: 0,
      hotel: 0,
      carrierPrice: 0,
      totalCarrierPrice: 0
    },
    carriers: [
      {
        number: 1,
        invoice: '',
        carrierName: '',
        contact: '',
        plateNumber: '',
        driverName: '',
        driverPhone: '',
        additionalInfoForOrder: '',
        additionalInfoForUpdates: '',
        highways: 0,
        waiting: 0,
        hotel: 0,
        carrierPrice: 0,
        totalCarrierPrice: 0
      },
    ],
    finalPrice: {
      totalCarriersPrice: 0,
      clientPrice: 0,
    },
  }),
  actions:{
    async createOrder(){
      const token = localStorage.getItem("token");
      await api.post("/addOrder",{
        orderDetails:{
          orderNumber: this.orderNumber,
          client: this.client,
          clientReference: this.clientRefference,
          loading: this.loading,
          delivery: this.delivery,
          goods: this.goods,
          carriers: this.carriers,
          finalPrice: this.finalPrice,
        },
      }, {
        headers:{
          'Authorization': token
        }
      });
    },
    async setNewOrderNumber(){
      const token = localStorage.getItem("token");
      await api.get("/getLastOrderNumber",{
        headers:{
          'Authorization': token
        }
      }).then((response)=>{
        this.orderNumber = response.data.lastOrderNumber + 1;
      });
    },
    verifyIfFieldsCompleted():boolean{
      console.log("verifyIfFieldsCompleted() called!");
      const loading: boolean = Object.values({...this.loading, date: "completed"}).every(element=> element!=="");
      const delivery: boolean = Object.values({...this.delivery, date: "completed"}).every(element=> element!=="");
      const goods: boolean = this.goods.every((good)=>Number(good.height)>0 && Number(good.length)>0 && Number(good.number)>0 && good.type!=="" && Number(good.weight)>0 && Number(good.width)>0);
      const carriers: boolean = this.carriers.every((carrier)=> carrier.additionalInfoForOrder!=="" && carrier.additionalInfoForUpdates !=="" && carrier.carrierName!=="" && carrier.contact!=="" && carrier.driverName!=="" && carrier.driverPhone!=="" && carrier.invoice!=="" && carrier.plateNumber!=="");
      if(this.client!=="" && this.clientRefference!=="" && loading && delivery && goods && carriers) {
        return true
      }
      else return false
    },
    setCurrentCarrier(carrier: carrierDetailsForOrder){
      this.currentCarrier = carrier;
    },
    resetFields(){
      this.orderNumber = 0;
      this.client = '';
      this.clientRefference = '';
      this.loading = {
        name: '',
        address: '',
        postalCode: '',
        city: '',
        country: '',
        refferences: '',
        contacts: '',
        date: String(new Date().toISOString().split('T')[0]),
        time: '',
      };
      this.delivery = {
        name: '',
        address: '',
        postalCode: '',
        city: '',
        country: '',
        refferences: '',
        contacts: '',
        date: String(new Date().toISOString().split('T')[0]),
        time: '',
      };
      this.goods = [
        {
          type: '',
          number: 0,
          length: 0,
          width: 0,
          height: 0,
          weight: 0,
          stack: false,
        },
      ];
      this.observations = '';
      this.currentCarrier = {
        number: 1,
        invoice: '',
        carrierName: '',
        contact: '',
        plateNumber: '',
        driverName: '',
        driverPhone: '',
        additionalInfoForOrder: '',
        additionalInfoForUpdates: '',
        highways: 0,
        waiting: 0,
        hotel: 0,
        carrierPrice: 0,
        totalCarrierPrice: 0
      };
      this.carriers = [
        {
          number: 1,
          invoice: '',
          carrierName: '',
          contact: '',
          plateNumber: '',
          driverName: '',
          driverPhone: '',
          additionalInfoForOrder: '',
          additionalInfoForUpdates: '',
          highways: 0,
          waiting: 0,
          hotel: 0,
          carrierPrice: 0,
          totalCarrierPrice: 0
        },
      ];
    },
    calculateCarrierPrice(){
     this.currentCarrier.totalCarrierPrice = this.currentCarrier.highways+this.currentCarrier.waiting+this.currentCarrier.hotel+this.currentCarrier.carrierPrice;
      for(const carrier of this.carriers){
        if(carrier.number===this.currentCarrier.number){
          carrier.totalCarrierPrice = this.currentCarrier.totalCarrierPrice;
        }
      }
    },
    calculateTotalCarrierPrice(){
      this.finalPrice.totalCarriersPrice = 0;
      this.carriers.forEach((carrier)=>{
        this.finalPrice.totalCarriersPrice += carrier.totalCarrierPrice;
      });
    },
  }
})

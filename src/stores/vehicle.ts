import type { vehicle } from '@/models/cargo-related/vehicle';
import { api } from '@/services/api';
import { defineStore } from 'pinia'

export const useVehicles = defineStore('vehicles', {
  state: (): vehicle & { vehicles: vehicle[] } => ({
    plateNumber: '',
    driverName: '',
    driverPhoneNumber: '',
    status: '',
    loadWeight: 0,
    totalLength: 0,
    width: 0,
    distanceBetweenWheels: 0,
    insideHeight: 0,
    totalHeight: 0,
    vehicleType: '',
    carrierType: '',
    personalPhoneNumber: '',
    goodsInsurance: '',
    obligateInspection: '',
    weight: 0,
    dkvDate: '',
    gesTransDate: '',
    tarifApproachKms: 0,
    tarrifLoadKms: 0,
    tarifClosingKms: 0,
    registrationDate: '',
    totalKilometers: 0,
    date: '',
    vehicleInsurance: '',
    tarif: 0,
    insideLength: 0,
    vehicles: [] as vehicle[]
  }),
  actions: {
    async createVehicle(){
    },
    async getCarrierVehicles(commercialName: string){
      const token = localStorage.getItem('token');
      await api.get("/getCarrierVehicles",{
        params:{
          carrierName: commercialName
        },
        headers:{
          'Authorization': token
        }
      }).then((response)=>{
        this.vehicles = response.data.vehicles;
      });
    }
  }
})

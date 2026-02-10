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
    async createVehicle(carrierName: string){
      const token = localStorage.getItem("token");
      await api.post("/addCarrierVehicle",{
        vehicle: {
          plateNumber: this.plateNumber,
          driverName: this.driverName,
          driverPhoneNumber: this.driverPhoneNumber,
          status: this.status,
          loadWeight: this.loadWeight,
          totalLength: this.totalLength,
          width: this.width,
          distanceBetweenWheels: this.distanceBetweenWheels,
          insideHeight: this.insideHeight,
          totalHeight: this.totalHeight,
          vehicleType: this.vehicleType,
          carrierType: this.carrierType,
          personalPhoneNumber: this.personalPhoneNumber,
          goodsInsurance: this.goodsInsurance,
          obligateInspection: this.obligateInspection,
          weight: this.weight,
          dkvDate: this.dkvDate,
          gesTransDate: this.gesTransDate,
          tarifApproachKms: this.tarifApproachKms,
          tarrifLoadKms: this.tarrifLoadKms,
          tarifClosingKms: this.tarifClosingKms,
          registrationDate: this.registrationDate,
          totalKilometers: this.totalKilometers,
          date: this.date,
          vehicleInsurance: this.vehicleInsurance,
          tarif: this.tarif,
          insideLength: this.insideLength,
        },
        carrierName: carrierName
      },{
        headers:{
          'Authorization': token
        }
      });
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
    },
    resetVehicleFields(){
      this.plateNumber = '';
      this.driverName = '';
      this.driverPhoneNumber = '';
      this.status = '';
      this.loadWeight = 0;
      this.totalLength = 0;
      this.width = 0;
      this.distanceBetweenWheels = 0;
      this.insideHeight = 0;
      this.totalHeight = 0;
      this.vehicleType = '';
      this.carrierType = '';
      this.personalPhoneNumber = '';
      this.goodsInsurance = '';
      this.obligateInspection = '';
      this.weight = 0;
      this.dkvDate = '';
      this.gesTransDate = '';
      this.tarifApproachKms = 0;
      this.tarrifLoadKms = 0;
      this.tarifClosingKms = 0;
      this.registrationDate = '';
      this.totalKilometers = 0;
      this.date = '';
      this.vehicleInsurance = '';
      this.tarif = 0;
      this.insideLength = 0;
    }
  }
})

<script setup lang="ts">
import { ref } from 'vue'
import InputWithText from '../Inputs/InputWithText.vue'
import NumberInputWithText from '../Inputs/NumberInputWithText.vue'
import DatePickerComponent from '../Inputs/DatePickerComponent.vue'
import { useVehicles } from '@/stores/vehicle'

defineProps<{
  carrierName: string
}>();
const emit = defineEmits<{
  (e:"createdVehicle", value: boolean): void
}>();

const vehicle = useVehicles()

const inputTitleList = ref({
  plateNumber: 'Plate number',
  driverName: 'Driver Name',
  driverPhoneNumber: 'Driver Phone',
  status: 'Status',
  loadWeight: 'Load weight',
  totalLength: 'Total long',
  insideLength: 'Inside long',
  width: 'Width',
  distanceBetweenWheels: 'Between the wheels',
  insideHeight: 'Inside high',
  totalHeight: 'Total high',
  vehicleType: 'Type',
  carrierType: 'Type of carrier',
  personalPhoneNumber: 'Personal Phone',
  goodsInsurance: 'Insurance goods',
  obligateInspection: 'Obligate inspection',
  weight: 'Weighted',
  dkvDate: 'Dkv',
  gesTransDate: 'Gestrans',
  tarifApproachKms: 'Tarif Aproach kms',
  tarrifLoadKms: 'Tarif Load kms',
  tarifClosingKms: 'Tarif Closing kms',
  registrationDate: 'Registration date',
  totalKilometers: 'Kms',
  date: 'Date',
  vehicleInsurance: 'Vehicle Insurance',
  tarif: 'Tarif'
})

const createVehicle = async (carrierName: string) =>{
  await vehicle.createVehicle(carrierName);
  await vehicle.getCarrierVehicles(carrierName);
  emit('createdVehicle',true);
}
</script>
<template>
<div class="mt-3 grid grid-cols-6 gap-4 relative mx-auto">
  <InputWithText :label="inputTitleList.plateNumber" v-model="vehicle.plateNumber" />
  <InputWithText :label="inputTitleList.driverName" v-model="vehicle.driverName" />
  <InputWithText :label="inputTitleList.driverPhoneNumber" v-model="vehicle.driverPhoneNumber" />
  <InputWithText :label="inputTitleList.status" v-model="vehicle.status" />
  <NumberInputWithText :label="inputTitleList.loadWeight" v-model="vehicle.loadWeight" />
  <NumberInputWithText :label="inputTitleList.totalLength" v-model="vehicle.totalLength" />
  <NumberInputWithText :label="inputTitleList.insideLength" v-model="vehicle.insideLength" />
  <NumberInputWithText :label="inputTitleList.width" v-model="vehicle.width" />
  <NumberInputWithText :label="inputTitleList.distanceBetweenWheels" v-model="vehicle.distanceBetweenWheels" />
  <NumberInputWithText :label="inputTitleList.insideHeight" v-model="vehicle.insideHeight" />
  <NumberInputWithText :label="inputTitleList.totalHeight" v-model="vehicle.totalHeight" />
  <InputWithText :label="inputTitleList.vehicleType" v-model="vehicle.vehicleType" />
  <InputWithText :label="inputTitleList.carrierType" v-model="vehicle.carrierType" />
  <InputWithText :label="inputTitleList.personalPhoneNumber" v-model="vehicle.personalPhoneNumber" />
  <DatePickerComponent :label="inputTitleList.goodsInsurance" v-model="vehicle.goodsInsurance" />
  <DatePickerComponent :label="inputTitleList.obligateInspection" v-model="vehicle.obligateInspection" />
  <NumberInputWithText :label="inputTitleList.weight" v-model="vehicle.weight" />
  <DatePickerComponent :label="inputTitleList.dkvDate" v-model="vehicle.dkvDate" />
  <DatePickerComponent :label="inputTitleList.gesTransDate" v-model="vehicle.gesTransDate" />
  <NumberInputWithText :label="inputTitleList.tarifApproachKms" v-model="vehicle.tarifApproachKms" />
  <NumberInputWithText :label="inputTitleList.tarrifLoadKms" v-model="vehicle.tarrifLoadKms" />
  <NumberInputWithText :label="inputTitleList.tarifClosingKms" v-model="vehicle.tarifClosingKms" />
  <DatePickerComponent :label="inputTitleList.registrationDate" v-model="vehicle.registrationDate" />
  <NumberInputWithText :label="inputTitleList.totalKilometers" v-model="vehicle.totalKilometers" />
  <DatePickerComponent :label="inputTitleList.date" v-model="vehicle.date" />
  <DatePickerComponent :label="inputTitleList.vehicleInsurance" v-model="vehicle.vehicleInsurance" />
  <NumberInputWithText :label="inputTitleList.tarif" v-model="vehicle.tarif" />
  <el-button @click="createVehicle(carrierName)" type="success" class="absolute right-3 bottom-0" size="large">Save</el-button>
</div>
</template>

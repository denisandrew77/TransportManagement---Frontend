<script setup lang="ts">
import { ref } from 'vue'
import SizedInputComponent from './Inputs/SizedInputComponent.vue'
import SmallBlackTitleComponent from './TextPieces/SmallBlackTitleComponent.vue'
import JobEstimateComponent from './JobEstimateComponent.vue'
import ObservationsComponent from './Inputs/ObservationsComponent.vue'
import { useOrder } from '@/stores/order'

const order = useOrder()

const carrierFiedls = [
  { name: 'Carrier' },
  { name: 'Contacts' },
  { name: 'Plate Nr' },
  { name: 'Driver' },
  { name: 'Driver Phone' },
]
//to be replaced by api call soon
const carrierSelectedOptions = ref({
  carrier: { value: '', options: [{ name: 'Carrier1' }, { name: 'Carrier2' }] },
  contacts: { value: '', options: [{ name: 'Contact1' }, { name: 'Contact2' }] },
  plateNumber: { value: '', options: [{ name: 'Plate1' }, { name: 'Plate2' }] },
})

const showCarrierbyIndex = (index: number) => {
  order.carriers.forEach((carrier) => {
    if (carrier.number === index) {
    }
  })
}

const setInvoiceNumber = (value: string) => {
  order.currentCarrier.invoice = value
}
const setCarrier = (value: string) => {
  order.currentCarrier.carrierName = value
}
const setContact = (value: string) => {
  order.currentCarrier.contact = value
}
const setPlateNumber = (value: string) => {
  order.currentCarrier.plateNumber = value
}
const setDriver = (value: string) => {
  order.currentCarrier.driverName = value
}
const setDriverPhone = (value: string) => {
  order.currentCarrier.driverPhone = value
}
const setAdditionalInfoForOrder = (value: string) => {
  order.currentCarrier.additionalInfoForOrder = value
}
const setAdditionalInfoForUpdates = (value: string) => {
  order.currentCarrier.additionalInfoForUpdates = value
}
</script>
<template>
  <div class="mx-4 mt-4 bg-blue-300 flex flex-row">
    <div class="flex flex-row" v-for="carrier in order.carriers">
      <button @click="showCarrierbyIndex(carrier.number)" class="bg-gray-200 w-14 active:bg-gray-300">
        {{ carrier.number }}
      </button>
    </div>
    <div class="w-1/10 flex flex-row items-center gap-3 p-2">
      <SmallBlackTitleComponent :text="'Invoice'" />
      <SizedInputComponent class="w-54" @sendValue="setInvoiceNumber" />
    </div>
  </div>
  <div class="bg-gray-200 mx-4 flex flex-row pt-5 pl-3">
    <div class="flex flex-col gap-6 mt-5">
      <div v-for="element in carrierFiedls">
        {{ element.name }}
      </div>
    </div>
    <div class="w-60 gap-4 px-2 mt-4 flex flex-col">
      <el-select filterable @change="setCarrier" v-model="order.currentCarrier.carrierName">
        <el-option v-for="value in carrierSelectedOptions.carrier.options" :key="value.name" :value="value.name"
          :label="value.name">
        </el-option>
      </el-select>

      <el-select filterable @change="setContact" v-model="order.currentCarrier.contact">
        <el-option v-for="value in carrierSelectedOptions.contacts.options" :key="value.name" :value="value.name"
          :label="value.name">
        </el-option>
      </el-select>

      <el-select filterable @change="setPlateNumber" v-model="order.currentCarrier.plateNumber">
        <el-option v-for="value in carrierSelectedOptions.plateNumber.options" :key="value.name" :value="value.name"
          :label="value.name">
        </el-option>
      </el-select>

      <SizedInputComponent @sendValue="setDriver" />
      <SizedInputComponent @sendValue="setDriverPhone" />
    </div>
    <JobEstimateComponent class="mb-10 ml-20" />
    <div class="flex flex-row gap-4 ml-8">
      <ObservationsComponent :name="'Additional Information'" :redText="'show in Order'"
        @sendValue="setAdditionalInfoForOrder" />
      <ObservationsComponent :name="'Additional Information'" :redText="'show in UPDATES'"
        @sendValue="setAdditionalInfoForUpdates" />
    </div>
  </div>
</template>

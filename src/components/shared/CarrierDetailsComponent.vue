<script setup lang="ts">
import { onMounted, ref } from 'vue'
import SizedInputComponent from './Inputs/SizedInputComponent.vue'
import SmallBlackTitleComponent from './TextPieces/SmallBlackTitleComponent.vue'
import JobEstimateComponent from './JobEstimateComponent.vue'
import ObservationsComponent from './Inputs/ObservationsComponent.vue'
import AddNewCarrierComponent from './Dialogs/AddNewCarrierComponent.vue'
import { useOrder } from '@/stores/order'
import { useCarrierStore } from '@/stores/carrier'
import { useCarriers } from '@/stores/carriers'
import BigTitle from './TextPieces/BigTitle.vue'
import { useVehicles } from '@/stores/vehicle'

onMounted(()=>{
  carriers.getCarriers();
})

const order = useOrder()
const carrier = useCarrierStore()
const carriers = useCarriers()
const vehicles = useVehicles()

const newCarrierDialogVisibility = ref(false)

const carrierFiedls = [
  { name: 'Carrier' },
  { name: 'Contacts' },
  { name: 'Plate Nr' },
  { name: 'Driver' },
  { name: 'Driver Phone' },
]

const showCarrierbyIndex = (index: number) => {
  order.carriers.forEach((carrier) => {
    if (carrier.number === index) {
    }
  })
}

const setCarrier = async (value: string) => {
  order.currentCarrier.carrierName = value
  await carrier.getCarrierContacts(value);
  await vehicles.getCarrierVehicles(value);
  order.currentCarrier.contact = '';
  order.currentCarrier.plateNumber = '';
}
const setContact = (value: string) => {
  order.currentCarrier.contact = value
}
const setPlateNumber = (value: string) => {
  order.currentCarrier.plateNumber = value
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
      <SizedInputComponent class="w-54" v-model="order.currentCarrier.invoice" />
    </div>
  </div>
  <div class="bg-gray-200 mx-4 flex flex-row pt-5 pl-3">
    <div class="flex flex-col gap-6 mt-5">
      <div v-for="element in carrierFiedls">
        {{ element.name }}
      </div>
    </div>
    <div class="w-70 gap-4 px-2 mt-4 flex flex-col">
      <el-select filterable @change="setCarrier" v-model="order.currentCarrier.carrierName">
        <el-option v-for="carrier in carriers.carrierList" :key="carrier.commercialName" :value="carrier.commercialName"
          :label="carrier.commercialName">
        </el-option>
      </el-select>

      <el-select filterable @change="setContact" v-model="order.currentCarrier.contact">
        <el-option v-for="contact in carrier.contacts" :key="contact.name" :value="contact.name"
          :label="contact.name">
        </el-option>
      </el-select>

      <el-select filterable @change="setPlateNumber" v-model="order.currentCarrier.plateNumber">
        <el-option v-for="vehicle in vehicles.vehicles" :key="vehicle.plateNumber" :value="vehicle.plateNumber"
          :label="vehicle.plateNumber">
        </el-option>
      </el-select>

      <SizedInputComponent v-model="order.currentCarrier.driverName" />
      <SizedInputComponent v-model="order.currentCarrier.driverPhone" />
    </div>
    <div class="flex flex-col mt-4 gap-14 ml-3">
      <button @click="newCarrierDialogVisibility = true"
        class="px-2.5 py-1.5 rounded-full bg-blue-400 active:bg-blue-600">
        <i class="bi bi-plus-lg text-white !font-extrabold"></i>
      </button>
      <button class="px-2.5 py-1.5 rounded-full bg-blue-400 active:bg-blue-600">
        <i class="bi bi-plus-lg text-white !font-extrabold"></i>
      </button>
    </div>
    <JobEstimateComponent class="mb-10 ml-20" />
    <div class="flex flex-row gap-4 ml-8">
      <ObservationsComponent :name="'Additional Information'" :redText="'show in Order'"
        v-model="order.currentCarrier.additionalInfoForOrder" />
      <ObservationsComponent :name="'Additional Information'" :redText="'show in UPDATES'"
        v-model="order.currentCarrier.additionalInfoForUpdates" />
    </div>
  </div>
  <el-dialog v-model="newCarrierDialogVisibility">
    <div class="flex flex-row items-center justify-between">
      <BigTitle :text="'Add New Carrier'"/>
      <el-button @click="carrier.getViesData" type="primary">Validate Vat Code</el-button>
    </div>
    <AddNewCarrierComponent />
  </el-dialog>
</template>

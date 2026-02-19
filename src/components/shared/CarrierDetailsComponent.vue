<script setup lang="ts">
import { onMounted, ref } from 'vue'
import SizedInputComponent from './Inputs/SizedInputComponent.vue'
import SmallBlackTitleComponent from './TextPieces/SmallBlackTitleComponent.vue'
import JobEstimateComponent from './JobEstimateComponent.vue'
import ObservationsComponent from './Inputs/ObservationsComponent.vue'
import AddNewCarrierComponent from './Dialogs/AddNewCarrierComponent.vue'
import AddNewPlateComponent from './Dialogs/AddNewPlateComponent.vue'
import AddNewContactComponent from './Dialogs/AddNewContactComponent.vue'
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
const newPlateDialogVisibility = ref(false)
const newContactDialogVisibility = ref(false)

const carrierFiedls = [
  { name: 'Carrier' },
  { name: 'Contacts' },
  { name: 'Plate Nr' },
  { name: 'Driver' },
  { name: 'Driver Phone' },
]

const showCarrierbyIndex = (index: number) => {
  order.carriers.forEach((carrier) => {
    if (carrier.number === order.currentCarrier.number) {
      carrier.carrierName = order.currentCarrier.carrierName;
      carrier.contact = order.currentCarrier.contact;
      carrier.plateNumber = order.currentCarrier.plateNumber;
      carrier.driverName = order.currentCarrier.driverName;
      carrier.driverPhone = order.currentCarrier.driverPhone;
      carrier.additionalInfoForOrder = order.currentCarrier.additionalInfoForOrder;
      carrier.additionalInfoForUpdates = order.currentCarrier.additionalInfoForUpdates;
      carrier.invoice = order.currentCarrier.invoice;
    }
  })
  order.carriers.forEach((carrier) => {
    if (carrier.number === index) {
      order.currentCarrier = carrier;
    }
  })
}

const setCarrier = async (value: string) => {
  order.currentCarrier.carrierName = value
  order.carriers.forEach((carrier)=>{
    if(carrier.number===order.currentCarrier.number){
      carrier.carrierName=value;
    }
  })
  await carrier.getCarrierContacts(value);
  await vehicles.getCarrierVehicles(value);
  order.currentCarrier.contact = '';
  order.currentCarrier.plateNumber = '';
}
const setContact = (value: string) => {
  order.currentCarrier.contact = value;
  order.carriers.forEach((carrier)=>{
    if(carrier.number===order.currentCarrier.number){
      carrier.contact=value;
    }
  })
}
const setPlateNumber = (value: string) => {
  order.currentCarrier.plateNumber = value;
  order.currentCarrier.driverName = String(vehicles.vehicles.find((vehicle)=>vehicle.plateNumber===value)?.driverName);
  order.carriers.forEach((carrier)=>{
    if(carrier.number===order.currentCarrier.number){
      carrier.plateNumber=value;
      carrier.driverName = String(vehicles.vehicles.find((vehicle)=>vehicle.plateNumber===value)?.driverName);
    }
  })
  order.currentCarrier.driverPhone = String(vehicles.vehicles.find((vehicle)=>vehicle.plateNumber===value)?.driverPhoneNumber);
  order.carriers.forEach((carrier)=>{
    if(carrier.number===order.currentCarrier.number){
      carrier.driverPhone = String(vehicles.vehicles.find((vehicle)=>vehicle.plateNumber===value)?.driverPhoneNumber);
    }
  })
}

const addCarrier = () => {
  order.carriers.push({
    number: order.carriers.length + 1,
    carrierName: '',
    contact: '',
    plateNumber: '',
    driverName: '',
    driverPhone: '',
    additionalInfoForOrder: '',
    additionalInfoForUpdates: '',
    invoice: ''
  });
  showCarrierbyIndex(order.carriers.length);
}
const deleteCarrier = ()=>{
  const index : number = order.currentCarrier.number;
  let changed : boolean = false;
  order.carriers.forEach((carrier)=>{
    if(carrier.number===index){
      order.carriers.splice(index-1,1);
      changed = true;
    }
    if(changed===true){
      carrier.number--;
    }
  });

  // Safely get the previous carrier or the first one
  const newIndex = Math.max(0, index - 2);
  const newCarrier = order.carriers[newIndex];
  if(newCarrier){
    order.setCurrentCarrier(newCarrier);
  }
}
const contactCreatedRoutine = ()=>{
  newContactDialogVisibility.value=false;
  order.currentCarrier.contact = carrier.contact.name;
  carrier.contact = {
    name: '',
    phoneNumber: '',
    email: ''
  }
}

const vehicleCreatedRoutine = ()=>{
  newPlateDialogVisibility.value=false;
  order.currentCarrier.plateNumber = vehicles.plateNumber;
  order.currentCarrier.driverName = vehicles.driverName;
  order.currentCarrier.driverPhone = vehicles.driverPhoneNumber;
  vehicles.resetVehicleFields();
}

const setInvoice = (value: string) =>{
  order.currentCarrier.invoice = value;
  order.carriers.forEach((carrier)=>{
    if(carrier.number===order.currentCarrier.number){
      carrier.invoice=value;
    }
  })
}

const setInfoForOrder = (value: string) =>{
  order.currentCarrier.additionalInfoForOrder = value;
  order.carriers.forEach((carrier)=>{
    if(carrier.number===order.currentCarrier.number){
      carrier.additionalInfoForOrder=value;
    }
  })
}

const setInfoForUpdates = (value: string) =>{
  order.currentCarrier.additionalInfoForUpdates = value;
  order.carriers.forEach((carrier)=>{
    if(carrier.number===order.currentCarrier.number){
      carrier.additionalInfoForUpdates=value;
    }
  })
}
</script>
<template>
  <div class="mx-4 bg-blue-300 flex flex-row justify-between">
    <div class="flex flex-row">
      <div class="flex flex-row" v-for="carrier in order.carriers">
      <button @click="showCarrierbyIndex(carrier.number)" class="bg-gray-300 w-14 focus:bg-gray-200">
        {{ carrier.number }}
      </button>
    </div>
    <div class="w-1/10 flex flex-row items-center gap-3 p-2">
      <SmallBlackTitleComponent :text="'Invoice'" />
      <SizedInputComponent class="w-54" :modelValue="order.currentCarrier.invoice" @update:modelValue="setInvoice"/>
    </div>
    </div>
    <div class="flex flex-row">
      <el-button type="primary" class="mt-2 mr-4" @click="addCarrier">Add carrier</el-button>
      <el-button type="danger" class="mt-2 mr-4" @click="deleteCarrier">Delete Carrier</el-button>
    </div>
  </div>
  <div class="bg-gray-200 mx-4 flex flex-row gap-20 pt-5 pl-8">
    <div class="flex flex-row">
      <div class="flex flex-col gap-6 mt-5">
      <div v-for="element in carrierFiedls">
        {{ element.name }}
      </div>
    </div>
    <div class="w-70 gap-4 px-2 mt-4 flex flex-col ml-6">
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
    <div class="flex flex-col mt-4 gap-2.5 ml-5">
      <button @click="newCarrierDialogVisibility = true"
        class="px-2.5 py-1.5 rounded-full bg-blue-400 active:bg-blue-600">
        <i class="bi bi-plus-lg text-white !font-extrabold"></i>
      </button>
      <button @click="newContactDialogVisibility = true" class="px-2.5 py-1.5 rounded-full bg-blue-400 active:bg-blue-600">
        <i class="bi bi-plus-lg text-white !font-extrabold"></i>
      </button>
      <button @click="newPlateDialogVisibility = true" class="px-2.5 py-1.5 rounded-full bg-blue-400 active:bg-blue-600">
        <i class="bi bi-plus-lg text-white !font-extrabold"></i>
      </button>
    </div>
    </div>
    <JobEstimateComponent class="mb-10 ml-20" />
    <div class="flex flex-col gap-4 ml-8">
      <ObservationsComponent :name="'Additional Information'" :redText="'show in Order'"
        :modelValue="order.currentCarrier.additionalInfoForOrder" @update:modelValue="setInfoForOrder"/>
      <ObservationsComponent :name="'Additional Information'" :redText="'show in UPDATES'"
        :modelValue="order.currentCarrier.additionalInfoForUpdates" @update:modelValue="setInfoForUpdates"/>
    </div>
  </div>
  <el-dialog v-model="newCarrierDialogVisibility">
    <div class="flex flex-row items-center justify-between">
      <BigTitle :text="'Add New Carrier'"/>
      <el-button @click="carrier.getViesData" type="primary">Validate Vat Code</el-button>
    </div>
    <AddNewCarrierComponent />
  </el-dialog>
  <el-dialog v-model="newPlateDialogVisibility" width="1300">
    <BigTitle :text="'Add New Plate'"/>
    <div class="flex justify-center">
      <AddNewPlateComponent :carrierName="order.currentCarrier.carrierName" @createdVehicle="vehicleCreatedRoutine"/>
    </div>
  </el-dialog>
  <el-dialog v-model="newContactDialogVisibility" width="700">
    <BigTitle :text="'Add New Contact'"/>
    <div class="flex justify-center">
      <AddNewContactComponent :carrierName="order.currentCarrier.carrierName" @contactCreated="contactCreatedRoutine"/>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { useCarrierStore } from '@/stores/carrier';
import { useCarriers } from '@/stores/carriers';
import { onMounted, ref, type Ref } from 'vue';
import { useRouter } from 'vue-router';
import CompaniesTable from '../shared/Tables/CompaniesTable.vue';
import type { carrier } from '@/models/cargo-related/carrier';

const carriers = useCarriers();
const theCarrier = useCarrierStore();
const router = useRouter();
const dialogVisibility = ref(false);
const currentCarrier = ref("");
const searchingCarrierValue = ref("");
const carrierList: Ref<carrier[]> = ref([]);
onMounted(async ()=>{
  await carriers.getCarriers();
  carrierList.value = carriers.carrierList;
})
const deleteCarrier = async (commercialName: string)=>{
  setCurrentCarrier(commercialName);
  await carriers.deleteCarrier(commercialName);
  dialogVisibility.value=false;
}

const setCurrentCarrier = (carrier: string)=>{
  dialogVisibility.value=true;
  currentCarrier.value=carrier
}

const editCarrier = (carrierName: string)=>{
  carriers.carrierList.forEach((carrier)=>{
    if(carrier.commercialName===carrierName){
      theCarrier.setCarrier(carrier);
    }
  })
  router.push({name: 'NewCarrier', params: {state: 'edit'}});
}

const filterCompanies = () =>{
  carrierList.value = carriers.carrierList;
  carrierList.value=carrierList.value.filter((carrier)=>carrier.fiscalName.toLowerCase().includes(searchingCarrierValue.value.toLowerCase()))
  if(searchingCarrierValue.value==="")
  carrierList.value = carriers.carrierList;
}
</script>
<template>
  <div class="w-full flex flex-col items-center mt-8 px-4">
    <div class="w-full">
      <div class="flex justify-between items-center mb-6 px-4">
        <h1 class="text-3xl font-bold text-gray-800">Carriers</h1>
        <div class="flex flex-row items-center gap-4">
          <span>Search</span>
          <el-input v-model="searchingCarrierValue" @input="filterCompanies"/>
          <el-button type="primary" size="large" @click="router.push('/newCarrier')">
            <i class="bi bi-plus-lg mr-2"></i>Add Carrier
          </el-button>
        </div>
      </div>
      <CompaniesTable :carriers="carrierList" @editRequest="editCarrier" @deleteRequest="setCurrentCarrier"/>
    </div>
  </div>
  <el-dialog v-model="dialogVisibility" width="500">
  <template #header>
    <div class="flex flex-row items-center gap-3">
      <i class="bi bi-exclamation-triangle-fill text-red-600 text-2xl"></i>
      <span class="text-xl font-bold">Delete Carrier</span>
    </div>
  </template>
  <div class="flex flex-col items-center gap-4">
    <p class="text-gray-700">Are you sure you want to delete {{currentCarrier}}?</p>
    <div class="flex flex-row gap-4">
      <el-button @click="dialogVisibility = false" type="primary">Cancel</el-button>
      <el-button @click="async ()=>await deleteCarrier(currentCarrier)" type="danger">Delete</el-button>
    </div>
  </div>
  </el-dialog>
</template>

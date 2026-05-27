<script setup lang="ts">
import { useCarrierStore } from '@/stores/carrier';
import { useCarriers } from '@/stores/carriers';
import { onMounted, ref, type Ref } from 'vue';
import { useRouter } from 'vue-router';
import CompaniesTable from '../shared/Tables/CompaniesTable.vue';
import type { carrier } from '@/models/cargo-related/carrier';
import DeleteConfirmationDialog from '../shared/Dialogs/DeleteConfirmationDialog.vue';

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
  await carriers.deleteCarrier(commercialName);
  await carriers.getCarriers();
  carrierList.value = carriers.carrierList;
  dialogVisibility.value=false;
}

const setCurrentCarrier = (carrier: string)=>{
  currentCarrier.value=carrier
  dialogVisibility.value=true;
}

const editCarrier = (carrierName: string)=>{
  const foundCarrier = carriers.carrierList.find((carrier)=> carrier.commercialName === carrierName);
  if(foundCarrier){
    theCarrier.setCarrier(foundCarrier);
    router.push({name: 'NewCarrier', params: {state: 'edit'}});
  }
}

const filterCompanies = () =>{
  carrierList.value = carriers.carrierList;
  carrierList.value=carrierList.value.filter((carrier)=>carrier.fiscalName.toLowerCase().includes(searchingCarrierValue.value.toLowerCase()))
  if(searchingCarrierValue.value==="")
  carrierList.value = carriers.carrierList;
}
</script>
<template>
  <div class="w-full h-screen p-4 bg-gray-300">
    <div class="bg-white rounded-lg shadow-lg h-full overflow-hidden flex flex-col">
      <div class="p-4 border-b border-gray-200 flex flex-row items-center justify-between mx-9">
        <h1 class="text-3xl font-bold text-gray-800">Carriers</h1>
        <div class="flex flex-row items-center gap-4">
          <span class="text-sm text-gray-600">Search</span>
          <el-input v-model="searchingCarrierValue" @input="filterCompanies" placeholder="Filter by fiscal name" style="max-width: 300px"/>
          <el-button type="primary" size="large" @click="router.push('/newCarrier')">
            <i class="bi bi-plus-lg mr-2"></i>Add Carrier
          </el-button>
        </div>
      </div>
      <div class="mx-12 mt-5 flex-1">
        <CompaniesTable :carriers="carrierList" @editRequest="editCarrier" @deleteRequest="setCurrentCarrier"/>
      </div>
    </div>
  </div>
  <DeleteConfirmationDialog v-model:visibility="dialogVisibility" :currentCarrier="currentCarrier" @deleteRequest="deleteCarrier" :title="'Carrier'"/>
</template>

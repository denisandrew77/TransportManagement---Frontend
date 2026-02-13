<script setup lang="ts">
import CompaniesTable from '../shared/Tables/CompaniesTable.vue';
import DeleteConfirmationDialog from '../shared/Dialogs/DeleteConfirmationDialog.vue';
import { onMounted, ref } from 'vue';
import { useClients } from '@/stores/clients';
import { useRouter } from 'vue-router';
import type { carrier } from '@/models/cargo-related/carrier';
import { useClient } from '@/stores/client';

onMounted(async ()=>{
  await clients.getClients();
  clientList.value=clients.clientList;
})

const dialogVisibility = ref(false);
const router = useRouter();
const clients = useClients();
const theClient = useClient();
const currentClient = ref("");
const clientList = ref([] as carrier[]);
const searchingClientValue = ref("");

const deleteClient = async (commercialName: string)=>{
  await clients.deleteClient(commercialName);
  await clients.getClients();
  clientList.value = clients.clientList;
  dialogVisibility.value=false;
}

const setCurrentClient = (carrier: string)=>{
  currentClient.value=carrier
  dialogVisibility.value=true;
}

const editClient = (clientName: string)=>{
  const foundClient = clients.clientList.find((client)=> client.commercialName === clientName);
  if(foundClient){
    theClient.setClient(foundClient);
    router.push({name: 'NewClient', params: {state: 'edit'}});
  }
}

const filterCompanies = () =>{
  clientList.value = clients.clientList;
  clientList.value=clientList.value.filter((carrier)=>carrier.fiscalName.toLowerCase().includes(searchingClientValue.value.toLowerCase()))
  if(searchingClientValue.value==="")
  clientList.value = clients.clientList;
}
const goToNewCarrierPage = ()=>{
  theClient.resetClientFields();
  router.push('/newClient')
}
</script>
<template>
<div class="w-full flex flex-col items-center mt-8 px-4">
    <div class="w-full">
      <div class="flex justify-between items-center mb-6 px-4">
        <h1 class="text-3xl font-bold text-gray-800">Clients</h1>
        <div class="flex flex-row items-center gap-4">
          <span>Search</span>
          <el-input v-model="searchingClientValue" @input="filterCompanies"/>
          <el-button type="primary" size="large" @click="goToNewCarrierPage">
            <i class="bi bi-plus-lg mr-2"></i>Add Client
          </el-button>
        </div>
      </div>
      <CompaniesTable :carriers="clientList" @editRequest="editClient" @deleteRequest="setCurrentClient"/>
    </div>
  </div>
  <DeleteConfirmationDialog v-model:visibility="dialogVisibility" :currentCarrier="currentClient" @deleteRequest="deleteClient"/>
</template>

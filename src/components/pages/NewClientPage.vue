<script setup lang="ts">
import type { carrierTitles } from '@/models/UI-related/carrierTitles';
import CompanyCreateComponent from '../shared/CompanyCreateComponent.vue';
import BigTitle from '../shared/TextPieces/BigTitle.vue';
import { useRoute, useRouter } from 'vue-router';
import { useClient } from '@/stores/client';

const route = useRoute();
const router = useRouter();
const client = useClient();
const inputTitleList: carrierTitles = {
  nif: 'NIF',
  fiscalName: 'Fiscal name',
  orc: 'ORC',
  commercialName: 'Commercial name',
  country: 'Country',
  currency: 'Currency',
  capital: 'Capital',
  registered: 'Registered',
  postalCode: 'Postal Code',
  county: 'County',
  address: 'Address',
  city: 'City',
  swift: 'Swift',
  phone: 'Phone',
  bank: 'Bank',
  iban: 'IBAN',
  vatPercentage: 'VAT %',
}
const createClient = async() =>{
  await client.createClient();
  router.push('/clients');
  client.resetClientFields();
}
const executeCreateOrEdit = async()=>{
  if(route.params.state==="edit"){
    await client.updateClient();
    router.push("/clients");
  }
  else{
    await createClient();
  }
}

const handleModelUpdate = (updatedCarrier: any) => {
  Object.assign(client, updatedCarrier);
}
</script>
<template>
  <el-button type="danger" class="mt-4 ml-6" @click="router.push('/clients')">
      <div class="flex flex-row gap-1">
        <i class="bi bi-arrow-left"></i>
        <div>Back</div>
      </div>
    </el-button>
  <div class="w-full text-center mb-4 relative">
    <BigTitle :text="route.params.state==='edit'?'Edit Client':'Add client'"/>
  </div>
  <CompanyCreateComponent
    :inputTitleList="inputTitleList"
    :modelValue="client.$state"
    @update:modelValue="handleModelUpdate"
    @saveRequest="executeCreateOrEdit"
    @validateCodeRequest="client.getViesData"/>
</template>

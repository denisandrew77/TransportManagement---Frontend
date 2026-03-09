<script setup lang="ts">
import { useCarrierStore } from '@/stores/carrier';
import BigTitle from '../shared/TextPieces/BigTitle.vue';
import { useRoute, useRouter } from 'vue-router';
import CompanyCreateComponent from '../shared/CompanyCreateComponent.vue';
import ErrorMessageComponent from '../shared/ErrorMessageComponent.vue';
import type { carrierTitles } from '@/models/UI-related/carrierTitles';
import { ref } from 'vue';

const route = useRoute();
const router = useRouter();
const carrierStore = useCarrierStore();
const viesError = ref(false);

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
const createCarrier = async() =>{
  await carrierStore.createCarrier();
  router.push('/carriers');
  carrierStore.resetCarrierFields();
}
const executeCreateOrEdit = async()=>{
  if(route.params.state==="edit"){
    await carrierStore.updateCarrier();
    router.push("/carriers");
  }
  else{
    await createCarrier();
  }
}

const confirmCarrierInVies = async()=>{
  const isValid = await carrierStore.getViesData();
  if(!isValid){
    viesError.value = true;
  }
  else{
    viesError.value = false;
  }
}

const handleModelUpdate = (updatedCarrier: any) => {
  Object.assign(carrierStore, updatedCarrier);
}

</script>
<template>
  <el-button type="danger" class="mt-4 ml-6" @click="router.push('/carriers')">
      <div class="flex flex-row gap-1">
        <i class="bi bi-arrow-left"></i>
        <div>Back</div>
      </div>
    </el-button>
  <div class="w-full text-center mb-4 relative">
    <BigTitle :text="route.params.state==='edit'?'Edit Carrier':'Add Carrier'"/>
  </div>
  <CompanyCreateComponent :inputTitleList="inputTitleList" :modelValue="carrierStore.$state" @update:modelValue="handleModelUpdate" @saveRequest="executeCreateOrEdit" @validateCodeRequest="confirmCarrierInVies"/>
  <div class="w-full text-center mt-8" v-if="viesError">
    <ErrorMessageComponent :name="'Error retrieving company data'"/>
  </div>
</template>

<script setup lang="ts">
import type { carrierTitles } from '@/models/UI-related/carrierTitles';
import CompanyCreateComponent from '../shared/CompanyCreateComponent.vue';
import BigTitle from '../shared/TextPieces/BigTitle.vue';
import ErrorMessageComponent from '../shared/ErrorMessageComponent.vue';
import UnCompletedFieldsDialog from '../shared/Dialogs/UnCompletedFieldsDialog.vue';
import { useRoute, useRouter } from 'vue-router';
import { useClient } from '@/stores/client';
import { ref, onMounted } from 'vue';

const route = useRoute();
const router = useRouter();
const client = useClient();
const viesError = ref(false);
const missingFieldsDialogVisible = ref(false);

onMounted(() => {
  viesError.value = false;
});

const checkRequiredFields = (): boolean => {
  if(!client.validateRequiredFields()) {
    missingFieldsDialogVisible.value = true;
    return false;
  }
  return true;
};

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
  if(!checkRequiredFields()) return;

  viesError.value = false;
  if(route.params.state==="edit"){
    await client.updateClient();
    router.push("/clients");
  }
  else{
    await createClient();
  }
}

const confirmClientInVies = async()=>{
  const isValid = await client.getViesData();
  if(!isValid){
    viesError.value = true;
  }
  else{
    viesError.value = false;
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
    @validateCodeRequest="confirmClientInVies"/>

  <div class="w-full text-center mt-8" v-if="viesError">
    <ErrorMessageComponent :name="'Error retrieving company data'"/>
  </div>
  <UnCompletedFieldsDialog v-model:visibility="missingFieldsDialogVisible"/>
</template>

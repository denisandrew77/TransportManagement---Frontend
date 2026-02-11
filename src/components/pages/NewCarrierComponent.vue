<script setup lang="ts">
import InputWithText from '../shared/Inputs/InputWithText.vue';
import CountrySelectorWithLabel from '../shared/Inputs/CountrySelectorWithLabel.vue';
import CurrencySelectorWithLabel from '../shared/Inputs/CurrencySelectorWithLabel.vue';
import DatePickerComponent from '../shared/Inputs/DatePickerComponent.vue';
import NumberInputWithText from '../shared/Inputs/NumberInputWithText.vue';
import { ref } from 'vue';
import { useCarrierStore } from '@/stores/carrier';
import BigTitle from '../shared/TextPieces/BigTitle.vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const carrier = useCarrierStore();

const inputTitleList = ref({
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
  contactName: "Name",
  contactMobilePhone: "Mobile",
  contactEmail: "Email"
})
const createCarrier = async() =>{
  await carrier.createCarrier();
  router.push('/carriers');
  carrier.resetCarrierFields();
}
const executeCreateOrEdit = async()=>{
  if(route.params.state==="edit"){
    await carrier.updateCarrier();
    router.push("/carriers");
  }
  else{
    await createCarrier();
  }
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
    <BigTitle :text="'Add Carrier'"/>
  </div>
  <div class="w-full flex justify-center">
    <div class="mt-3 grid grid-cols-4 place-items-center gap-4 relative mb-5 w-2/4 border border-black rounded-xl p-5 shadow-2xl">
    <InputWithText :label="inputTitleList.nif" v-model="carrier.fiscalCode" />
    <InputWithText :label="inputTitleList.fiscalName" v-model="carrier.fiscalName" />
    <InputWithText :label="inputTitleList.orc" v-model="carrier.orc" />
    <InputWithText :label="inputTitleList.commercialName" v-model="carrier.commercialName" />
    <CountrySelectorWithLabel :label="inputTitleList.country" class="w-48" v-model="carrier.country" />
    <CurrencySelectorWithLabel :label="inputTitleList.currency" class="w-48" v-model="carrier.currency" />
    <InputWithText :label="inputTitleList.capital" v-model="carrier.capital" />
    <DatePickerComponent :label="inputTitleList.registered" v-model="carrier.registered"/>
    <InputWithText :label="inputTitleList.postalCode" v-model="carrier.postalCode" />
    <InputWithText :label="inputTitleList.county" v-model="carrier.county" />
    <InputWithText :label="inputTitleList.address" v-model="carrier.address" />
    <InputWithText :label="inputTitleList.city" v-model="carrier.city" />
    <InputWithText :label="inputTitleList.swift" v-model="carrier.swift" />
    <InputWithText :label="inputTitleList.phone" v-model="carrier.phoneNumber" />
    <InputWithText :label="inputTitleList.bank" v-model="carrier.bankName" />
    <InputWithText :label="inputTitleList.iban" v-model="carrier.iban" />
    <NumberInputWithText :label="inputTitleList.vatPercentage" v-model="carrier.vatPercentage" />
      <el-button @click="executeCreateOrEdit" type="success" class="absolute right-4 bottom-4" size="large">Save</el-button>
      <el-button @click="carrier.getViesData" type="primary" class="absolute right-30 bottom-4" size="large">Validate VAT code</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import InputWithText from '../Inputs/InputWithText.vue'
import CountrySelectorWithLabel from '../Inputs/CountrySelectorWithLabel.vue'
import CurrencySelectorWithLabel from '../Inputs/CurrencySelectorWithLabel.vue'
import { useCarrierStore } from '@/stores/carrier'
import NumberInputWithText from '../Inputs/NumberInputWithText.vue'
import DatePickerComponent from '../Inputs/DatePickerComponent.vue'

const carrier = useCarrierStore()

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
})

</script>
<template>
  <div class="mt-3 grid grid-cols-4 gap-4 relative">
    <InputWithText :label="inputTitleList.nif" v-model="carrier.nif" />
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
    <InputWithText :label="inputTitleList.phone" v-model="carrier.phone" />
    <InputWithText :label="inputTitleList.bank" v-model="carrier.bank" />
    <InputWithText :label="inputTitleList.iban" v-model="carrier.iban" />
    <NumberInputWithText :label="inputTitleList.vatPercentage" v-model="carrier.vatPercentage" />
      <el-button @click="carrier.createCarrier" type="success" class="absolute right-3 bottom-0" size="large">Save</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import InputWithText from '../Inputs/InputWithText.vue'
import CountrySelectorWithLabel from '../Inputs/CountrySelectorWithLabel.vue'
import CurrencySelectorWithLabel from '../Inputs/CurrencySelectorWithLabel.vue'
import { useCarrierStore } from '@/stores/carrier'
import NumberInputWithText from '../Inputs/NumberInputWithText.vue'
import DatePickerComponent from '../Inputs/DatePickerComponent.vue'
import BigTitle from '../TextPieces/BigTitle.vue'

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
  contactName: "Name",
  contactMobilePhone: "Mobile",
  contactEmail: "Email"
})

</script>
<template>
  <div class="mt-3 grid grid-cols-4 gap-4 relative mb-5">
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
      <el-button @click="carrier.createCarrier" type="success" class="absolute right-8 bottom-0" size="large">Save</el-button>
  </div>
  <div class="mb-4">
    <BigTitle :text="'Add a new Contact'"/>
  </div>
  <div class="grid grid-cols-4 gap-4 relative h-24">
    <InputWithText :label="inputTitleList.contactName" v-model="carrier.contact.name"/>
    <InputWithText :label="inputTitleList.contactMobilePhone" v-model="carrier.contact.phoneNumber"/>
    <InputWithText :label="inputTitleList.contactEmail" v-model="carrier.contact.email"/>
    <el-button @click="carrier.createCarrierContact" type="success" class="absolute right-8 bottom-0" size="large">Save</el-button>
  </div>
</template>

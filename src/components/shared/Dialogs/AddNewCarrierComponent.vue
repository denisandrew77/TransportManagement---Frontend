<script setup lang="ts">
import { ref } from 'vue'
import InputWithText from '../Inputs/InputWithText.vue'
import CountrySelectorWithLabel from '../Inputs/CountrySelectorWithLabel.vue'
import CurrencySelectorWithLabel from '../Inputs/CurrencySelectorWithLabel.vue'
import { useCarrierStore } from '@/stores/carrier'

const carrier = useCarrierStore()

const inputTitleList = ref([
  { label: 'NIF' },
  { label: 'Fiscal name' },
  { label: 'ORC' },
  { label: 'Commercial name' },
  { label: 'Country' },
  { label: 'Currency' },
  { label: 'Capital' },
  { label: 'Registered' },
  { label: 'Postal Code' },
  { label: 'County' },
  { label: 'Address' },
  { label: 'City' },
  { label: 'Swift' },
  { label: 'Phone' },
  { label: 'Bank' },
  { label: 'IBAN' },
  { label: 'VAT %' },
])

const verifyIfCountryLabel = (value: string) => {
  if (value === 'Country') return true
}
const verifyIfCurrencyLabel = (value: string) => {
  if (value === 'Currency') return true
}
const setCurrencyValue = (value: string) => {
  carrier.currency = value
}
const setCountryValue = (value: string) => {
  carrier.country = value
}
</script>
<template>
  <div class="mt-3 grid grid-cols-4 gap-4">
    <div v-for="element in inputTitleList" :key="element.label">
      <div v-if="verifyIfCountryLabel(element.label)">
        <CountrySelectorWithLabel :label="'Country'" class="w-48" @sendValue="setCountryValue" />
      </div>
      <div v-if="verifyIfCurrencyLabel(element.label)">
        <CurrencySelectorWithLabel :label="'Currency'" class="w-48" @sendValue="setCurrencyValue" />
      </div>
      <div v-if="!verifyIfCountryLabel(element.label) && !verifyIfCurrencyLabel(element.label)">
        <InputWithText :label="element.label" />
      </div>
    </div>
  </div>
</template>

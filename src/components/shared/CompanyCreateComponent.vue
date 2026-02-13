<script setup lang="ts">
import InputWithText from './Inputs/InputWithText.vue';
import CountrySelectorWithLabel from './Inputs/CountrySelectorWithLabel.vue';
import CurrencySelectorWithLabel from './Inputs/CurrencySelectorWithLabel.vue';
import DatePickerComponent from './Inputs/DatePickerComponent.vue';
import NumberInputWithText from './Inputs/NumberInputWithText.vue';
import type { carrier } from '@/models/cargo-related/carrier';
import type { carrierTitles } from '@/models/UI-related/carrierTitles';
const props = defineProps<{
  inputTitleList: carrierTitles
  modelValue: carrier
}>()

const emit = defineEmits<{
  (e: "update:modelValue", value: carrier): void
  (e: "update:model-value", value: carrier): void
  (e: "saveRequest", value: boolean): void
  (e: "validateCodeRequest", value: boolean): void
}>()

const updateField = (field: keyof carrier, value: any) => {
  emit('update:modelValue', { ...props.modelValue, [field]: value })
  emit('update:model-value', { ...props.modelValue, [field]: value })
}

const saveRequest = () => {
  emit('saveRequest', true);
}

const validateCodeRequest = () => {
  emit('validateCodeRequest', true);
}
</script>
<template>
<div class="w-full flex justify-center">
    <div class="mt-3 grid grid-cols-4 place-items-center gap-4 relative mb-5 w-2/4 border border-black rounded-xl p-5 shadow-2xl">
    <InputWithText :label="inputTitleList.nif" :modelValue="modelValue.fiscalCode" @update:modelValue="updateField('fiscalCode', $event)"/>
    <InputWithText :label="inputTitleList.fiscalName" :modelValue="modelValue.fiscalName" @update:modelValue="updateField('fiscalName', $event)"/>
    <InputWithText :label="inputTitleList.orc" :modelValue="modelValue.orc" @update:modelValue="updateField('orc', $event)"/>
    <InputWithText :label="inputTitleList.commercialName" :modelValue="modelValue.commercialName" @update:modelValue="updateField('commercialName', $event)"/>
    <CountrySelectorWithLabel :label="inputTitleList.country" class="w-48" :modelValue="modelValue.country" @update:modelValue="updateField('country', $event)"/>
    <CurrencySelectorWithLabel :label="inputTitleList.currency" class="w-48" :modelValue="modelValue.currency" @update:modelValue="updateField('currency', $event)"/>
    <InputWithText :label="inputTitleList.capital" :modelValue="modelValue.capital" @update:modelValue="updateField('capital', $event)"/>
    <DatePickerComponent :label="inputTitleList.registered" :modelValue="modelValue.registered" @update:modelValue="updateField('registered', $event)"/>
    <InputWithText :label="inputTitleList.postalCode" :modelValue="modelValue.postalCode" @update:modelValue="updateField('postalCode', $event)"/>
    <InputWithText :label="inputTitleList.county" :modelValue="modelValue.county" @update:modelValue="updateField('county', $event)"/>
    <InputWithText :label="inputTitleList.address" :modelValue="modelValue.address" @update:modelValue="updateField('address', $event)"/>
    <InputWithText :label="inputTitleList.city" :modelValue="modelValue.city" @update:modelValue="updateField('city', $event)"/>
    <InputWithText :label="inputTitleList.swift" :modelValue="modelValue.swift" @update:modelValue="updateField('swift', $event)"/>
    <InputWithText :label="inputTitleList.phone" :modelValue="modelValue.phoneNumber" @update:modelValue="updateField('phoneNumber', $event)"/>
    <InputWithText :label="inputTitleList.bank" :modelValue="modelValue.bankName" @update:modelValue="updateField('bankName', $event)"/>
    <InputWithText :label="inputTitleList.iban" :modelValue="modelValue.iban" @update:modelValue="updateField('iban', $event)"/>
    <NumberInputWithText :label="inputTitleList.vatPercentage" :modelValue="modelValue.vatPercentage" @update:modelValue="updateField('vatPercentage', $event)"/>
      <el-button @click="saveRequest" type="success" class="absolute right-4 bottom-4" size="large">Save</el-button>
      <el-button @click="validateCodeRequest" type="primary" class="absolute right-30 bottom-4" size="large">Validate VAT code</el-button>
    </div>
  </div>
</template>

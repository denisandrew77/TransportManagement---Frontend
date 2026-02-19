<script setup lang="ts">
import SizedInputComponent from '../Inputs/SizedInputComponent.vue'
import TimeInputComponent from '../Inputs/TimeInputComponent.vue'
import type { loading } from '@/models/cargo-related/loadingAndDelivery'

const props = defineProps<{
  modelValue: loading
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: loading): void
}>()

const setName = (value: string) => {
  emit('update:modelValue', { ...props.modelValue, name: value })
}

const setAddress = (value: string) => {
  emit('update:modelValue', { ...props.modelValue, address: value })
}

const setPostalCode = (value: string) => {
  emit('update:modelValue', { ...props.modelValue, postalCode: value })
}

const setCity = (value: string) => {
  emit('update:modelValue', { ...props.modelValue, city: value })
}

const setCountry = (value: string) => {
  emit('update:modelValue', { ...props.modelValue, country: value })
}

const setReference = (value: string) => {
  emit('update:modelValue', { ...props.modelValue, refferences: value })
}

const setContact = (value: string) => {
  emit('update:modelValue', { ...props.modelValue, contacts: value })
}

const setDate = (value: string) => {
  emit('update:modelValue', { ...props.modelValue, date: value })
}

const setTime = (value: string) => {
  emit('update:modelValue', { ...props.modelValue, time: value })
}
</script>
<template>
  <div class="flex flex-col gap-2 w-70">
    <SizedInputComponent :modelValue="modelValue.name" @update:modelValue="setName" class="w-80"/>
    <SizedInputComponent :modelValue="modelValue.address" @update:modelValue="setAddress" class="w-80"/>
    <div class="flex flex-row gap-2">
      <SizedInputComponent :modelValue="modelValue.postalCode" @update:modelValue="setPostalCode" class="w-35" />
      <SizedInputComponent :modelValue="modelValue.city" @update:modelValue="setCity" class="w-43" />
    </div>
    <div class="flex flex-row gap-2">
      <SizedInputComponent :modelValue="modelValue.country" @update:modelValue="setCountry" class="w-20" />
      <div>Refs</div>
      <SizedInputComponent :modelValue="modelValue.refferences" @update:modelValue="setReference" class="w-48" />
    </div>
    <SizedInputComponent :modelValue="modelValue.contacts" @update:modelValue="setContact"  class="w-80"/>
    <div class="flex flex-row gap-2">
      <el-date-picker :model-value="modelValue.date" @update:model-value="setDate"/>
      <TimeInputComponent :modelValue="modelValue.time" @update:modelValue="setTime" class="w-14" />
    </div>
  </div>
</template>

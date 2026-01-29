<script setup lang="ts">
import SizedInputComponent from '../Inputs/SizedInputComponent.vue'
import DateInputComponent from '../Inputs/DateInputComponent.vue'
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
    <SizedInputComponent :modelValue="modelValue.name" @sendValue="setName" />
    <SizedInputComponent :modelValue="modelValue.address" @sendValue="setAddress" />
    <div class="flex flex-row gap-2">
      <SizedInputComponent :modelValue="modelValue.postalCode" @sendValue="setPostalCode" class="w-25" />
      <SizedInputComponent :modelValue="modelValue.city" @sendValue="setCity" class="w-43" />
    </div>
    <div class="flex flex-row gap-2">
      <SizedInputComponent :modelValue="modelValue.country" @sendValue="setCountry" class="w-20" />
      <div>Refs</div>
      <SizedInputComponent :modelValue="modelValue.refferences" @sendValue="setReference" class="w-38" />
    </div>
    <SizedInputComponent :modelValue="modelValue.contacts" @sendValue="setContact" />
    <div class="flex flex-row gap-2">
      <DateInputComponent :modelValue="modelValue.date" @sendValue="setDate" class="w-44" />
      <TimeInputComponent :modelValue="modelValue.time" @sendValue="setTime" class="w-23" />
    </div>
  </div>
</template>

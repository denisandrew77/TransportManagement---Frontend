<script setup lang="ts">
import SizedInputComponent from '../Inputs/SizedInputComponent.vue';
import DateInputComponent from '../Inputs/DateInputComponent.vue';
import TimeInputComponent from '../Inputs/TimeInputComponent.vue';
import { ref, type Ref } from 'vue';
import type { loading } from '@/models/cargo-related/loadingAndDelivery';

const orderDetails: Ref<loading> = ref({
  name: "",
  address: "",
  postalCode: "",
  city: "",
  country: "",
  refferences: "",
  contacts: "",
  date: new Date(),
  time: "",
});

const setName = (value: string) => {
  orderDetails.value.name = value;
  emit('sendValue', orderDetails.value);
};

const setAddress = (value: string) => {
  orderDetails.value.address = value;
  emit('sendValue', orderDetails.value);
};

const setPostalCode = (value: string) => {
  orderDetails.value.postalCode = value;
  emit('sendValue', orderDetails.value);
};

const setCity = (value: string) => {
  orderDetails.value.city = value;
  emit('sendValue', orderDetails.value);
};

const setCountry = (value: string) => {
  orderDetails.value.country = value;
  emit('sendValue', orderDetails.value);
};

const setReference = (value: string) => {
  orderDetails.value.refferences = value;
  emit('sendValue', orderDetails.value);
};

const setContact = (value: string) => {
  orderDetails.value.contacts = value;
  emit('sendValue', orderDetails.value);
};

const setDate = (value: Date) => {
  orderDetails.value.date = value;
  emit('sendValue', orderDetails.value);
};

const setTime = (value: string) => {
  orderDetails.value.time = value;
  emit('sendValue', orderDetails.value);
};

//loading and delivery types are the same so they can be used interchangeably
const emit = defineEmits<{
  (e: "sendValue", value: loading): void
}>();
</script>
<template>
  <div class="flex flex-col gap-2 w-70">
    <SizedInputComponent @sendValue="setName" />
    <SizedInputComponent @sendValue="setAddress" />
    <div class="flex flex-row gap-2">
      <SizedInputComponent @sendValue="setPostalCode" class="w-25" />
      <SizedInputComponent @sendValue="setCity" class="w-43" />
    </div>
    <div class="flex flex-row gap-2">
      <SizedInputComponent @sendValue="setCountry" class="w-20" />
      <div>Refs</div>
      <SizedInputComponent @sendValue="setReference" class="w-38" />
    </div>
    <SizedInputComponent @sendValue="setContact" />
    <div class="flex flex-row gap-2">
      <DateInputComponent @sendValue="setDate" class="w-44" />
      <TimeInputComponent @sendValue="setTime" class="w-23" />
    </div>
  </div>
</template>

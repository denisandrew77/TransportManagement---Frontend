<script setup lang="ts">
import InputWithText from '../Inputs/InputWithText.vue'
import { useCarrierStore } from '@/stores/carrier'
defineProps<{
  carrierName: string
}>()
const emit = defineEmits<{
  (e: "contactCreated", value: boolean): void
}>()
const carrier = useCarrierStore()
const inputTitleList = {
  contactName: 'Contact Name',
  contactMobilePhone: 'Contact Mobile Phone',
  contactEmail: 'Contact Email'
}

const createContact = async (carrierName: string)=>{
  await carrier.createCarrierContact(carrierName);
  await carrier.getCarrierContacts(carrierName);
  emit('contactCreated',true);
}
</script>
<template>
  <div class="flex flex-row gap-4 relative h-29 mt-4">
    <InputWithText :label="inputTitleList.contactName" v-model="carrier.contact.name"/>
    <InputWithText :label="inputTitleList.contactMobilePhone" v-model="carrier.contact.phoneNumber"/>
    <InputWithText :label="inputTitleList.contactEmail" v-model="carrier.contact.email"/>
    <el-button @click="createContact(carrierName)" type="success" class="absolute right-0 bottom-0" size="large">Save</el-button>
  </div>
</template>

<script setup lang="ts">
import { useCarrierStore } from '@/stores/carrier'
defineProps<{
  carrierName: string
}>()
const emit = defineEmits<{
  (e: "contactCreated", value: boolean): void
}>()
const carrier = useCarrierStore()

const createContact = async (carrierName: string) => {
  await carrier.createCarrierContact(carrierName);
  await carrier.getCarrierContacts(carrierName);
  emit('contactCreated', true);
}
</script>
<template>
  <div class="w-full p-6 flex flex-col gap-8">
    <div class="grid grid-cols-3 gap-x-6 gap-y-8">
      <div class="flex flex-col gap-1">
        <span class="text-sm text-gray-500">Contact Name</span>
        <el-input v-model="carrier.contact.name" />
      </div>
      <div class="flex flex-col gap-1">
        <span class="text-sm text-gray-500">Contact Mobile Phone</span>
        <el-input v-model="carrier.contact.phoneNumber" />
      </div>
      <div class="flex flex-col gap-1">
        <span class="text-sm text-gray-500">Contact Email</span>
        <el-input v-model="carrier.contact.email" />
      </div>
    </div>
    <div class="flex justify-end pt-4 border-t border-slate-200">
      <el-button @click="createContact(carrierName)" type="success" size="large">Save</el-button>
    </div>
  </div>
</template>

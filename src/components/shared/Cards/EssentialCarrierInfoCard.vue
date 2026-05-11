<script setup lang="ts">
import { useCarrierStore } from '@/stores/carrier';
import { useCarriers } from '@/stores/carriers';
import { useEssentialCarrierInfoStore } from '@/stores/essentialCarrierInfo';
import { watch } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps<{
  carrierName: string
}>();

const router = useRouter();
const carrier = useCarrierStore();

const store = useEssentialCarrierInfoStore()

watch(() => props.carrierName, async (name) => {
  if (name) await store.getEssentialCarrierInfo(name)
}, { immediate: true })

const navigateToCarrierPage = async () => {
  const carriers = useCarriers();
  await carriers.getCarriers();
  const found = carriers.carrierList.find(c => c.commercialName === props.carrierName);
  if (found) {
    carrier.setCarrier(found);
    router.push({ name: 'NewCarrier', params: { state: 'edit' } });
  }
}
</script>

<template>
  <div class="rounded-xl overflow-hidden text-sm w-96 self-start shadow-md border border-slate-200" v-if="carrierName">

    <!-- Header -->
    <div class="bg-gradient-to-r from-slate-700 to-slate-500 px-4 py-3 text-center font-semibold text-white uppercase tracking-widest text-xs">
      {{ store.commercialName || carrierName }}
    </div>

    <!-- Rows -->
    <div class="flex border-b border-slate-100">
      <span class="w-24 shrink-0 px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-400 border-r border-slate-100 bg-slate-50">IBAN</span>
      <span class="px-4 py-3 text-slate-700 break-all">{{ store.iban }}</span>
    </div>

    <div class="flex border-b border-slate-100">
      <span class="w-24 shrink-0 px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-400 border-r border-slate-100 bg-slate-50">City</span>
      <span class="px-4 py-3 text-slate-700 flex-1">{{ store.city }}</span>
    </div>

    <div class="flex border-b border-slate-100">
      <span class="w-24 shrink-0 px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-400 border-r border-slate-100 bg-slate-50">Country</span>
      <span class="px-4 py-3 text-slate-700">{{ store.country }}</span>
    </div>

    <div class="flex border-b border-slate-100">
      <span class="w-24 shrink-0 px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-400 border-r border-slate-100 bg-slate-50">Address</span>
      <span class="px-4 py-3 text-slate-700">{{ store.address }}</span>
    </div>

    <!-- Footer -->
    <div class="flex justify-center py-3 bg-slate-50">
      <el-button type="primary" plain size="small" @click="navigateToCarrierPage">Edit Carrier</el-button>
    </div>

  </div>
</template>

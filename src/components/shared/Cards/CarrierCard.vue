<script setup lang="ts">
defineProps<{
  selectedToFrom: string,
  invoiceCompanyName: string,
  selectedCompanyTitle: boolean
}>();
</script>
<template>
  <div class="flex items-center gap-3 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-500 shadow-md" v-if="selectedCompanyTitle">
      <div class="flex items-center justify-center w-8 h-8 rounded-full bg-white/20">
        <i :class="selectedToFrom === 'Carrier' ? 'bi bi-truck' : 'bi bi-building'" class="text-white text-base"></i>
      </div>
    <div class="flex flex-col leading-tight">
      <span class="text-white/70 text-xs font-semibold uppercase tracking-widest">{{ selectedToFrom }}</span>
      <span class="text-white text-base font-bold">{{ invoiceCompanyName }}</span>
    </div>
  </div>
</template>

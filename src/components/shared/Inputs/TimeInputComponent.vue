<script setup lang="ts">
defineProps<{
  modelValue: string
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>
<template>
  <div class="flex flex-row">
    <input :value="modelValue" @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)" type="text"
      class="bg-white rounded-l-sm px-2 py-1 focus:outline-none focus:ring-0 w-17" />
    <div class="flex items-center bg-white rounded-r-sm pr-2">
      <i class="bi bi-clock"></i>
    </div>
  </div>
</template>

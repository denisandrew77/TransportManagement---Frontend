<script setup lang="ts">
defineProps<{
  modelValue: string
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>
<template>
  <input :value="modelValue" @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)" type="date"
    name="dateInput" id="date" class="bg-white px-2 py-1 rounded-sm focus:outline-none focus:ring-0 text-sm" />
</template>

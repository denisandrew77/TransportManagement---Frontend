<script setup lang="ts">
defineProps<{
  modelValue: string
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>
<template>
  <input :value="modelValue" @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)" type="text"
    class="bg-white px-4 py-1 rounded-sm focus:outline-none focus:ring-0" />
</template>

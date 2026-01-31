<script setup lang="ts">
defineProps<{
  modelValue: number
  label: string
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()
</script>
<template>
  <div class="flex flex-col items-start">
    <span>{{ label }}</span>
    <input type="number" :value="modelValue"
      @input="emit('update:modelValue', Number(($event.target as HTMLInputElement).value))"
      class="bg-whitegreen-400 px-4 py-1 rounded-sm focus:outline-none focus:ring-0 border border-gray-600" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: number
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()
</script>
<template>
<input type="number" :value="modelValue"
      @input="emit('update:modelValue', Number(($event.target as HTMLInputElement).value))"
      class="bg-white px-4 py-1 rounded-sm focus:outline-none focus:ring-0" />
</template>

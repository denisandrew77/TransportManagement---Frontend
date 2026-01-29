<script setup lang="ts">
import SizedInputComponent from './SizedInputComponent.vue'
defineProps<{
  modelValue: string
  label: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>
<template>
  <div class="flex flex-col items-start">
    <span>{{ label }}</span>
    <SizedInputComponent :modelValue="modelValue" class="border"
      @update:modelValue="emit('update:modelValue', $event)" />
  </div>
</template>

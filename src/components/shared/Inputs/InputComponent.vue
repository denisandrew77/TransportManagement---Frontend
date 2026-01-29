<script setup lang="ts">
defineProps<{
  modelValue: string
  placeHolder: string
  passwordBox?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>
<template>
  <input :type="passwordBox ? 'password' : 'text'" :value="modelValue"
    @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    class="text-sm w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
    :placeholder="placeHolder" />
</template>

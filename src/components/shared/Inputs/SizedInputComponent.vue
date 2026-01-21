<script setup lang="ts">
import { ref, type Ref } from 'vue'
const inputValue: Ref<string> = ref('')
const emit = defineEmits<{
  (e: 'sendValue', value: string): void
}>()
</script>
<template>
  <input v-model="inputValue" @input="emit('sendValue', inputValue)" type="text"
    class="bg-white px-4 py-1 rounded-sm focus:outline-none focus:ring-0" />
</template>

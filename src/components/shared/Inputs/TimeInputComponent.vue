<script setup lang="ts">
import type { Ref } from 'vue';
import { ref } from 'vue';
const inputValue: Ref<string> = ref('');
const emit = defineEmits<{
  (e: "sendValue", value: string): void
}>();
</script>
<template>
  <div class="flex flex-row">
    <input v-model="inputValue" @input="emit('sendValue', inputValue)" type="text"
      class="bg-white rounded-l-sm px-2 py-1 focus:outline-none focus:ring-0 w-18">
    <div class=" flex items-center bg-white rounded-r-sm pr-2">
      <i class="bi bi-clock"></i>
    </div>
  </div>
</template>

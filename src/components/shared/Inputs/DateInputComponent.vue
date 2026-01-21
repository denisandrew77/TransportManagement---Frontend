<script setup lang="ts">
import { ref, type Ref } from 'vue';

const inputValue: Ref<Date> = ref(new Date());
const emit = defineEmits<{
  (e: "sendValue", value: Date): void
}>();
</script>
<template>
  <input v-model="inputValue" @input="emit('sendValue', inputValue)" type="date" name="dateInput" id="date"
    class="bg-white px-2 py-1 rounded-sm focus:outline-none focus:ring-0 text-sm">
</template>

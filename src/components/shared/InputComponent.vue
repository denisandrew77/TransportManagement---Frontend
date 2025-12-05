<script setup lang="ts">
import { ref, type Ref, defineEmits } from 'vue';
const props = defineProps({
  placeHolder: String,
  passwordBox: Boolean,
});

const inputValue: Ref<string> = ref("");
const emit = defineEmits<{
  (e: "sendValue", value: string): void
}>();
</script>
<template>
    <input
    :type="props.passwordBox?'password':'text'"
    v-model="inputValue"
    @input="emit('sendValue', inputValue)"
    class="text-sm w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none
          focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
    :placeholder="props.placeHolder">
</template>

<script setup lang="ts">
import { ref } from 'vue';
const textValue = ref('');

const emit = defineEmits<{
  (e: "sendValue", value: string): void
}>();

const sendValue = () => {
  emit("sendValue", textValue.value);
}
</script>
<template>
  <el-input v-model="textValue" style="width: 320px" type="textarea" @input="sendValue" />
</template>

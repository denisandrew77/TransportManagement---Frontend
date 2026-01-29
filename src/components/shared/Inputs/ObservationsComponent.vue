<script setup lang="ts">
import SmallBlackTitleComponent from '../TextPieces/SmallBlackTitleComponent.vue'
defineProps<{
  modelValue: string
  name: string
  redText?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>
<template>
  <div class="flex flex-col">
    <div class="flex flex-row gap-2">
      <SmallBlackTitleComponent :text="name" />
      <SmallBlackTitleComponent :text="redText" class="text-red-500" />
    </div>
    <el-input :value="modelValue" @input="emit('update:modelValue', $event.target.value)" style="width: 320px"
      type="textarea" />
  </div>
</template>

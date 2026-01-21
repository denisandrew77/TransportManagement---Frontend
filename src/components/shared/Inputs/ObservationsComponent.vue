<script setup lang="ts">
import SmallBlackTitleComponent from '../TextPieces/SmallBlackTitleComponent.vue'
import TextAreaComponent from './TextAreaComponent.vue'

const props = defineProps({
  name: String,
  redText: String,
})

const emit = defineEmits<{
  (e: 'sendValue', value: string): void
}>()

const sendValue = (value: string) => {
  emit('sendValue', value)
}
</script>
<template>
  <div class="flex flex-col">
    <div class="flex flex-row gap-2">
      <SmallBlackTitleComponent :text="props.name" />
      <SmallBlackTitleComponent :text="props.redText" class="text-red-500" />
    </div>
    <TextAreaComponent @sendValue="sendValue" />
  </div>
</template>

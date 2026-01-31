<script setup lang="ts">
defineProps<{
  modelValue: string,
  label: string
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', value:string):void
}>()

const handleChange = (value: string)=>{
  emit('update:modelValue',value)
}
</script>
<template>
<div class="flex flex-col items-start">
  <span>{{ label }}</span>
  <el-date-picker
    :model-value="modelValue"
    @update:model-value="handleChange"
    type="date"
    placeholder="Select date"
    style="width: 190px"
  />
</div>
</template>

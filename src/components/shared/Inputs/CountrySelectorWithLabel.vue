<script setup lang="ts">
import { countries } from 'countries-list'
defineProps<{
  label: string
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const handleChange = (value: string) => {
  emit('update:modelValue', value)
}
</script>
<template>
  <div class="flex flex-col items-start">
    <span>{{ label }}</span>
    <el-select filterable :model-value="modelValue" @update:model-value="handleChange">
      <el-option v-for="(country, code) in countries" :key="code" :label="country.name" :value="country.name" />
    </el-select>
  </div>
</template>

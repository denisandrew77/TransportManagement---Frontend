<script setup lang="ts">
import { countries } from 'countries-list'
defineProps<{
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
    <el-select filterable :model-value="modelValue" @update:model-value="handleChange">
      <el-option v-for="(country, code) in countries" :key="code" :label="country.name" :value="code" />
    </el-select>
</template>

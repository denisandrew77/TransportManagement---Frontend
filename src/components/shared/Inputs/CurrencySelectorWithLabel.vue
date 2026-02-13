<script setup lang="ts">
import cc from 'currency-codes'

defineProps<{
  label: string
  modelValue: string
}>()

const currencyList = cc.data.map((currency) => ({
  code: currency.code,
  name: currency.currency,
}))
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
      <el-option v-for="currency in currencyList" :key="currency.code" :label="`${currency.code} - ${currency.name}`"
        :value="currency.code" />
    </el-select>
  </div>
</template>

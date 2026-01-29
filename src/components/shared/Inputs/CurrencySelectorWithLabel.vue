<script setup lang="ts">
import { ref } from 'vue'
import cc from 'currency-codes'

const props = defineProps({
  label: String,
})

const selectedOption = ref('')
const currencyList = cc.data.map((currency) => ({
  code: currency.code,
  name: currency.currency,
}))
const emit = defineEmits<{
  (e: 'sendValue', value: string): void
}>()
</script>
<template>
  <div class="flex flex-col items-start">
    <span>{{ props.label }}</span>
    <el-select filterable v-model="selectedOption" @change="emit('sendValue', selectedOption)">
      <el-option v-for="currency in currencyList" :key="currency.code" :label="`${currency.code} - ${currency.name}`"
        :value="currency.code" />
    </el-select>
  </div>
</template>

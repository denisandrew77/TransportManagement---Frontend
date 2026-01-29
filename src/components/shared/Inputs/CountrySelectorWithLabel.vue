<script setup lang="ts">
import { ref } from 'vue'
import { countries } from 'countries-list'

const props = defineProps({
  label: String,
})

const selectedOption = ref('')
const emit = defineEmits<{
  (e: 'sendValue', value: string): void
}>()
</script>
<template>
  <div class="flex flex-col items-start">
    <span>{{ props.label }}</span>
    <el-select filterable v-model="selectedOption" @change="emit('sendValue', selectedOption)">
      <el-option v-for="(country, code) in countries" :key="code" :label="country.name" :value="code" />
    </el-select>
  </div>
</template>

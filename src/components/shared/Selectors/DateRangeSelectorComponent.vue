<script setup lang="ts">
import { ref } from 'vue';

const dateRange = ref({
  from: new Date(),
  to: new Date()
});
const moveDateFurther = ()=>{
  const newFrom = new Date(dateRange.value.from);
  const newTo = new Date(dateRange.value.to);
  newFrom.setDate(newFrom.getDate()+1);
  dateRange.value = { from: newFrom, to: newTo };
  emit('dateUpdate', dateRange.value);
}
const moveDateBackwards = ()=>{
  const newFrom = new Date(dateRange.value.from);
  const newTo = new Date(dateRange.value.to);
  newTo.setDate(newTo.getDate()-1);
  dateRange.value = { from: newFrom, to: newTo };
  emit('dateUpdate', dateRange.value);
}

const emit = defineEmits<{
  (e: 'dateUpdate', value: { from: Date, to: Date }): void
}>();
</script>
<template>
  <div class="flex flex-row items-center">
    <el-button type="primary" @click="moveDateBackwards">
      <i class="bi bi-arrow-left"></i>
    </el-button>
    <div class="flex flex-row gap-2 px-2 py-1 mx-2 border border-gray-500 rounded-md">
      <el-text size="large">{{ dateRange.to.getDate() }}.{{ dateRange.to.getMonth()+1 }}.{{ dateRange.to.getFullYear() }}</el-text>
      <i class="bi bi-arrow-right"></i>
      <el-text size="large">{{ dateRange.from.getDate() }}.{{ dateRange.from.getMonth()+1 }}.{{ dateRange.from.getFullYear() }}</el-text>
    </div>
    <el-button type="primary" @click="moveDateFurther">
      <i class="bi bi-arrow-right"></i>
    </el-button>
  </div>
</template>

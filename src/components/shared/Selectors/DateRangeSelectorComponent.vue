<script setup lang="ts">
import { ref } from 'vue';

const dateRange = ref({
  selected: new Date(),
});
const moveDateFurther = ()=>{
  const date = new Date(dateRange.value.selected);
  date.setDate(date.getDate()+1);
  dateRange.value.selected = date;
  emit('dateUpdate', dateRange.value.selected);
}
const moveDateBackwards = ()=>{
  const date = new Date(dateRange.value.selected);
  date.setDate(date.getDate()-1);
  dateRange.value.selected = date;
  emit('dateUpdate', dateRange.value.selected);
}

const emit = defineEmits<{
  (e: 'dateUpdate', value: Date): void
}>();
</script>
<template>
  <div class="flex flex-row items-center">
    <el-button type="primary" @click="moveDateBackwards">
      <i class="bi bi-arrow-left"></i>
    </el-button>
    <div class="flex flex-row gap-2 px-2 py-1 mx-2 border border-gray-500 rounded-md">
      <el-text size="large">{{ dateRange.selected.getDate() }}.{{ dateRange.selected.getMonth()+1 }}.{{ dateRange.selected.getFullYear() }}</el-text>
      <i class="bi bi-arrow-right"></i>
      <el-text size="large">{{ dateRange.selected.getDate() }}.{{ dateRange.selected.getMonth()+1 }}.{{ dateRange.selected.getFullYear() }}</el-text>
    </div>
    <el-button type="primary" @click="moveDateFurther">
      <i class="bi bi-arrow-right"></i>
    </el-button>
  </div>
</template>

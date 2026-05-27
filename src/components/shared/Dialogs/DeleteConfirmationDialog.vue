<script setup lang="ts">
defineProps<{
  visibility: boolean
  currentCarrier: string
  title: string
}>()

const emit = defineEmits<{
  (e:"deleteRequest", value: string): void
  (e:"update:visibility", value: boolean): void
}>()
</script>
<template>
<el-dialog :model-value="visibility" @update:model-value="emit('update:visibility', $event)" width="500">
  <template #header>
    <div class="flex flex-row items-center gap-3">
      <i class="bi bi-exclamation-triangle-fill text-red-600 text-2xl"></i>
      <span class="text-xl font-bold">Delete {{title}}</span>
    </div>
  </template>
  <div class="flex flex-col items-center gap-4">
    <p class="text-gray-700">Are you sure you want to delete {{currentCarrier}}?</p>
    <div class="flex flex-row gap-4">
      <el-button @click="emit('update:visibility', false)" type="primary">Cancel</el-button>
      <el-button @click="emit('deleteRequest',currentCarrier)" type="danger">Delete</el-button>
    </div>
  </div>
  </el-dialog>
</template>

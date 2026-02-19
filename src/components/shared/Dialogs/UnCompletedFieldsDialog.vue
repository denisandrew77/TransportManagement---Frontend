<script setup lang="ts">
defineProps<{
  visibility: boolean
}>();
const emit = defineEmits<{
  (e: "update:visibility", value: boolean): void
}>()
</script>
<template>
  <el-dialog
  :model-value="visibility"
  @update:model-value="emit('update:visibility', false)"
  width="500"
  close-on-click-modal
  class="rounded-lg"
  >
  <template #header>
    <div class="flex items-center gap-3">
      <i class="bi bi-exclamation-circle text-yellow-500 text-2xl"></i>
      <span class="text-xl font-bold text-gray-800">Missing Information</span>
    </div>
  </template>

  <div class="py-4">
    <p class="text-gray-600 text-base leading-relaxed">
      Please complete all the required fields
    </p>
  </div>

  <template #footer>
    <div class="flex justify-end gap-3">
      <el-button @click="emit('update:visibility', false)" type="primary">
        <i class="bi bi-check mr-2"></i>OK
      </el-button>
    </div>
  </template>
  </el-dialog>
</template>

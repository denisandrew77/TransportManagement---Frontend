<script setup lang="ts">
import { ref } from 'vue';
const emit = defineEmits<{
  (e: 'update:visibility', value: boolean): void
  (e: 'sendSearchValue', value: number): void
}>();
const props = defineProps<{
  visibility: boolean
}>()
const orderSearchValueByNumber = ref("");
</script>
<template>
<el-dialog :model-value="props.visibility" @update:model-value="emit('update:visibility',$event)" width="500">
  <div>
    <div class="flex flex-row items-center gap-3">
      <i class="bi bi-search text-blue-600 text-2xl"></i>
      <span class="text-xl font-bold">Search Order Number</span>
    </div>
    <div class="flex flex-row items-center gap-3 mt-4">
      <el-input v-model="orderSearchValueByNumber" placeholder="Enter order number" @change="emit('sendSearchValue',Number(orderSearchValueByNumber))"/>
      <el-button type="primary" @click="emit('update:visibility',$event); orderSearchValueByNumber=''; emit('update:visibility', false)">
         <div class="flex flex-row gap-2">
          <i class="bi bi-search"></i>
          <div>Search</div>
        </div>
      </el-button>
    </div>
  </div>
</el-dialog>
</template>

<script setup lang="ts">
import type { carrier } from '@/models/cargo-related/carrier';

defineProps<{
  carriers: Array<carrier>
}>();

const emit = defineEmits<{
  (e:"editRequest", value: string):void
  (e:"deleteRequest", value: string):void
}>()
</script>
<template>
<el-table
:data="carriers"
border
stripe
class="w-full shadow-lg"
:header-cell-style="{ background: '#1e40af', color: '#fff', fontWeight: 'bold' }"
>
  <el-table-column prop="fiscalCode" label="NIF" min-width="140" fixed sortable/>
  <el-table-column prop="address" label="Address" min-width="200" fixed/>
  <el-table-column prop="fiscalName" label="Fiscal Name" min-width="200" sortable/>
  <el-table-column prop="country" label="Country" min-width="120" sortable/>
  <el-table-column prop="city" label="City" min-width="150" sortable/>
  <el-table-column prop="postalCode" label="Postal Code" min-width="130" sortable/>
  <el-table-column prop="currency" label="Currency" min-width="100" sortable/>
  <el-table-column label="Actions" width="180" fixed="right" align="center">
    <template #default="scope">
      <el-button type="primary" size="small" @click="emit('editRequest', scope.row.commercialName)">
        <div class="flex flex-row gap-1">
          <i class="bi bi-pencil"></i>
          <div>Edit</div>
        </div>
      </el-button>
      <el-button type="danger" size="small" @click="emit('deleteRequest', scope.row.commercialName)">
        <div class="flex flex-row gap-1">
          <i class="bi bi-trash"></i>
          <div>Delete</div>
        </div>
      </el-button>
    </template>
  </el-table-column>
</el-table>
</template>

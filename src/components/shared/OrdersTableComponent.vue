<script setup lang="ts">
import type { orderTableColumn } from '@/models/UI-related/ordersTableColumns';

defineProps<{
  tableData: orderTableColumn[]
}>()
</script>
<template>
  <div class="px-10 pt-4">
    <el-table
      :data="tableData"
      style="width: 100%"
      :header-cell-style="{
        backgroundColor: '#1a237e',
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: '14px'
      }"
      :row-style="{ fontSize: '13px' }"
      stripe
      border
    >
      <el-table-column prop="orderNumber" label="Order Nr" min-width="120" align="center"/>
      <el-table-column label="Plate" min-width="150" align="center">
        <template #default="{ row }">
          <div class="array-cell">
            <div v-for="(item, index) in row.plateNumber" :key="index">
              {{ item }}
              <div v-if="index < row.plateNumber.length - 1" class="divider"></div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Carrier" min-width="180" align="center">
        <template #default="{ row }">
          <div class="array-cell">
            <div v-for="(item, index) in row.carrier" :key="index">
              {{ item }}
              <div v-if="index < row.carrier.length - 1" class="divider"></div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="clientNumber" label="Client Number" min-width="150" align="center"/>
      <el-table-column prop="client" label="Client" min-width="200" align="center"/>
      <el-table-column label="Loading" min-width="300" align="center">
        <template #default="{ row }">
          <div class="array-cell">
            <div v-for="(item, index) in row.loading" :key="index">
              {{ item }}
              <div v-if="index < row.loading.length - 1" class="divider"></div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Delivery" min-width="300" align="center">
        <template #default="{ row }">
          <div class="array-cell">
            <div v-for="(item, index) in row.delivery" :key="index">
              {{ item }}
              <div v-if="index < row.delivery.length - 1" class="divider"></div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="Status" min-width="120" align="center"/>
      <el-table-column prop="info" label="Info" min-width="150" align="center">
        <template #default="{ row }">
          <div class="array-cell">
            <div v-for="(item, index) in row.info" :key="index">
              {{ item }}
              <div v-if="index < row.info.length - 1" class="divider"></div>
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped>
:deep(.el-table) {
  border-radius: 8px;
  overflow: hidden;
}

:deep(.el-table__row:hover) {
  background-color: #f5f7fa;
}

:deep(.el-table__body tr.el-table__row--striped) {
  background-color: #fafafa;
}

.array-cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 8px 0;
}

.divider {
  width: 80%;
  height: 1px;
  background-color: #dcdfe6;
  margin: 4px 0;
}
</style>

<script setup lang="ts">
import { h } from 'vue';
import type { invoiceItem } from '@/models/invoice-related/invoiceItem';

const props = defineProps<{
  orders: invoiceItem[]
}>();

const emit = defineEmits<{
  (e: 'update:orders', value: number): void
}>();

function getSummaries({ columns }: { columns: any[] }) {
  const anySelected = props.orders.some(o => o.selected);
  const rows = anySelected ? props.orders.filter(o => o.selected) : props.orders;
  return columns.map((col) => {
    if (col.property === 'netCostAmountEuro' || col.property === 'grossCostAmountEuro') {
      const sum = rows.reduce((acc, row) => acc + ((row[col.property as keyof invoiceItem] as number) ?? 0), 0);
      return h('span', {
        style: 'background:#dbeafe; color:#1e40af; font-weight:700; padding:2px 10px; border-radius:6px;'
      }, sum.toFixed(2));
    }
    return '';
  });
}
</script>
<template>
  <el-table
    :data="orders"
    border
    stripe
    class="w-full shadow-lg"
    show-summary
    :summary-method="getSummaries"
    :header-cell-style="{ background: '#1e40af', color: '#fff', fontWeight: 'bold', textAlign: 'center' }"
  >
    <el-table-column prop="selected" label="Selected" width="90" align="center">
      <template #default="scope">
        <el-checkbox :model-value="scope.row.selected" @change="emit('update:orders',Number(scope.row.internalOrderNumber))"/>
      </template>
    </el-table-column>
    <el-table-column prop="clientRefference" label="Client Ref." min-width="150" sortable align="center"/>
    <el-table-column prop="route" label="Route" min-width="200" align="center"/>
    <el-table-column prop="orderDate" label="Order Date" min-width="130" sortable align="center"/>
    <el-table-column prop="netCostAmountEuro" label="Net (€)" min-width="120" sortable align="center">
      <template #default="scope">
        {{ scope.row.netCostAmountEuro }}
      </template>
    </el-table-column>
    <el-table-column prop="vatPercentage" label="VAT %" min-width="100" sortable align="center">
      <template #default="scope">
        {{ scope.row.vatPercentage }}%
      </template>
    </el-table-column>
    <el-table-column prop="grossCostAmountEuro" label="Gross (€)" min-width="120" sortable align="center" fixed="right">
      <template #default="scope">
        {{ scope.row.grossCostAmountEuro }}
      </template>
    </el-table-column>
    <el-table-column prop="internalOrderNumber" label="Order #" min-width="130" sortable align="center"/>
  </el-table>
</template>

<style scoped>
:deep(.el-table__footer-wrapper td.el-table__cell) {
  background-color: transparent !important;
  border: none !important;
}
</style>

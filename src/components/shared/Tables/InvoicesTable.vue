<script setup lang="ts">
import type { invoice } from '@/models/invoice-related/invoice';

defineProps<{
  invoices: invoice[]
}>();

const emit = defineEmits<{
  (e: 'detailsRequest', value: number): void
  (e: 'deleteRequest', value: number): void
}>();
</script>
<template>
  <el-table
    :data="invoices"
    border
    stripe
    class="w-full shadow-lg"
    :header-cell-style="{ background: '#1e40af', color: '#fff', fontWeight: 'bold', textAlign: 'center' }"
  >
    <el-table-column prop="issueDate" label="Document Date" min-width="140" sortable align="center" fixed />
    <el-table-column prop="invoiceNumber" label="Invoice No." min-width="120" sortable align="center" fixed />
    <el-table-column prop="vatPercentage" label="Vat %" min-width="90" sortable align="center">
      <template #default="scope">
        {{ scope.row.vatPercentage }}%
      </template>
    </el-table-column>
    <el-table-column prop="companyName" label="Name" min-width="180" sortable align="center" />
    <el-table-column prop="netCostAmountEur" label="Net Cost Amount EUR" min-width="170" sortable align="center">
      <template #default="scope">
        {{ scope.row.netCostAmountEur?.toFixed(2) }}
      </template>
    </el-table-column>
    <el-table-column prop="grossCostAmountEur" label="Gross Cost Amount EUR" min-width="180" sortable align="center">
      <template #default="scope">
        {{ scope.row.grossCostAmountEur?.toFixed(2) }}
      </template>
    </el-table-column>
    <el-table-column prop="dateReceivingInvoice" label="Date Receiving Invoice" min-width="180" sortable align="center" />
    <el-table-column prop="dueDate" label="Due date" min-width="130" sortable align="center" />
    <el-table-column prop="paymentAmount" label="Payment amount" min-width="150" sortable align="center">
      <template #default="scope">
        {{ scope.row.paymentAmount?.toFixed(2) }}
      </template>
    </el-table-column>
    <el-table-column prop="paymentDate" label="Payment date" min-width="130" sortable align="center" />
    <el-table-column label="Actions" width="100" fixed="right" align="center">
      <template #default="scope">
        <el-button type="danger" size="small" @click="emit('deleteRequest', scope.row.invoiceNumber)">
          <div class="flex flex-row gap-1">
            <i class="bi bi-trash"></i>
            <div>Delete</div>
          </div>
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

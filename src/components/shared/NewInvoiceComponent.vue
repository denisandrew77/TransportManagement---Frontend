<script setup lang="ts">
import { useInvoice } from '@/stores/invoice';

const invoice = useInvoice();
</script>
<template>
  <div class="grid grid-cols-6 gap-8 p-6 items-end">
    <div class="flex flex-col gap-1">
      <span class="text-sm">Invoice Number</span>
      <el-input v-model="invoice.invoiceNumber" />
    </div>
    <div class="flex flex-col gap-1">
      <span class="text-sm">Issue Date</span>
      <el-date-picker v-model="invoice.issueDate" type="date" placeholder="Select date" style="width: 100%" />
    </div>
    <div class="flex flex-col gap-1">
      <span class="text-sm">Date Receiving Invoice</span>
      <el-date-picker v-model="invoice.dateReceivingInvoice" type="date" placeholder="Select date" style="width: 100%" />
    </div>
    <div class="flex flex-col gap-1">
      <span class="text-sm">Due Date</span>
      <el-date-picker v-model="invoice.dueDate" type="date" placeholder="Select date" style="width: 100%" />
    </div>
    <div class="flex flex-col gap-1">
      <span class="text-sm">Delegate Name</span>
      <el-input v-model="invoice.delegateName" />
    </div>
    <div class="flex flex-col gap-1">
      <span class="text-sm">Identity Card</span>
      <el-input v-model="invoice.identityCard" />
    </div>
    <div class="flex flex-col gap-1">
      <span class="text-sm">Delegate Vehicle</span>
      <el-input v-model="invoice.delegateVehicle" />
    </div>
    <div class="flex flex-col gap-1">
      <span class="text-sm">Delegate Date</span>
      <el-date-picker v-model="invoice.delegateDate" type="date" placeholder="Select date" style="width: 100%" />
    </div>
    <div class="flex flex-col items-start gap-1">
      <span class="text-sm">Use VAT</span>
      <el-checkbox v-model="invoice.useVat" size="large" />
    </div>
    <div class="flex flex-col gap-1">
      <span class="text-sm">Exchange Rate RON/EUR</span>
      <el-input v-model="invoice.exchangeRateRonEur" />
    </div>
    <div class="flex flex-col gap-1">
      <span class="text-sm">Discount %</span>
      <el-input v-model="invoice.discount" />
    </div>
    <div class="flex flex-col gap-1">
      <span class="text-sm">Discount Label</span>
      <el-input v-model="invoice.discountLabel" />
    </div>
    <div class="flex flex-col items-start gap-1">
      <span class="text-sm">Show USD</span>
      <el-checkbox v-model="invoice.showLabel" size="large" />
    </div>
    <div class="flex flex-col gap-1">
      <span class="text-sm">Exchange Rate USD</span>
      <el-input v-model="invoice.exchangeRateUsd" />
    </div>
  </div>
</template>

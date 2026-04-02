<script setup lang="ts">
import { useRouter } from 'vue-router';
import BigTitle from '../shared/TextPieces/BigTitle.vue';
import { useInvoices } from '@/stores/invoices';
import { onMounted } from 'vue';
import InvoicesTable from '../shared/Tables/InvoicesTable.vue';

const router = useRouter();
const invoices = useInvoices();

onMounted(async() => {
  await invoices.getInvoices();
});
</script>
<template>
  <div class="w-full h-screen p-4 bg-gray-300">
    <div class="bg-white rounded-lg shadow-lg h-full overflow-hidden">
      <div class="p-4 border-b border-gray-200 flex flex-row items-center gap-6 mx-6">
        <BigTitle :text="'Invoices'" />
        <el-button @click="router.push('/addInvoice')" type="primary">
          Add Invoice
        </el-button>
      </div>
      <div class="mx-12 mt-5">
        <InvoicesTable :invoices="invoices.invoiceList" />
      </div>
    </div>
  </div>
</template>

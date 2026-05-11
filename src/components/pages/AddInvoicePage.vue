<script setup lang="ts">
import { onMounted, ref, watch, type Ref } from 'vue';
import BigTitle from '../shared/TextPieces/BigTitle.vue';
import type { carrier } from '@/models/cargo-related/carrier';
import { useInvoice } from '@/stores/invoice';
import { useCarriers } from '@/stores/carriers';
import { useClients } from '@/stores/clients';
import NewInvoiceComponent from '../shared/NewInvoiceComponent.vue';
import CarrierCard from '../shared/Cards/CarrierCard.vue';
import { useInvoiceItems } from '@/stores/invoiceItems';
import CompanyOrdersTable from '../shared/Tables/CompanyOrdersTable.vue';
import EssentialCarrierInfoCard from '../shared/Cards/EssentialCarrierInfoCard.vue';
import router from '@/router';

const toFromList = [
  { value: 'Carrier' },
  { value: 'Client'}
];
const selectedToFrom = ref('');
const carriers = useCarriers();
const clients = useClients();
const invoice = useInvoice();
const invoiceItems = useInvoiceItems();
const evaluatedExpressions = ref({
  invoicesTitle: true,
  invoiceToCompanyTitle: false,
  toFromCompanySelect: true,
  companySelectOpen: false,
  selectedCompanyTitle: false,
  invoiceFieldsOpen: false
});
const companies: Ref<carrier[]> = ref([] as carrier[]);

watch(selectedToFrom, async () => {
  if(selectedToFrom.value==="Carrier"){
    evaluatedExpressions.value.companySelectOpen = true;
    await carriers.getCarriers()
    companies.value = carriers.carrierList;
  }else if(selectedToFrom.value==="Client"){
    evaluatedExpressions.value.companySelectOpen = true;
    await clients.getClients();
    companies.value = clients.clientList;
  }
});

watch(() => invoice.companyName, async(newVal) => {
  if (!newVal) return;
  evaluatedExpressions.value.invoiceFieldsOpen = true;
  evaluatedExpressions.value.invoicesTitle = false;
  evaluatedExpressions.value.invoiceToCompanyTitle = true;
  evaluatedExpressions.value.selectedCompanyTitle = true;
  evaluatedExpressions.value.toFromCompanySelect = false;
  evaluatedExpressions.value.companySelectOpen = false;
  await invoiceItems.getInvoiceItems(invoice.companyName);
})

watch(()=>invoiceItems.invoiceItemList, (newVal)=>{
  invoiceItems.invoiceItemList.filter(item=>item.selected);

}, {deep:true})

onMounted(()=>{
  evaluatedExpressions.value.invoicesTitle = true;
  evaluatedExpressions.value.invoiceToCompanyTitle = false;
  evaluatedExpressions.value.toFromCompanySelect = true;
  evaluatedExpressions.value.companySelectOpen = false;
  evaluatedExpressions.value.invoiceFieldsOpen = false;
  invoice.companyName = "";
})

const setSelectedOrder = (orderNumber: number)=>{
    invoiceItems.invoiceItemList.forEach(item=>{
      if(Number(item.internalOrderNumber)===orderNumber){
        item.selected=!item.selected;
      }
    })
}

const createInvoice = async () => {
  const orderNumbers: number[] = invoiceItems.getSelectedItems();
  invoice.netCostAmountEur = invoiceItems.getTotalNetCost();
  invoice.grossCostAmountEur = invoiceItems.getTotalGrossCost();
  invoice.vatPercentage = 21;
  const createdInvoice = await invoice.createInvoice(orderNumbers);
  if(createdInvoice){
    router.push("/invoices");
  }
}

</script>
<template>
  <div class="w-full h-screen p-4 bg-gray-300">
    <div class="bg-white rounded-lg shadow-lg h-full overflow-hidden">
      <div class="p-4 border-b border-gray-200 flex flex-row items-center gap-6 mx-6">
        <BigTitle :text="'Invoices'" v-if="evaluatedExpressions.invoicesTitle"/>
        <BigTitle :text="`Invoice to ${selectedToFrom}`" v-if="evaluatedExpressions.invoiceToCompanyTitle"/>
        <div class="flex flex-col gap-1 w-50" v-if="evaluatedExpressions.toFromCompanySelect">
          <span class="text-xs font-semibold text-gray-500 uppercase tracking-wide">To / From</span>
          <el-select v-model="selectedToFrom" placeholder="Select..." class="w-44">
            <el-option
              v-for="item in toFromList"
              :key="item.value"
              :label="item.value"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="flex flex-col gap-1 w-50" v-if="evaluatedExpressions.companySelectOpen">
          <span class="text-xs font-semibold text-gray-500 uppercase tracking-wide">Select {{ selectedToFrom }}</span>
          <el-select v-model="invoice.companyName" placeholder="Select..." class="w-44">
            <el-option
              v-for="item in companies"
              :key="item.commercialName"
              :label="item.commercialName"
              :value="item.commercialName">
            </el-option>
          </el-select>
        </div>
        <CarrierCard :selectedToFrom="selectedToFrom" :invoiceCompanyName="invoice.companyName" :selectedCompanyTitle="evaluatedExpressions.selectedCompanyTitle"/>
      </div>
        <div class="mx-9 mt-4" v-if="evaluatedExpressions.invoiceFieldsOpen">
          <NewInvoiceComponent/>
        </div>
        <el-divider v-if="evaluatedExpressions.invoiceFieldsOpen" class="mx-12" />
        <div class="mx-12 mb-4" v-if="selectedToFrom==='Client'">
          <CompanyOrdersTable :orders="invoiceItems.invoiceItemList" v-if="evaluatedExpressions.invoiceFieldsOpen" @update:orders="setSelectedOrder" :client="true"/>
        </div>
        <div class="mx-12 mb-4 flex flex-row gap-8 items-start" v-if="selectedToFrom==='Carrier'">
          <CompanyOrdersTable :orders="invoiceItems.invoiceItemList" v-if="evaluatedExpressions.invoiceFieldsOpen" @update:orders="setSelectedOrder" :client="false"/>
          <EssentialCarrierInfoCard :carrierName="invoice.companyName" v-if="evaluatedExpressions.invoiceFieldsOpen"/>
        </div>
        <div class="mx-13 mt-7" v-if="evaluatedExpressions.invoiceFieldsOpen">
          <el-button type="success" @click="createInvoice">Add Invoice</el-button>
        </div>
    </div>
  </div>
</template>

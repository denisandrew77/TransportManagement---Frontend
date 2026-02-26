<script setup lang="ts">
import OrdersTableComponent from '../shared/OrdersTableComponent.vue';
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import { useOrders } from '@/stores/orders';
import { useOrder } from '@/stores/order';
import type { orderTableColumn } from '@/models/UI-related/ordersTableColumns';

const router = useRouter();
const orders = useOrders();
const order = useOrder();

const tableOrders = ref([] as orderTableColumn[]);
const navigate = ()=>{
  order.resetFields();
  router.push("/newOrder");
}

onMounted(async ()=>{
await orders.getOrders();
tableOrders.value = orders.orders;
})
tableOrders.value = orders.orders;
const selectedDate = ref("");
const orderSearchValue = ref("");

const filterOrders = ()=>{
  tableOrders.value = orders.orders;
  tableOrders.value = tableOrders.value.filter((order)=>order.orderNumber===Number(orderSearchValue.value));
  if(orderSearchValue.value===""){
    tableOrders.value = orders.orders;
  }
}
</script>
<template>
  <div class="w-full h-screen p-4 bg-gray-300">
    <div class="bg-white rounded-lg shadow-lg h-full overflow-hidden">
      <div class="p-4 border-b border-gray-200 flex flex-row items-center gap-4 mx-6">
        <div class="w-90">
           <el-date-picker
          v-model="selectedDate"
          type="daterange"
          range-separator="To"
          start-placeholder="Start date"
          end-placeholder="End date"
        />
        </div>
        <el-button type="primary" @click="navigate">
          <div class="flex flex-row gap-2">
            <div>
            <i class="bi bi-plus-lg"></i>
          </div>
            <div>
              Add Order
            </div>
          </div>
        </el-button>
        <div class="w-60 flex flex-row items-center gap-3">
          <span>Search</span>
          <el-input v-model="orderSearchValue" @input="filterOrders"/>
        </div>

      </div>
      <div class="overflow-auto" style="height: calc(100% - 80px);">
        <OrdersTableComponent :tableData="tableOrders"/>
      </div>
    </div>
  </div>
</template>

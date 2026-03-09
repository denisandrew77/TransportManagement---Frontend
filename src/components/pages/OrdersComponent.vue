<script setup lang="ts">
import OrdersTableComponent from '../shared/Tables/OrdersTableComponent.vue';
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
});
tableOrders.value = orders.orders;
const selectedDate = ref([]);
const orderSearchValue = ref("");
const orderSearchValueByNumber = ref("");

/*const filterOrders = ()=>{
  tableOrders.value = orders.orders;
  tableOrders.value = tableOrders.value.filter((order)=>order.orderNumber===Number(orderSearchValue.value));
  if(orderSearchValue.value===""){
    tableOrders.value = orders.orders;
  }
}*/

const findAllByText = async ()=>{
  tableOrders.value = await orders.getOrdersByTextFound(orderSearchValue.value);
  console.log(tableOrders.value)
}

const filterOrdersByPlate = (value: string)=>{
  tableOrders.value = orders.orders;
  value = value.toLowerCase();
  tableOrders.value = tableOrders.value.filter((order)=>{
    let found = false;
    order.plateNumber.forEach((plate)=>{plate=plate.toLowerCase(); if(plate.includes(value) && value!=="") {found=true;}})
    return found;
  });
  if(value===""){
    tableOrders.value = orders.orders;
  }
}

const filterOrdersByCarrier = (value: string)=>{
  tableOrders.value = orders.orders;
  value = value.toLowerCase();
  tableOrders.value = tableOrders.value.filter((order)=>{
    let found = false;
    order.carrier.forEach((carrier)=>{carrier=carrier.toLowerCase(); if(carrier.includes(value) && value!=="") {found=true;}})
    return found;
  });
  if(value===""){
    tableOrders.value = orders.orders;
  }
}

const filterOrdersByClientNumber = (value: string)=>{
  tableOrders.value = orders.orders;
  value = value.toLowerCase();
  tableOrders.value = tableOrders.value.filter((order)=>{
    return order.clientNumber.toLowerCase().includes(value) && value!=="";
  });
  if(value===""){
    tableOrders.value = orders.orders;
  }
}

const filterOrdersByClient = (value: string)=>{
  tableOrders.value = orders.orders;
  value = value.toLowerCase();
  tableOrders.value = tableOrders.value.filter((order)=>{
    return order.client.toLowerCase().includes(value) && value!=="";
  });
  if(value===""){
    tableOrders.value = orders.orders;
  }
}

const filterOrdersByLoadingCountry = (value: string)=>{
  tableOrders.value = orders.orders;
  value = value.toLowerCase();
  tableOrders.value = tableOrders.value.filter((order)=>{
    if(order.loading[0]?.split("-")[0]?.toLowerCase().includes(value)){
      return true;
    } else return false;
  });
  if(value===""){
    tableOrders.value = orders.orders;
  }
}

const filterOrdersByLoadingCity = (value: string)=>{
  tableOrders.value = orders.orders;
  value = value.toLowerCase();
  tableOrders.value = tableOrders.value.filter((order)=>{
    if(order.loading[0]?.split("-")[2]?.toLowerCase().includes(value)){
      return true;
    } else return false;
  });
  if(value===""){
    tableOrders.value = orders.orders;
  }
}

const filterOrdersByLoadingPostalCode = (value: string)=>{
  tableOrders.value = orders.orders;
  value = value.toLowerCase();
  tableOrders.value = tableOrders.value.filter((order)=>{
    if(order.loading[0]?.split("-")[1]?.toLowerCase().includes(value)){
      return true;
    } else return false;
  });
  if(value===""){
    tableOrders.value = orders.orders;
  }
}

const filterOrdersByDeliveryCountry = (value: string)=>{
  tableOrders.value = orders.orders;
  value = value.toLowerCase();
  tableOrders.value = tableOrders.value.filter((order)=>{
    if(order.delivery[0]?.split("-")[0]?.toLowerCase().includes(value)){
      return true;
    } else return false;
  });
  if(value===""){
    tableOrders.value = orders.orders;
  }
}

const filterOrdersByDeliveryCity = (value: string)=>{
  tableOrders.value = orders.orders;
  value = value.toLowerCase();
  tableOrders.value = tableOrders.value.filter((order)=>{
    if(order.delivery[0]?.split("-")[2]?.toLowerCase().includes(value)){
      return true;
    } else return false;
  });
  if(value===""){
    tableOrders.value = orders.orders;
  }
}

const filterOrdersByDeliveryPostalCode = (value: string)=>{
  tableOrders.value = orders.orders;
  value = value.toLowerCase();
  tableOrders.value = tableOrders.value.filter((order)=>{
    if(order.delivery[0]?.split("-")[1]?.toLowerCase().includes(value)){
      return true;
    } else return false;
  });
  if(value===""){
    tableOrders.value = orders.orders;
  }
}

const filterOrdersByStatus = (value: string)=>{
  tableOrders.value = orders.orders;
  value = value.toLowerCase();
  tableOrders.value = tableOrders.value.filter((order)=>{
    return order.status.toLowerCase().includes(value) && value!=="";
  });
  if(value===""){
    tableOrders.value = orders.orders;
  }
}

const filterOrdersByDate = () =>{
  tableOrders.value = orders.orders;
  let fromDate: Date, toDate : Date;
  if(selectedDate.value!==null || selectedDate.value!==undefined){
    fromDate = new Date(String(selectedDate?.value[0]));
    toDate = new Date(String(selectedDate?.value[1]));
    tableOrders.value = tableOrders.value.filter((order)=>{
      const loadingDate : Date = new Date(String(order.loading[1]?.split("/")[1]?.slice(1)));
      const deliveryDate : Date = new Date(String(order.delivery[1]?.split("/")[1]?.slice(1)));
      if(fromDate.getDate()<=loadingDate.getDate() && fromDate.getDate()<=deliveryDate.getDate() &&
          toDate.getDate()>=loadingDate.getDate() && toDate.getDate()>=deliveryDate.getDate() &&
          fromDate.getMonth()<=loadingDate.getMonth() && fromDate.getMonth()<=deliveryDate.getMonth() &&
          toDate.getMonth()>=loadingDate.getMonth() && toDate.getMonth()>=deliveryDate.getMonth() &&
          fromDate.getFullYear()<=loadingDate.getFullYear() && fromDate.getFullYear()<=deliveryDate.getFullYear() &&
          toDate.getFullYear()>=loadingDate.getFullYear() && toDate.getFullYear()>=deliveryDate.getFullYear()
          ){
            return true
          }
          else return false
    })
  }
  else{
      tableOrders.value = orders.orders;
    }
}

const findAllByOrderNumber = async ()=>{
  tableOrders.value = await orders.getOrdersByOrderNumber(Number(orderSearchValueByNumber.value));
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
          @change="filterOrdersByDate"
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
        <div class="w-90 flex flex-row items-center gap-3">
          <span>Search</span>
          <el-input v-model="orderSearchValue"/>
          <el-button type="primary" @click="findAllByText">
            <div class="flex flex-row gap-2">
              <i class="bi bi-search"></i>
              <div>All</div>
            </div
          ></el-button>
        </div>
        <div class="w-90 flex flex-row items-center gap-3 bg-blue-900 rounded-lg h-15 py-3 px-5">
          <el-input v-model="orderSearchValueByNumber"/>
          <el-button type="primary" @click="findAllByOrderNumber">
            <div class="flex flex-row gap-2">
              <i class="bi bi-search"></i>
              <div>Order number</div>
            </div>
          </el-button>
        </div>
      </div>
      <div class="overflow-auto" style="height: calc(100% - 80px);">
        <OrdersTableComponent
          :tableData="tableOrders"
          @plateValueChange="filterOrdersByPlate"
          @carrierValueChange="filterOrdersByCarrier"
          @clientNumberValueChange="filterOrdersByClientNumber"
          @clientValueChange="filterOrdersByClient"
          @loadingCountryValueChange="filterOrdersByLoadingCountry"
          @loadingCityValueChange="filterOrdersByLoadingCity"
          @loadingPostalCodeValueChange="filterOrdersByLoadingPostalCode"
          @deliveryCountryValueChange="filterOrdersByDeliveryCountry"
          @deliveryCityValueChange="filterOrdersByDeliveryCity"
          @deliveryPostalCodeValueChange="filterOrdersByDeliveryPostalCode"
          @statusValueChange="filterOrdersByStatus"
        />
      </div>
    </div>
  </div>
</template>

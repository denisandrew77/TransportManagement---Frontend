<script setup lang="ts">
import OrdersTableComponent from '../shared/Tables/OrdersTableComponent.vue';
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import { useOrders } from '@/stores/orders';
import { useOrder } from '@/stores/order';
import type { orderTableColumn } from '@/models/UI-related/ordersTableColumns';
import DateRangeSelectorComponent from '../shared/Selectors/DateRangeSelectorComponent.vue';
import SearchOrderNumberDialog from '../shared/Dialogs/SearchOrderNumberDialog.vue';

const router = useRouter();
const orders = useOrders();
const order = useOrder();
const orderNumberSearchDialogVisible = ref(false);

const tableOrders = ref([] as orderTableColumn[]);
const selectedDate = ref<Date>(new Date());

const navigate = ()=>{
  order.resetFields();
  router.push("/newOrder");
}

onMounted(async ()=>{
  const today = new Date();
  orders.orders = await orders.getOrdersByDate(today);
  tableOrders.value = orders.orders;
  selectedDate.value = today;
});
const orderSearchValue = ref("");
const orderNumberSearchValue = ref(0);


const findAllByText = (value: string)=>{
  tableOrders.value = orders.orders;
  value = value.toLowerCase();
  tableOrders.value = tableOrders.value.filter((order)=>{
    let found = false;
    order.plateNumber.forEach((plate)=>{plate=plate.toLowerCase(); if(plate.includes(value) && value!=="") {found=true;}})
    order.carrier.forEach((carrier)=>{carrier=carrier.toLowerCase(); if(carrier.includes(value) && value!=="") {found=true;}})
    if(order.clientNumber.toLowerCase().includes(value) && value!=="") {found=true;}
    if(order.client.toLowerCase().includes(value) && value!=="") {found=true;}
    if(order.loading[0]?.toLowerCase().includes(value) && value!=="") {found=true;}
    if(order.delivery[0]?.toLowerCase().includes(value) && value!=="") {found=true;}
    if(order.status!=null)
    {
      if(order.status.currentStatus?.toLowerCase().includes(value) && value!=="") {found=true;}
    }
    return found;
  });
  if(value===""){
    tableOrders.value = orders.orders;
  }
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
  value = value.toLowerCase();
  tableOrders.value = tableOrders.value.filter((order)=>{
    return order.clientNumber.toLowerCase().includes(value) && value!=="";
  });
  if(value===""){
    tableOrders.value = orders.orders;
  }
}

const filterOrdersByClient = (value: string)=>{
  value = value.toLowerCase();
  tableOrders.value = tableOrders.value.filter((order)=>{
    return order.client.toLowerCase().includes(value) && value!=="";
  });
  if(value===""){
    tableOrders.value = orders.orders;
  }
}

const filterOrdersByLoadingCountry = (value: string)=>{
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
  value = value.toLowerCase();
  tableOrders.value = tableOrders.value.filter((order)=>{
    if(order.delivery[0]?.split("-")[1]?.toLowerCase().includes(value)){
      return true;
    } else return false;
  });
  if(value===""){
    tableOrders.value = orders.orders;
    console.log(orders.orders);
  }
}

const filterOrdersByStatus = (value: string)=>{
  value = value.toLowerCase();
  tableOrders.value = tableOrders.value.filter((order)=>{
    return order.status.currentStatus.toLowerCase().includes(value) && value!=="";
  });
  if(value===""){
    tableOrders.value = orders.orders;
  }
}

const filterOrdersByDate = () =>{
  if(selectedDate.value){
    const selectedDateObj = new Date(String(selectedDate.value));
    tableOrders.value = tableOrders.value.filter((order)=>{
      const loadingDate : Date = new Date(String(order.loading[1]?.split("/")[1]?.slice(1)));
      const deliveryDate : Date = new Date(String(order.delivery[1]?.split("/")[1]?.slice(1)));
      if(selectedDateObj.getDate()===loadingDate.getDate() && selectedDateObj.getDate()===deliveryDate.getDate() &&
          selectedDateObj.getMonth()===loadingDate.getMonth() && selectedDateObj.getMonth()===deliveryDate.getMonth() &&
          selectedDateObj.getFullYear()===loadingDate.getFullYear() && selectedDateObj.getFullYear()===deliveryDate.getFullYear()
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


const setValue = (searchOrderValue: number)=>{
  orderNumberSearchValue.value=searchOrderValue;
}

const findByOrderNumber = async ()=>{
  tableOrders.value = await orders.getOrdersByOrderNumber(orderNumberSearchValue.value);
}

const getOrdersByDate = async (date: Date)=>{
  if(date===null || date===undefined){
    tableOrders.value = await orders.getOrdersByDate(selectedDate.value);
    return;
  }
  selectedDate.value = date;
  orders.orders = await orders.getOrdersByDate(date);
  tableOrders.value = orders.orders;
}
</script>
<template>
  <div class="w-full h-screen p-4 bg-gray-300">
    <div class="bg-white rounded-lg shadow-lg h-full overflow-hidden">
      <div class="p-4 border-b border-gray-200 flex flex-row items-center justify-between gap-4 mx-6">
        <div class="flex flex-row gap-8">
          <DateRangeSelectorComponent @dateUpdate="getOrdersByDate"/>
          <div>
            <el-button type="primary" @click="navigate">
            <div class="flex flex-row  gap-2">
              <div>
                <i class="bi bi-plus-lg"></i>
              </div>
              <div>
                Add Order
              </div>
            </div>
          </el-button>
          </div>
          <div>
            <el-button type="primary" @click="orderNumberSearchDialogVisible=true">
            <div class="flex flex-row gap-2">
              <i class="bi bi-search"></i>
              <div>Order number</div>
            </div>
          </el-button>
          </div>
        </div>
        <div class="w-90 flex flex-row items-center gap-3">
          <div>Search:</div>
          <el-input v-model="orderSearchValue" @input="findAllByText"/>
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
          @statusUpdate="getOrdersByDate"
        />
      </div>
    </div>
  </div>
  <SearchOrderNumberDialog v-model:visibility="orderNumberSearchDialogVisible" @update:visibility="findByOrderNumber" @sendSearchValue="setValue"/>
</template>

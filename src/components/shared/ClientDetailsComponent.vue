<script setup lang="ts">
import LoadingDetailsComponent from './Client/LoadingDetailsComponent.vue'
import IndexListComponent from './Client/IndexListComponent.vue'
import GoodsComponent from './GoodsComponent.vue'
import MediumTitle from './TextPieces/MediumTitle.vue'
import { useOrder } from '@/stores/order'
import { onMounted, ref } from 'vue'
import UnCompletedFieldsDialog from './Dialogs/UnCompletedFieldsDialog.vue'
import { useClients } from '@/stores/clients'
import { useRoute, useRouter } from 'vue-router'

onMounted(async ()=>{
  if(route.params.state !== 'edit'){
    await order.setNewOrderNumber();
  }
  await clients.getClients();
})

const route = useRoute();
const order = useOrder();
const clients = useClients();
const router = useRouter();

const saveOrder = async () =>{
  if(order.verifyIfFieldsCompleted()){
    await order.createOrder();
    router.push("/dashboard");
  }
  else dialogVisibility.value=true;
}

const dialogVisibility = ref(false);
</script>
<template>
  <div class="m-4">
    <div class="bg-blue-300 p-2 flex flex-row justify-between">
      <div class="flex flex-row gap-6">
        <div class="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-800 px-3 py-1.5 rounded-md">
          <i class="bi bi-box-seam-fill text-white text-lg"></i>
          <span class="text-base font-bold text-white">{{ order.orderNumber }}</span>
        </div>
        <div class="flex flex-row items-center gap-2 text-xl">
          <div class="font-bold">Client</div>
          <div class="w-48">
            <el-select v-model="order.client">
              <el-option
                v-for="client in clients.clientList"
                :label="client.commercialName"
                :value="client.commercialName"
                :key="client.commercialName"
              />
            </el-select>
          </div>
        </div>
        <div class="flex flex-row items-center gap-2 text-xl font-bold">
          <div>Client Ref</div>
          <div>
            <el-input v-model="order.clientRefference"></el-input>
          </div>
        </div>
      </div>
      <div class="flex flex-row gap-5">
        <div class="flex flex-row gap-3 items-center">
          <el-button>Duplicate</el-button>
          <el-button>Show Map</el-button>
          <el-button>Order to client</el-button>
          <el-button type="danger">Delete</el-button>
          <el-button type="success" @click="saveOrder">Save and edit this item</el-button>
        </div>
      </div>
    </div>
    <div class="bg-gray-200 p-2 flex flex-col">
      <div class="flex flex-row gap-30">
        <IndexListComponent  class="mt-7"/>
        <div class="flex flex-col items-center">
          <MediumTitle :text="'Sender'" />
          <LoadingDetailsComponent v-model="order.loading" />
        </div>
        <div class="flex flex-col items-center">
          <MediumTitle :text="'Receiver'" />
          <LoadingDetailsComponent v-model="order.delivery" />
        </div>
          <GoodsComponent />
      </div>
    </div>
  </div>
  <UnCompletedFieldsDialog v-model:visibility="dialogVisibility" @update:visibility="dialogVisibility=false"/>
</template>

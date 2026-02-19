<script setup lang="ts">
import InputComponent from './Inputs/InputComponent.vue'
import WhiteButtonComponent from './Buttons/WhiteButtonComponent.vue'
import RedButtonComponent from './Buttons/RedButtonComponent.vue'
import GreenButtonComponent from './Buttons/GreenButtonComponent.vue'
import LoadingDetailsComponent from './Client/LoadingDetailsComponent.vue'
import IndexListComponent from './Client/IndexListComponent.vue'
import GoodsComponent from './GoodsComponent.vue'
import MediumTitle from './TextPieces/MediumTitle.vue'
import { useOrder } from '@/stores/order'
import { onMounted, ref } from 'vue'
import UnCompletedFieldsDialog from './Dialogs/UnCompletedFieldsDialog.vue'

onMounted(async ()=>{
  await order.setNewOrderNumber();
})

const order = useOrder()

const saveOrder = async () =>{
  if(order.verifyIfFieldsCompleted()){
    await order.createOrder();
    await order.setNewOrderNumber();
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
        <div class="flex flex-row items-center gap-2 text-xl font-bold">
          <div>Client</div>
          <div>
            <InputComponent v-model="order.client" :placeHolder="'client name'" />
          </div>
        </div>
        <div class="flex flex-row items-center gap-2 text-xl font-bold">
          <div>Client Ref</div>
          <div>
            <InputComponent v-model="order.clientRefference" :placeHolder="'client refference'" />
          </div>
        </div>
      </div>
      <div class="flex flex-row gap-5">
        <div class="flex flex-row gap-3">
          <WhiteButtonComponent :name="'Duplicate'" />
          <WhiteButtonComponent :name="'Show Map'" />
          <WhiteButtonComponent :name="'Order to client'" />
        </div>
        <div class="">
          <RedButtonComponent :name="'Delete'" class="mr-4" />
          <GreenButtonComponent :name="'Save and edit this item'" @clicked="saveOrder"/>
        </div>
      </div>
    </div>
    <div class="bg-gray-200 p-2 flex flex-col">
      <div class="flex flex-row gap-15">
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

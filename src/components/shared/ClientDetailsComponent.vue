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
import ObservationsComponent from './Inputs/ObservationsComponent.vue'

const order = useOrder()
</script>
<template>
  <div class="m-4">
    <div class="bg-blue-300 p-2 flex flex-row justify-between">
      <div class="flex flex-row gap-6">
        <div class="text-xs pt-2">Order-No</div>
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
          <GreenButtonComponent :name="'Save and edit this item'" />
        </div>
      </div>
    </div>
    <div class="bg-gray-200 p-2 flex flex-col">
      <div class="flex flex-row justify-between w-160">
        <div></div>
        <MediumTitle :text="'Sender'" />
        <MediumTitle :text="'Receiver'" />
      </div>
      <div class="flex flex-row gap-3">
        <IndexListComponent />
        <LoadingDetailsComponent v-model="order.loading" />
        <LoadingDetailsComponent v-model="order.delivery" />
        <GoodsComponent />
        <div class="flex flex-col">
          <ObservationsComponent v-model="order.observations" :name="'Observations'" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouteAndPriceDetails } from '@/stores/routeDetails';
import NumberInput from './Inputs/NumberInput.vue'
import { onMounted, watch } from 'vue';
import { storeToRefs } from 'pinia';
const routeAndPrice = useRouteAndPriceDetails();
const { carrierPrice, highwaysPrice, waitingPrice, hotelPrice, clientPrice, totalCarrierPrice } = storeToRefs(routeAndPrice);

onMounted(()=>{
  routeAndPrice.calculateTotalCarrierPrice();
  routeAndPrice.calculateProfit();
});
watch([carrierPrice, highwaysPrice, waitingPrice, hotelPrice, clientPrice, totalCarrierPrice], ()=>{
  routeAndPrice.calculateTotalCarrierPrice();
  routeAndPrice.calculateProfit();
});


</script>
<template>
  <div class="p-3 bg-blue-300 rounded-2xl flex flex-col gap-4 justify-center">
    <div class="font-bold text-white bg-blue-600 py-2 px-6 text-xl rounded-xl w-full text-center">Price Estimation</div>
    <div class="flex flex-row justify-between gap-6 items-center">
      <div class="flex flex-col gap-3">
        <div class="flex flex-row items-center justify-between gap-3">
          <span>Carrier Price</span>
          <NumberInput class="w-25" v-model="routeAndPrice.carrierPrice"/>
        </div>
        <div class="flex flex-row items-center justify-between gap-3">
          <span>Highways</span>
          <NumberInput class="w-25" v-model="routeAndPrice.highwaysPrice"/>
        </div>
        <div class="flex flex-row items-center justify-between gap-3">
          <span>Waiting</span>
          <NumberInput class="w-25" v-model="routeAndPrice.waitingPrice"/>
        </div>
        <div class="flex flex-row items-center justify-between gap-3">
          <span>Hotel</span>
          <NumberInput class="w-25" v-model="routeAndPrice.hotelPrice"/>
        </div>
      </div>
      <div  class="flex flex-col gap-3 relative h-full">
        <div class="flex flex-row items-center justify-between gap-3">
          <span>Carrier Price</span>
          <NumberInput class="w-25" v-model="routeAndPrice.totalCarrierPrice"/>
        </div>
        <div class="flex flex-row items-center justify-between gap-3">
          <span>Client Price</span>
          <NumberInput class="w-25" v-model="routeAndPrice.clientPrice"/>
        </div>
      </div>
    </div>
    <div class="flex flex-row justify-around">
      <div class="flex flex-col items-center mt-2">
          <span class="text-xs">Carrier price</span>
          <div class="font-bold text-2xl">{{routeAndPrice.totalCarrierPrice}}€</div>
      </div>
      <div class="flex flex-col items-center">
          <span class="text-xs">Profit</span>
          <div class=" font-medium text-2xl p-2 bg-green-700 text-white rounded-md">{{routeAndPrice.profit}}€</div>
      </div>
    </div>
  </div>
</template>

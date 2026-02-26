<script setup lang="ts">
import NumberInput from './Inputs/NumberInput.vue'
import { onMounted, watch } from 'vue';
import { useOrder } from '@/stores/order';

const props = defineProps<{
  currentCarrierNumber: number
}>()

const order = useOrder();

onMounted(()=>{
  order.calculateCarrierPrice();
  console.log(order.currentCarrier)
});

watch(() => order.currentCarrier, ()=>{
  order.calculateCarrierPrice();
  order.calculateTotalCarrierPrice();
}, { deep: true });
watch(() => order.carriers, ()=>{
  order.calculateCarrierPrice();
  order.calculateTotalCarrierPrice();
}, { deep: true });


const updateCarrierPrice = () =>{
  for(const carrier of order.carriers){
    if(carrier.number===props.currentCarrierNumber){
      carrier.carrierPrice=order.currentCarrier.carrierPrice;
    }
  }
}

const updateHighways = () =>{
  for(const carrier of order.carriers){
    if(carrier.number===props.currentCarrierNumber){
      carrier.highways=order.currentCarrier.highways;
    }
  }
}

const updateWaiting = () =>{
  for(const carrier of order.carriers){
    if(carrier.number===props.currentCarrierNumber){
      carrier.waiting=order.currentCarrier.waiting;
    }
  }
}

const updateHotel = () =>{
  for(const carrier of order.carriers){
    if(carrier.number===props.currentCarrierNumber){
      carrier.hotel=order.currentCarrier.hotel;
    }
  }
}
</script>
<template>
  <div class="p-3 bg-blue-300 rounded-2xl flex flex-col gap-4 justify-center">
    <div class="font-bold text-white bg-blue-600 py-2 px-6 text-xl rounded-xl w-full text-center">Price Estimation</div>
    <div class="flex flex-row justify-between gap-6 items-center">
      <div class="flex flex-col gap-3">
        <div class="flex flex-row items-center justify-between gap-3">
          <span>Carrier Price</span>
          <NumberInput class="w-25" v-model="order.currentCarrier.carrierPrice" @update:modelValue="updateCarrierPrice"/>
        </div>
        <div class="flex flex-row items-center justify-between gap-3">
          <span>Highways</span>
          <NumberInput class="w-25" v-model="order.currentCarrier.highways" @update:modelValue="updateHighways"/>
        </div>
        <div class="flex flex-row items-center justify-between gap-3">
          <span>Waiting</span>
          <NumberInput class="w-25" v-model="order.currentCarrier.waiting" @update:modelValue="updateWaiting"/>
        </div>
        <div class="flex flex-row items-center justify-between gap-3">
          <span>Hotel</span>
          <NumberInput class="w-25" v-model="order.currentCarrier.hotel" @update:modelValue="updateHotel"/>
        </div>
      </div>
      <div  class="flex flex-col gap-3 relative h-full">
        <div class="flex flex-row items-center justify-between gap-3">
          <span>All Carriers Price</span>
          <NumberInput class="w-25" v-model="order.finalPrice.totalCarriersPrice"/>
        </div>
        <div class="flex flex-row items-center justify-between gap-3">
          <span>Client Price</span>
          <NumberInput class="w-25" v-model="order.finalPrice.clientPrice"/>
        </div>
      </div>
    </div>
    <div class="flex flex-row justify-around">
      <div class="flex flex-col items-center mt-2">
          <span class="text-xs">Total Carrier Price</span>
          <div class="font-bold text-2xl">{{order.currentCarrier.totalCarrierPrice}} €</div>
      </div>
      <div class="flex flex-col items-center">
          <span class="text-xs">Profit</span>
          <div class=" font-medium text-2xl p-2 bg-green-700 text-white rounded-md">{{order.finalPrice.clientPrice - order.finalPrice.totalCarriersPrice}} €</div>
      </div>
    </div>
  </div>
</template>

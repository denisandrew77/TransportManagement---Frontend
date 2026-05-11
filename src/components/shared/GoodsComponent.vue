<script setup lang="ts">
import { useOrder } from '@/stores/order'

const tailwindDesign = '!w-1/8 py-3 px-2'
//const transportQuote = useTransportQuote();
const list = [
  { name: 'Type' },
  { name: 'No.' },
  { name: 'Length' },
  { name: 'Width' },
  { name: 'Height' },
  { name: 'Weight' },
  { name: 'Stack' },
]
const goodTypes = [{ name: 'Pallets' }, { name: 'Boxes' }]
function addGood() {
  transportOrder.goods.push({
    type: '',
    number: 0,
    length: 0,
    width: 0,
    height: 0,
    weight: 0,
    stack: false,
  })
}
function removeGood(index: number) {
  if (transportOrder.goods.length > 1) {
    transportOrder.goods.splice(index, 1)
  }
}

const transportOrder = useOrder()
</script>
<template>
  <div class="rounded-md bg-white m-4 shadow-2xl relative w-1/3 h-1/4">
    <div class="font-bold text-[17px] text-center pb-2.5 pt-2.5 px-4 align-middle bg-blue-500 text-white">
      Goods
    </div>
    <button class="absolute top-2 right-2 px-1.5 py-0.5 rounded-full bg-blue-400 hover:bg-blue-600 mr-2"
      @click="addGood">
      <i class="bi bi-plus-lg text-white !font-extrabold"></i>
    </button>
    <div class="grid justify-items-center grid-cols-8 bg-blue-200">
      <div v-for="reference in list" class="lg:py-2 ">
        {{ reference.name }}
      </div>
      <div></div>
    </div>
    <div v-for="good in transportOrder.goods" class="grid grid-cols-8 gap-2 my-2 justify-items-center ml-2">
      <div class="flex items-center justify-center h-full w-full">
        <el-select v-model="good.type" >
          <el-option v-for="value in goodTypes" v-bind:key="value.name" :value="value.name">{{value.name}}</el-option>
        </el-select>
      </div>
      <div class="flex items-center justify-center h-full">
        <el-input v-model="good.number"></el-input>
      </div>
      <div class="flex items-center justify-center h-full">
        <el-input v-model="good.length"></el-input>
      </div>
      <div class="flex items-center justify-center h-full">
        <el-input v-model="good.width"></el-input>
      </div>
      <div class="flex items-center justify-center h-full">
        <el-input v-model="good.height"></el-input>
      </div>
      <div class="flex items-center justify-center h-full">
        <el-input v-model="good.weight"></el-input>
      </div>
      <div class="flex items-center justify-center h-full">
        <el-checkbox size="large" v-model="good.stack" />
      </div>
      <div class="flex items-center justify-center h-full">
        <button
        class="bg-red-400 hover:bg-red-500 px-2 rounded-full w-10 h-9"
        @click="() => removeGood(transportOrder.goods.indexOf(good))">
        <i class="bi bi-x text-2xl"></i>
      </button>
      </div>
    </div>
  </div>
</template>

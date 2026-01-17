<script setup lang="ts">
import { useOrder } from '@/stores/order'

const tailwindDesign = '!w-1/8 lg:py-3 px-1'
//const transportQuote = useTransportQuote();
const list = [
  { name: 'Type' },
  { name: 'No.' },
  { name: 'Length' },
  { name: 'Width' },
  { name: 'Height' },
  { name: 'Weight' },
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
  transportOrder.goods.splice(index, 1)
}

const transportOrder = useOrder()
</script>
<template>
  <div class="rounded-md bg-white m-4 shadow-2xl relative w-1/3">
    <div class="font-bold text-[17px] text-center pb-2.5 pt-2.5 px-4 align-middle bg-blue-500 text-white">
      Goods
    </div>
    <button class="absolute top-2 right-2 px-1.5 py-0.5 rounded-full bg-blue-400 hover:bg-blue-600 mr-2"
      @click="addGood">
      <i class="bi bi-plus-lg text-white !font-extrabold"></i>
    </button>
    <div class="flex flex-row bg-blue-200 !h-10 pl-4">
      <div v-for="reference in list" class="lg:py-2 flex justify-between w-96">
        <div class="text-[15px]">{{ reference.name }}</div>
      </div>
      <div class="px-2 w-full text-[15px] flex items-center">Stack</div>
    </div>
    <div class="flex flex-row relative ml-2" v-for="good in transportOrder.goods">
      <el-select :class="tailwindDesign" v-model="good.type">
        <el-option v-for="value in goodTypes" v-bind:key="value.name" :value="value.name">{{
          value.name
        }}</el-option>
      </el-select>
      <el-input :class="tailwindDesign" v-model="good.number"></el-input>
      <el-input :class="tailwindDesign" v-model="good.length"></el-input>
      <el-input :class="tailwindDesign" v-model="good.width"></el-input>
      <el-input :class="tailwindDesign" v-model="good.height"></el-input>
      <el-input :class="tailwindDesign" v-model="good.weight"></el-input>
      <el-checkbox class="top-2 right-5 mx-4 pl-1 ml-15" size="large" v-model="good.stack" />
      <button
        class="bg-red-400 hover:bg-red-500 px-2 rounded-full mt-2 lg:absolute lg:right-3 lg:bottom-3 md:absolute md:right-1"
        @click="() => removeGood(transportOrder.goods.indexOf(good))">
        <i class="bi bi-x text-2xl"></i>
      </button>
    </div>
  </div>
</template>

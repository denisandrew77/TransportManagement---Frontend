<script setup lang="ts">
import SizedInputComponent from './Inputs/SizedInputComponent.vue';
import SmallBlackTitleComponent from './TextPieces/SmallBlackTitleComponent.vue';
import { ref } from 'vue';
const inputValues = ref(
  {
    invoice: "",
    approachKms: "",
    approachRate: "",
    approachTotal: "",
    loadKms: "",
    loadRate: "",
    loadTotal: "",
    closingKms: "",
    closingRate: "",
    closingTotal: "",
    highways: "",
    waiting: "",
    hotel: "",
    total: "",
    priceClient: "",
    priceCarrier: "",
    kms: "",
    transitTime: "",
    jobTime: ""
  }
)
</script>
<template>
  <div class="mx-4 mt-4 flex flex-row gap-8">
    <!-- Left side -->
    <div class="flex flex-col gap-4">
      <!-- Approach kms -->
      <div class="flex flex-row items-center gap-3">
        <div class="w-32">
          <SmallBlackTitleComponent :text="'Approach kms'" />
        </div>
        <SizedInputComponent v-model="inputValues.approachKms" class="w-40" />
        <span>x EUR/Km</span>
        <SizedInputComponent v-model="inputValues.approachRate" class="w-40" />
        <span>=</span>
        <SizedInputComponent v-model="inputValues.approachTotal" class="w-40" />
      </div>

      <!-- Load kms -->
      <div class="flex flex-row items-center gap-3">
        <div class="w-32">
          <SmallBlackTitleComponent :text="'Load kms'" />
        </div>
        <SizedInputComponent v-model="inputValues.loadKms" class="w-40" />
        <span>x EUR/Km</span>
        <SizedInputComponent v-model="inputValues.loadRate" class="w-40" />
        <span>=</span>
        <SizedInputComponent v-model="inputValues.loadTotal" class="w-40" />
      </div>

      <!-- Closing kms -->
      <div class="flex flex-row items-center gap-3">
        <div class="w-32">
          <SmallBlackTitleComponent :text="'Closing kms'" />
        </div>
        <SizedInputComponent v-model="inputValues.closingKms" class="w-40" />
        <span>x EUR/Km</span>
        <SizedInputComponent v-model="inputValues.closingRate" class="w-40" />
        <span>=</span>
        <SizedInputComponent v-model="inputValues.closingTotal" class="w-40" />
      </div>

      <!-- Highways -->
      <div class="flex flex-row items-center gap-3">
        <div class="w-32">
          <SmallBlackTitleComponent :text="'Highways'" />
        </div>
        <SizedInputComponent v-model="inputValues.highways" class="w-40" />
      </div>

      <!-- Waiting -->
      <div class="flex flex-row items-center gap-3">
        <div class="w-32">
          <SmallBlackTitleComponent :text="'Waiting'" />
        </div>
        <SizedInputComponent v-model="inputValues.waiting" class="w-40" />
      </div>

      <!-- Hotel -->
      <div class="flex flex-row items-center gap-3">
        <div class="w-32">
          <SmallBlackTitleComponent :text="'Hotel'" />
        </div>
        <SizedInputComponent v-model="inputValues.hotel" class="w-40" />
      </div>

      <!-- Total -->
      <div class="flex flex-row items-center gap-3 mt-4">
        <div class="border-2 border-gray-400 rounded px-4 py-2 w-40 text-center">
          <SmallBlackTitleComponent :text="'Total'" />
        </div>
        <SizedInputComponent v-model="inputValues.total" class="w-40" />
      </div>
    </div>

    <!-- Right side -->
    <div class="bg-blue-300 p-4 rounded shadow-md w-72 flex flex-col gap-4">
      <div class="flex flex-row items-center gap-3">
        <div class="w-32">
          <SmallBlackTitleComponent :text="'Price client'" />
        </div>
        <SizedInputComponent v-model="inputValues.priceClient" class="w-40" />
      </div>

      <div class="flex flex-row items-center gap-3">
        <div class="w-32">
          <SmallBlackTitleComponent :text="'Price carrier'" />
        </div>
        <SizedInputComponent v-model="inputValues.priceCarrier" class="w-40" />
      </div>

      <div class="flex flex-row items-center gap-3">
        <div class="w-32">
          <SmallBlackTitleComponent :text="'Kms.'" />
        </div>
        <SizedInputComponent v-model="inputValues.kms" class="w-40" />
      </div>

      <div class="flex flex-row items-center gap-3">
        <div class="w-32">
          <SmallBlackTitleComponent :text="'Transit Time (TT)'" />
        </div>
        <SizedInputComponent v-model="inputValues.transitTime" class="w-40" />
      </div>

      <div class="flex flex-row items-center gap-3">
        <div class="w-32">
          <SmallBlackTitleComponent :text="'Job Time (JT)'" />
        </div>
        <SizedInputComponent v-model="inputValues.jobTime" class="w-40" />
      </div>
    </div>
  </div>
</template>

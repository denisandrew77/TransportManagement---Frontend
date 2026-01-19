<script setup lang="ts">
import { ref } from 'vue';
import SizedInputComponent from './Inputs/SizedInputComponent.vue';
import SmallBlackTitleComponent from './TextPieces/SmallBlackTitleComponent.vue';
import JobEstimateComponent from './JobEstimateComponent.vue';
import ObservationsComponent from './Inputs/ObservationsComponent.vue';

const carrierFiedls = [
  { name: "Carrier" },
  { name: "Contacts" },
  { name: "Plate Nr" },
  { name: "Driver" },
  { name: "Driver Phone" },
];
const carrierSelectedOptions = ref(
  {
    carrier: { value: "", options: [{ name: "Carrier1" }, { name: "Carrier2" }] },
    contacts: { value: "", options: [{ name: "Contact1" }, { name: "Contact2" }] },
    plateNumber: { value: "", options: [{ name: "Plate1" }, { name: "Plate2" }] },
    driver: { value: "" },
    driverPhone: { value: "" }
  }
);
</script>
<template>
  <div class="mx-4 mt-4 bg-blue-300 flex flex-row">
    <div class="flex flex-row">
      <button class="bg-gray-200 w-14 active:bg-gray-300">1</button>
    </div>
    <div class="w-1/10 flex flex-row items-center gap-3 p-2">
      <SmallBlackTitleComponent :text="'Invoice'" />
      <SizedInputComponent class="w-54" />
    </div>
  </div>
  <div class="bg-gray-200 mx-4 flex flex-row pt-5 pl-3">
    <div class=" flex flex-col gap-6 mt-5">
      <div v-for="element in carrierFiedls">
        {{ element.name }}
      </div>
    </div>
    <div class="w-60 gap-4 px-2 mt-4 flex flex-col">
      <el-select v-model="carrierSelectedOptions.carrier.value">
        <el-option v-for="value in carrierSelectedOptions.carrier.options" :key="value.name" :value="value.name"
          :label="value.name">
        </el-option>
      </el-select>

      <el-select v-model="carrierSelectedOptions.contacts.value">
        <el-option v-for="value in carrierSelectedOptions.contacts.options" :key="value.name" :value="value.name"
          :label="value.name">
        </el-option>
      </el-select>

      <el-select v-model="carrierSelectedOptions.plateNumber.value">
        <el-option v-for="value in carrierSelectedOptions.plateNumber.options" :key="value.name" :value="value.name"
          :label="value.name">
        </el-option>
      </el-select>

      <SizedInputComponent v-model="carrierSelectedOptions.driver" />
      <SizedInputComponent v-model="carrierSelectedOptions.driverPhone" />
    </div>
    <JobEstimateComponent class="mb-10 ml-20" />
    <div class="flex flex-row gap-4 ml-8">
      <ObservationsComponent :name="'Additional Information'" :redText="'show in Order'" />
      <ObservationsComponent :name="'Additional Information'" :redText="'show in UPDATES'" />
    </div>
  </div>

</template>

<script setup lang="ts">
import { useVehicles } from '@/stores/vehicle'

defineProps<{
  carrierName: string
}>();
const emit = defineEmits<{
  (e:"createdVehicle", value: boolean): void
}>();

const vehicle = useVehicles()

const createVehicle = async (carrierName: string) => {
  await vehicle.createVehicle(carrierName);
  await vehicle.getCarrierVehicles(carrierName);
  emit('createdVehicle', true);
}
</script>
<template>
  <div class="w-full p-6 flex flex-col gap-8">
    <div class="grid grid-cols-6 gap-x-6 gap-y-8">
      <div class="flex flex-col gap-1">
        <span class="text-sm text-gray-500">Plate number</span>
        <el-input v-model="vehicle.plateNumber" />
      </div>
      <div class="flex flex-col gap-1">
        <span class="text-sm text-gray-500">Driver Name</span>
        <el-input v-model="vehicle.driverName" />
      </div>
      <div class="flex flex-col gap-1">
        <span class="text-sm text-gray-500">Driver Phone</span>
        <el-input v-model="vehicle.driverPhoneNumber" />
      </div>
      <div class="flex flex-col gap-1">
        <span class="text-sm text-gray-500">Status</span>
        <el-input v-model="vehicle.status" />
      </div>
      <div class="flex flex-col gap-1">
        <span class="text-sm text-gray-500">Load weight</span>
        <el-input-number v-model="vehicle.loadWeight" controls-position="right" />
      </div>
      <div class="flex flex-col gap-1">
        <span class="text-sm text-gray-500">Total long</span>
        <el-input-number v-model="vehicle.totalLength" controls-position="right" />
      </div>
      <div class="flex flex-col gap-1">
        <span class="text-sm text-gray-500">Inside long</span>
        <el-input-number v-model="vehicle.insideLength" controls-position="right" />
      </div>
      <div class="flex flex-col gap-1">
        <span class="text-sm text-gray-500">Width</span>
        <el-input-number v-model="vehicle.width" controls-position="right" />
      </div>
      <div class="flex flex-col gap-1">
        <span class="text-sm text-gray-500">Between the wheels</span>
        <el-input-number v-model="vehicle.distanceBetweenWheels" controls-position="right" />
      </div>
      <div class="flex flex-col gap-1">
        <span class="text-sm text-gray-500">Inside high</span>
        <el-input-number v-model="vehicle.insideHeight" controls-position="right" />
      </div>
      <div class="flex flex-col gap-1">
        <span class="text-sm text-gray-500">Total high</span>
        <el-input-number v-model="vehicle.totalHeight" controls-position="right" />
      </div>
      <div class="flex flex-col gap-1">
        <span class="text-sm text-gray-500">Type</span>
        <el-input v-model="vehicle.vehicleType" />
      </div>
      <div class="flex flex-col gap-1">
        <span class="text-sm text-gray-500">Type of carrier</span>
        <el-input v-model="vehicle.carrierType" />
      </div>
      <div class="flex flex-col gap-1">
        <span class="text-sm text-gray-500">Personal Phone</span>
        <el-input v-model="vehicle.personalPhoneNumber" />
      </div>
      <div class="flex flex-col gap-1">
        <span class="text-sm text-gray-500">Insurance goods</span>
        <el-date-picker v-model="vehicle.goodsInsurance" type="date" placeholder="Select date" style="width: 100%" />
      </div>
      <div class="flex flex-col gap-1">
        <span class="text-sm text-gray-500">Obligate inspection</span>
        <el-date-picker v-model="vehicle.obligateInspection" type="date" placeholder="Select date" style="width: 100%" />
      </div>
      <div class="flex flex-col gap-1">
        <span class="text-sm text-gray-500">Weighted</span>
        <el-input-number v-model="vehicle.weight" controls-position="right" />
      </div>
      <div class="flex flex-col gap-1">
        <span class="text-sm text-gray-500">Dkv</span>
        <el-date-picker v-model="vehicle.dkvDate" type="date" placeholder="Select date" style="width: 100%" />
      </div>
      <div class="flex flex-col gap-1">
        <span class="text-sm text-gray-500">Gestrans</span>
        <el-date-picker v-model="vehicle.gesTransDate" type="date" placeholder="Select date" style="width: 100%" />
      </div>
      <div class="flex flex-col gap-1">
        <span class="text-sm text-gray-500">Tarif Aproach kms</span>
        <el-input-number v-model="vehicle.tarifApproachKms" controls-position="right" />
      </div>
      <div class="flex flex-col gap-1">
        <span class="text-sm text-gray-500">Tarif Load kms</span>
        <el-input-number v-model="vehicle.tarrifLoadKms" controls-position="right" />
      </div>
      <div class="flex flex-col gap-1">
        <span class="text-sm text-gray-500">Tarif Closing kms</span>
        <el-input-number v-model="vehicle.tarifClosingKms" controls-position="right" />
      </div>
      <div class="flex flex-col gap-1">
        <span class="text-sm text-gray-500">Registration date</span>
        <el-date-picker v-model="vehicle.registrationDate" type="date" placeholder="Select date" style="width: 100%" />
      </div>
      <div class="flex flex-col gap-1">
        <span class="text-sm text-gray-500">Kms</span>
        <el-input-number v-model="vehicle.totalKilometers" controls-position="right" />
      </div>
      <div class="flex flex-col gap-1">
        <span class="text-sm text-gray-500">Date</span>
        <el-date-picker v-model="vehicle.date" type="date" placeholder="Select date" style="width: 100%" />
      </div>
      <div class="flex flex-col gap-1">
        <span class="text-sm text-gray-500">Vehicle Insurance</span>
        <el-date-picker v-model="vehicle.vehicleInsurance" type="date" placeholder="Select date" style="width: 100%" />
      </div>
      <div class="flex flex-col gap-1">
        <span class="text-sm text-gray-500">Tarif</span>
        <el-input-number v-model="vehicle.tarif" controls-position="right" />
      </div>
    </div>
    <div class="flex justify-end pt-4 border-t border-slate-200">
      <el-button @click="createVehicle(carrierName)" type="success" size="large">Save</el-button>
    </div>
  </div>
</template>

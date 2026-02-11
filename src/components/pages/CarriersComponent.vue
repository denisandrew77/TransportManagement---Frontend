<script setup lang="ts">
import { useCarrierStore } from '@/stores/carrier';
import { useCarriers } from '@/stores/carriers';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const carriers = useCarriers();
const theCarrier = useCarrierStore();
const router = useRouter();
const dialogVisibility = ref(false);
const currentCarrier = ref("");
onMounted(async ()=>{
  await carriers.getCarriers()
})
const deleteCarrier = async ()=>{
  carriers.carrierList.forEach(async (carrier)=>{
    if(carrier.commercialName===currentCarrier.value){
      await carriers.deleteCarrier(carrier.commercialName);
      carriers.carrierList.splice(carriers.carrierList.indexOf(carrier),1);
    }
  })
  dialogVisibility.value=false;
}

const setCurrentCarrier = (carrier: string)=>{
  dialogVisibility.value=true;
  currentCarrier.value=carrier
}

const editCarrier = (carrierName: string)=>{
  carriers.carrierList.forEach((carrier)=>{
    if(carrier.commercialName===carrierName){
      theCarrier.setCarrier(carrier);
    }
  })
  router.push({name: 'NewCarrier', params: {state: 'edit'}});
}
</script>
<template>
  <div class="w-full flex flex-col items-center mt-8 px-4">
    <div class="w-full">
      <div class="flex justify-between items-center mb-6 px-4">
        <h1 class="text-3xl font-bold text-gray-800">Carriers</h1>
        <el-button type="primary" size="large" @click="router.push('/newCarrier')">
          <i class="bi bi-plus-lg mr-2"></i>Add Carrier
        </el-button>
      </div>
      <el-table
        :data="carriers.carrierList"
        border
        stripe
        class="w-full shadow-lg"
        :header-cell-style="{ background: '#1e40af', color: '#fff', fontWeight: 'bold' }"
      >
        <el-table-column prop="fiscalCode" label="NIF" min-width="140" fixed/>
        <el-table-column prop="commercialName" label="Commercial Name" min-width="200" fixed/>
        <el-table-column prop="fiscalName" label="Fiscal Name" min-width="200"/>
        <el-table-column prop="country" label="Country" min-width="120"/>
        <el-table-column prop="city" label="City" min-width="150"/>
        <el-table-column prop="postalCode" label="Postal Code" min-width="130"/>
        <el-table-column prop="currency" label="Currency" min-width="100"/>
        <el-table-column label="Actions" width="180" fixed="right" align="center">
          <template #default="scope">
            <el-button type="primary" size="small" @click="editCarrier(scope.row.commercialName)">
              <div class="flex flex-row gap-1">
                <i class="bi bi-pencil"></i>
                <div>Edit</div>
              </div>
            </el-button>
            <el-button type="danger" size="small" @click="setCurrentCarrier(scope.row.commercialName)">
              <div class="flex flex-row gap-1">
                <i class="bi bi-trash"></i>
                <div>Delete</div>
              </div>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
  <el-dialog v-model="dialogVisibility" width="500">
  <template #header>
    <div class="flex flex-row items-center gap-3">
      <i class="bi bi-exclamation-triangle-fill text-red-600 text-2xl"></i>
      <span class="text-xl font-bold">Delete Carrier</span>
    </div>
  </template>
  <div class="flex flex-col items-center gap-4">
    <p class="text-gray-700">Are you sure you want to delete {{currentCarrier}}?</p>
    <div class="flex flex-row gap-4">
      <el-button @click="dialogVisibility = false" type="primary">Cancel</el-button>
      <el-button @click="async ()=>await deleteCarrier()" type="danger">Delete</el-button>
    </div>
  </div>
  </el-dialog>
</template>

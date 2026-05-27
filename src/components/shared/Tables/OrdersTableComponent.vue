<script setup lang="ts">
import type { orderTableColumn } from '@/models/UI-related/ordersTableColumns';
import StatusChangeDialog from '../Dialogs/StatusChangeDialog.vue';
import { ref } from 'vue';

defineProps<{
  tableData: orderTableColumn[]
}>()

const emit = defineEmits<{
  (e:"plateValueChange", value: string, allEmpty: boolean): void
  (e:"carrierValueChange", value: string, allEmpty: boolean): void
  (e:"clientNumberValueChange", value: string, allEmpty: boolean): void
  (e:"clientValueChange", value: string, allEmpty: boolean): void
  (e:"loadingCountryValueChange", value: string, allEmpty: boolean): void
  (e:"loadingPostalCodeValueChange", value: string, allEmpty: boolean): void
  (e:"loadingCityValueChange", value: string, allEmpty: boolean): void
  (e:"deliveryCountryValueChange", value: string, allEmpty: boolean): void
  (e:"deliveryPostalCodeValueChange", value: string, allEmpty: boolean): void
  (e:"deliveryCityValueChange", value: string, allEmpty: boolean): void
  (e:"statusValueChange", value: string, allEmpty: boolean): void
  (e:"statusUpdate", value: void): void
}>();

const searchValues = ref({
  plate: "",
  carrier:"",
  clientNumber: "",
  client: "",
  loading: {
    country: "",
    postalCode: "",
    city: "",
  },
  delivery: {
    country: "",
    postalCode: "",
    city: "",
  },
  status: ""
});

const dialogVisible = ref(false);
const selectedOrderNumber = ref<number>(0);
const closeAndGetOrders = ()=>{
  dialogVisible.value = false;
  emit("statusUpdate");
}

const areAllFieldsEmpty = (): boolean => {
  return (
    searchValues.value.plate === "" &&
    searchValues.value.carrier === "" &&
    searchValues.value.clientNumber === "" &&
    searchValues.value.client === "" &&
    searchValues.value.loading.country === "" &&
    searchValues.value.loading.postalCode === "" &&
    searchValues.value.loading.city === "" &&
    searchValues.value.delivery.country === "" &&
    searchValues.value.delivery.postalCode === "" &&
    searchValues.value.delivery.city === "" &&
    searchValues.value.status === ""
  );
};
</script>
<template>
  <div class="px-10 pt-4">
    <el-table
      :data="tableData"
      style="width: 100%"
      :header-cell-style="{
        backgroundColor: '#1a237e',
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: '14px'
      }"
      :row-style="{ fontSize: '13px' }"
      stripe
      border
    >
      <el-table-column prop="orderNumber" label="Order Nr" min-width="120" align="center" sortable>
        <template #header>
          <div class="text-lg">Order Nr</div>
        </template>
        <template #default="{row}">
          <div class=" text-lg">
            {{ row.orderNumber }}
          </div>
        </template>
      </el-table-column>

      <el-table-column label="Plate" min-width="150" align="center">
        <template #header>
          <div class="flex flex-col text-lg gap-2.5">
            <div>Plate</div>
              <div class="header-divider"></div>
            <el-input v-model="searchValues.plate" @input="emit('plateValueChange', $event, areAllFieldsEmpty())"/>
          </div>
        </template>
        <template #default="{ row }">
        <div class="plate-cell">
          <template v-for="(item, index) in row.plateNumber" :key="index">
            <div class="plate-item">{{ item }}</div>
            <div
              v-if="index < row.plateNumber.length - 1"
              class="plate-divider"
            ></div>
          </template>
            </div>
      </template>
      </el-table-column>
      <el-table-column label="Carrier" min-width="180" align="center">
        <template #header>
          <div class="flex flex-col text-lg gap-2.5">
            <div>Carrier</div>
            <div class="header-divider"></div>
            <el-input v-model="searchValues.carrier" @input="emit('carrierValueChange', $event, areAllFieldsEmpty())"/>
          </div>
        </template>
        <template #default="{ row }">
          <div class="carrier-cell">
            <template v-for="(item, index) in row.carrier" :key="index">
              <div class="carrier-item">{{ item }}</div>
              <div
                v-if="index < row.carrier.length - 1"
                class="carrier-divider"
              ></div>
            </template>
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="clientNumber" label="Client Number" min-width="150" align="center">
        <template #header>
          <div class="flex flex-col text-lg gap-2.5">
            <div>Client Number</div>
            <div class="header-divider"></div>
            <el-input v-model="searchValues.clientNumber" @input="emit('clientNumberValueChange', $event, areAllFieldsEmpty())"/>
          </div>
        </template>
        <template #default="{row}">
          <div class="text-lg">
            {{ row.clientNumber }}
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="client" label="Client" min-width="200" align="center">
        <template #header>
          <div class="flex flex-col text-lg gap-2.5">
            <div>Client</div>
            <div class="header-divider"></div>
            <el-input v-model="searchValues.client" @input="emit('clientValueChange', $event, areAllFieldsEmpty())"/>
          </div>
        </template>
        <template #default="{row}">
          <div class="text-lg">
            {{ row.client }}
          </div>
        </template>
      </el-table-column>

      <el-table-column label="Loading" min-width="300" align="center">
        <template #header>
          <div class="flex flex-col text-lg gap-2.5">
            <div>Loading</div>
            <div class="header-divider"></div>
            <div class="flex flex-row gap-2">
              <el-input v-model="searchValues.loading.country" @input="emit('loadingCountryValueChange', $event, areAllFieldsEmpty())"/>
              <el-input v-model="searchValues.loading.postalCode" @input="emit('loadingPostalCodeValueChange', $event, areAllFieldsEmpty())"/>
              <el-input v-model="searchValues.loading.city" @input="emit('loadingCityValueChange', $event, areAllFieldsEmpty())"/>
            </div>
          </div>
        </template>
        <template #default="{ row }">
          <div class="flex flex-row gap-4 items-center justify-around ">
            <span :class="`fi fi-${row.loading[0].split(' - ')[0].toLowerCase()}  rounded-full text-3xl`"></span>
            <div class="array-cell">
              <div v-for="(item, index) in row.loading" :key="index" class="text-lg">
                {{ item }}
                <div v-if="index < row.loading.length - 1" class="divider"></div>
              </div>
            </div>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="Delivery" min-width="300" align="center">
        <template #header>
          <div class="flex flex-col text-lg gap-2.5">
            <div>Delivery</div>
            <div class="header-divider"></div>
            <div class="flex flex-row gap-2">
              <el-input v-model="searchValues.delivery.country" @input="emit('deliveryCountryValueChange', $event, areAllFieldsEmpty())"/>
              <el-input v-model="searchValues.delivery.postalCode" @input="emit('deliveryPostalCodeValueChange', $event, areAllFieldsEmpty())"/>
              <el-input v-model="searchValues.delivery.city" @input="emit('deliveryCityValueChange', $event, areAllFieldsEmpty())"/>
            </div>
          </div>
        </template>
        <template #default="{ row }">
          <div class="flex flex-row gap-4 items-center justify-around">
            <span :class="`fi fi-${row.delivery[0].split(' - ')[0].toLowerCase()} rounded-full text-3xl`"></span>
            <div class="array-cell">
              <div v-for="(item, index) in row.delivery" :key="index" class="text-lg">
                {{ item }}
                <div v-if="index < row.delivery.length - 1" class="divider"></div>
              </div>
            </div>
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="status" label="Status" min-width="120" align="center">
        <template #header>
          <div class="flex flex-col text-lg gap-2.5">
            <div>Status</div>
            <div class="header-divider"></div>
            <el-input v-model="searchValues.status" @input="emit('statusValueChange', $event, areAllFieldsEmpty())"/>
          </div>
        </template>
        <template #default="{row}">
          <button @click="dialogVisible = true; selectedOrderNumber=row.orderNumber" class="w-full h-20">
            <div class="text-lg">
              {{ row?.status?.currentStatus }}
            </div>
          </button>
        </template>
      </el-table-column>

      <el-table-column prop="info" label="Info" min-width="150" align="center">
        <template #header>
          <div class="text-lg">Info</div>
        </template>
        <template #default="{ row }">
          <div class="info-cell">
            <template v-for="(item, index) in row.info" :key="index">
              <div class="info-item">{{ item }}</div>
              <div v-if="index < row.info.length - 1" class="info-divider"></div>
            </template>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <StatusChangeDialog :dialogVisibility="dialogVisible" @closed="closeAndGetOrders" :orderNumber="selectedOrderNumber"/>
  </div>
</template>

<style scoped>
:deep(.el-table) {
  border-radius: 8px;
  overflow: hidden;
}

:deep(.el-table__row:hover) {
  background-color: #f5f7fa;
}

:deep(.el-table__body tr.el-table__row--striped) {
  background-color: #fafafa;
}

:deep(.el-table td) {
  border-color: #aaa6a6 !important;

}

.array-cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 8px 0;
}

.divider {
  width: 80%;
  height: 1px;
  background-color: #000000;
  margin: 4px 0;
}
.header-divider {
  width: 100%;
  height: 1px;
  background: rgba(255, 255, 255, 0.4);
}

:deep(.el-table__body td:nth-child(2)) {
  background-color: #fde68a !important; /* Amber-200 */
}
.plate-cell {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  padding: 8px 0;
  margin: 4px 0;
  gap: 0;
}

.plate-item {
  text-align: center;
  font-size: 1.125rem; /* text-lg */
  padding: 4px 0;
}

.plate-divider {
  width: 100%;
  height: 2px;
  background-color: #000; /* or your preferred color */
  margin: 0;
}

.carrier-cell {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  padding: 8px 0;
  margin: 4px 0;
  gap: 0;
}

.carrier-item {
  text-align: center;
  font-size: 1.125rem; /* text-lg */
  padding: 4px 0;
}

.carrier-divider {
  width: 100%;
  height: 2px;
  background-color: #000; /* or your preferred color */
  margin: 0;
}
:deep(.el-table__body td:nth-child(2)) {
  background-color: #fde68a !important; /* Amber-200 */
}
.info-cell {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  padding: 8px 0;
  margin: 4px 0;
  gap: 0;
}

.info-item {
  text-align: center;
  font-size: 1.125rem;
  padding: 4px 0;
}

.info-divider {
  width: 100%;
  height: 2px;
  background-color: #000;
  margin: 0;
}
</style>

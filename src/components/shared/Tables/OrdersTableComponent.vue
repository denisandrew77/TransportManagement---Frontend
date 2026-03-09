<script setup lang="ts">
import type { orderTableColumn } from '@/models/UI-related/ordersTableColumns';
import { ref } from 'vue';

defineProps<{
  tableData: orderTableColumn[]
}>()

const emit = defineEmits<{
  (e:"plateValueChange", value: string): void
  (e:"carrierValueChange", value: string): void
  (e:"clientNumberValueChange", value: string): void
  (e:"clientValueChange", value: string): void
  (e:"loadingCountryValueChange", value: string): void
  (e:"loadingPostalCodeValueChange", value: string): void
  (e:"loadingCityValueChange", value: string): void
  (e:"deliveryCountryValueChange", value: string): void
  (e:"deliveryPostalCodeValueChange", value: string): void
  (e:"deliveryCityValueChange", value: string): void
  (e:"statusValueChange", value: string): void
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
})
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
            <el-input v-model="searchValues.plate" @input="emit('plateValueChange',searchValues.plate)"/>
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
            <el-input v-model="searchValues.carrier" @input="emit('carrierValueChange',searchValues.carrier)"/>
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
            <el-input v-model="searchValues.clientNumber" @input="emit('clientNumberValueChange',searchValues.clientNumber)"/>
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
            <el-input v-model="searchValues.client" @input="emit('clientValueChange',searchValues.client)"/>
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
              <el-input v-model="searchValues.loading.country" @input="emit('loadingCountryValueChange',searchValues.loading.country)"/>
              <el-input v-model="searchValues.loading.postalCode" @input="emit('loadingPostalCodeValueChange',searchValues.loading.postalCode)"/>
              <el-input v-model="searchValues.loading.city" @input="emit('loadingCityValueChange',searchValues.loading.city)"/>
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
              <el-input v-model="searchValues.delivery.country" @input="emit('deliveryCountryValueChange',searchValues.delivery.country)"/>
              <el-input v-model="searchValues.delivery.postalCode" @input="emit('deliveryPostalCodeValueChange',searchValues.delivery.postalCode)"/>
              <el-input v-model="searchValues.delivery.city" @input="emit('deliveryCityValueChange',searchValues.delivery.city)"/>
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
            <el-input v-model="searchValues.status" @input="emit('statusValueChange',searchValues.status)"/>
          </div>
        </template>
        <template #default="{row}">
          <div class="text-lg">
            {{ row.status }}
          </div>
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

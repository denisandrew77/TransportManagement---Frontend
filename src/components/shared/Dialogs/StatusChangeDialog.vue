<script setup lang="ts">
import { useOrder } from '@/stores/order';
import { useOrders } from '@/stores/orders';
import { nextTick, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const orderObject = useOrder();
const orders = useOrders();
const router = useRouter();
const props = defineProps<{
  dialogVisibility: boolean
  orderNumber: number
}>();
const emit = defineEmits<{
  (e: 'update:model-value', value: boolean): void;
  (e: 'closed'): void;
}>();

type StatusKey = 'onRouteForLoad' | 'waitingForLoad' | 'onRouteForDelivery' | 'waitingForDelivery' | 'delivered';

type StatusEntry = {
  name: string;
  color: string;
  checked: boolean;
  timestamp: string;
  date: Date | null;
};

const statusOrder: StatusKey[] = [
  'onRouteForLoad',
  'waitingForLoad',
  'onRouteForDelivery',
  'waitingForDelivery',
  'delivered',
];

const statuses = ref<Record<StatusKey, StatusEntry>>({
  onRouteForLoad:     { name: 'On Route for Load',     color: '#e8e4b0', checked: false, timestamp: '', date: null },
  waitingForLoad:     { name: 'Waiting for Load',      color: '#e8e4b0', checked: false, timestamp: '', date: null },
  onRouteForDelivery: { name: 'On Route for Delivery', color: '#e8e4b0', checked: false, timestamp: '', date: null },
  waitingForDelivery: { name: 'Waiting for Delivery',  color: '#e8e4b0', checked: false, timestamp: '', date: null },
  delivered:          { name: 'Delivered',             color: '#f97316', checked: false, timestamp: '', date: null },
});

const cmrChecked = ref(false);
const cmrFile = ref<File | null>(null);

const formatDate = (date: Date): string => {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

watch(() => props.dialogVisibility, async (newVal) => {

  if (!newVal) return;
  await nextTick();

  const order = orders.orders.find(o => o.orderNumber === props.orderNumber);
  if (!order) return;

  const { onRouteForLoad, waitingForLoad, onRouteForDelivery, waitingForDelivery, delivered } = order.status;

  const mapping: [StatusKey, string][] = [
    ['onRouteForLoad',     onRouteForLoad],
    ['waitingForLoad',     waitingForLoad],
    ['onRouteForDelivery', onRouteForDelivery],
    ['waitingForDelivery', waitingForDelivery],
    ['delivered',          delivered],
  ];

  mapping.forEach(([key, dateStr]) => {
    const parsed = dateStr ? new Date(dateStr) : null;
    statuses.value[key].checked = !!parsed;
    statuses.value[key].date = parsed;
    statuses.value[key].timestamp = parsed ? formatDate(parsed) : '';
  });

  cmrChecked.value = !!order.status.cmr;
  cmrFile.value = null;
});

const isDisabled = (key: StatusKey): boolean => {
  const index = statusOrder.indexOf(key);
  if (index === 0) return false;
  const prevKey = statusOrder[index - 1];
  return !(statuses.value[prevKey as StatusKey]?.checked ?? false);
};

const isCmrDisabled = (): boolean => {
  return !statuses.value.delivered.checked;
};

const onStatusChange = (key: StatusKey) => {
  const entry = statuses.value[key];
  const index = statusOrder.indexOf(key);
  if (entry.checked) {
    entry.date = new Date();
    entry.timestamp = formatDate(entry.date);
  } else {
    for (let i = index; i < statusOrder.length; i++) {
      const k = statusOrder[i] as StatusKey;
      statuses.value[k].checked = false;
      statuses.value[k].timestamp = '';
      statuses.value[k].date = null;
    }
    cmrChecked.value = false;
    cmrFile.value = null;
  }
  console.log(entry.date);
};

const onCmrChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  cmrFile.value = input.files?.[0] ?? null;
};

const buildStatusUpdate = () => {
  const lastChecked = [...statusOrder].reverse().find(key => statuses.value[key].checked);
  const currentStatus = cmrChecked.value ? 'CMR' : (lastChecked ? statuses.value[lastChecked].name : 'N/A');
  return {
    currentStatus,
    onRouteForLoad:     statuses.value.onRouteForLoad.date?.toISOString()     ?? null,
    waitingForLoad:     statuses.value.waitingForLoad.date?.toISOString()     ?? null,
    onRouteForDelivery: statuses.value.onRouteForDelivery.date?.toISOString() ?? null,
    waitingForDelivery: statuses.value.waitingForDelivery.date?.toISOString() ?? null,
    delivered:          statuses.value.delivered.date?.toISOString()          ?? null,
    cmr:                cmrChecked.value,
  };
};

const isSaving = ref(false);

const onDialogClosed = () => {
  if (isSaving.value) {
    isSaving.value = false;
  } else {
    emit('closed');
  }
};

const saveAndClose = async () => {
  isSaving.value = true;
  await orders.updateOrderStatus(props.orderNumber, buildStatusUpdate());
  await orders.getOrders();
  emit('closed');
};

const editOrder = async()=>{
  const order = await orders.getOrderByOrderNumber(props.orderNumber);
  if(order){
    orderObject.fillOrderDetails(order);
  }
  emit('closed');
  router.push({name: 'NewOrder', params: {state: 'edit'}});
}
</script>

<template>
  <el-dialog
    :model-value="dialogVisibility"
    @update:model-value="emit('update:model-value', $event as boolean)"
    @closed="onDialogClosed"
    width="500px"
    centered
  >
    <template #header>
      <div class="flex items-center gap-3 px-1 py-1">
        <div class="flex items-center justify-center w-10 h-10 rounded-xl bg-orange-500 shadow-md">
          <i class="bi bi-box-fill text-white text-xl"></i>
        </div>
        <div class="flex flex-col">
          <span class="text-lg font-bold text-gray-800 leading-tight">Change Status</span>
          <span class="text-xs text-gray-400 font-normal">Update the current order status</span>
        </div>
      </div>
    </template>
    <div class="flex flex-row font-bold text-sm bg-[#dce8f5] mb-1">
      <div class="w-2"></div>
      <div class="flex-1 py-2 px-4">Status</div>
      <div class="w-52 py-2 px-4 border-l border-gray-300">Time</div>
    </div>
    <div
      v-for="(entry, key) in statuses"
      :key="key"
      class="flex flex-row items-center border-b border-gray-200"
    >
      <div class="w-2 self-stretch" :style="{ backgroundColor: entry.color }"></div>
      <div class="flex flex-row items-center flex-1 py-3 px-4 gap-3">
        <el-checkbox v-model="entry.checked" :disabled="isDisabled(key as StatusKey)" @change="onStatusChange(key as StatusKey)" />
        <span class="font-semibold text-sm">{{ entry.name }}</span>
      </div>
      <div class="w-52 py-3 px-4 border-l border-gray-200">
        <div class="bg-gray-100 rounded px-2 py-1 text-sm text-gray-700 min-h-[28px]">
          {{ entry.timestamp }}
        </div>
      </div>
    </div>
    <div class="flex flex-row items-center border-b border-gray-200">
      <div class="w-2 self-stretch" style="background-color: #f97316"></div>
      <div class="flex flex-row items-center flex-1 py-3 px-4 gap-3">
        <el-checkbox v-model="cmrChecked" :disabled="isCmrDisabled()" />
        <span class="font-semibold text-sm">CMR</span>
      </div>
      <div class="w-52 py-3 px-4 border-l border-gray-200">
        <input type="file" class="text-sm" @change="onCmrChange" />
      </div>
    </div>
    <template #footer>
      <div class="flex flex-row-reverse gap-3 items-center">
        <el-button type="primary" @click="saveAndClose()" size="large">Save</el-button>
        <el-button type="success" @click="editOrder()" size="large">Edit Order</el-button>
      </div>
    </template>
  </el-dialog>
</template>

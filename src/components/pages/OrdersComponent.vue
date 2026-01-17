<script setup lang="ts">
import OrdersTableComponent from '../shared/OrdersTableComponent.vue';
import ButtonComponent from '../shared/Buttons/ButtonComponent.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const navigate = ()=>{
  router.push("/newOrder");
}
</script>
<template>
  <div class="w-full h-screen bg-gray-200">
    <ButtonComponent :name="'Add Order'" @clicked="navigate"/>
    <OrdersTableComponent/>
  </div>
</template>

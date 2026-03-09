<script setup lang="ts">
import { useRouter } from 'vue-router';
import HeaderLinkComponent from './HeaderLinkComponent.vue';
import sigla_denicar from "@/assets/sigla_denicar.jpg";
const header: { name: string; route: string; }[] = [{name: "Orders", route: "/dashboard"}, {name: "Clients", route: "/clients"}, {name: "Carriers", route:"/carriers"}, {name:"Invoices", route: "/invoices"}, {name: "Settings", route: "/settings"}];
const router = useRouter();
</script>
<template>
  <div class="w-full bg-blue-950 flex flex-row items-center gap-9 px-6" style="height: 54px;">
    <div class="logo-bg flex items-center justify-center rounded-lg" style="width: 150px; height: 40px;">
      <img :src="sigla_denicar" alt="Denicar Logo" class="h-8 object-contain logo-img"/>
    </div>
    <div v-for="link in header" :key="link.name">
      <HeaderLinkComponent :name="link.name" @clicked="router.push(link.route)"/>
    </div>
  </div>
</template>

<style scoped>
.logo-bg {
  background: linear-gradient(90deg, #fff 100%, #e0e0e0 100%);
  box-shadow: 0 2px 8px 0 rgba(0,0,0,0.18);
}
.logo-img {
  filter: drop-shadow(0 0 6px #fff);
  border-radius: 6px;
  background: transparent;
}
</style>

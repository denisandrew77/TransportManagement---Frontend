<script setup lang="ts">
import { useRouter } from 'vue-router';
import HeaderLinkComponent from './HeaderLinkComponent.vue';
import byExpressWhite from "@/assets/byexpressWhite.png";
const header: { name: string; route: string; }[] = [{name: "Orders", route: "/dashboard"}, {name: "Clients", route: "/clients"}, {name: "Carriers", route:"/carriers"}, {name:"Invoices", route: "/invoices"}, {name: "Settings", route: "/settings"}];
const router = useRouter();
</script>
<template>
    <div class="w-full bg-blue-950 flex flex-row items-center gap-9">
      <img :src="byExpressWhite" alt="" class="w-36 h-8">
      <div v-for="link in header" :key="link.name">
        <HeaderLinkComponent :name="link.name" @clicked="router.push(link.route)"/>
      </div>
    </div>
</template>

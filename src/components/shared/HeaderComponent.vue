<script setup lang="ts">
import HeaderLinkComponent from './HeaderLinkComponent.vue';
import byExpressWhite from "@/assets/byexpressWhite.png";
import { ref } from 'vue';
const header: string[] = ref(["Orders", "Clients", "Invoices", "Settings"]);
</script>
<template>
    <div class="w-full bg-blue-900 flex flex-row">
      <img :src="byExpressWhite" alt="">
      <div v-for="link in header">
        <HeaderLinkComponent :name="link"/>
      </div>
    </div>
</template>

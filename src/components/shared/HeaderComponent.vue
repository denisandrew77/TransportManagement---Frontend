<script setup lang="ts">
import HeaderLinkComponent from './HeaderLinkComponent.vue';
import byExpressWhite from "@/assets/byexpressWhite.png";
import { ref, type Ref } from 'vue';
const header: Ref<string[],string[]> = ref(["Orders", "Clients", "Invoices", "Settings"]);
</script>
<template>
    <div class="w-full bg-blue-950 flex flex-row items-center gap-9">
      <img :src="byExpressWhite" alt="" class="w-36 h-8">
      <div v-for="link in header">
        <HeaderLinkComponent :name="link"/>
      </div>
    </div>
</template>

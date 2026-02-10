<script setup lang="ts">
import { ref, type Ref } from 'vue';
const indexList: Ref<string[], string[]> = ref(
  ["Name",
  "Address",
  "PC/City",
  "Country/Providence",
  "Contacts",
  "Date/Time"]);
</script>
<template>
  <div class="flex flex-col gap-4 mt-1 ml-5">
    <div v-for="element in indexList">{{ element }}</div>
  </div>
</template>

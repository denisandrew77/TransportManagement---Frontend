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
  <div class="flex flex-col gap-4 pt-1">
    <div v-for="element in indexList">{{ element }}</div>
  </div>
</template>

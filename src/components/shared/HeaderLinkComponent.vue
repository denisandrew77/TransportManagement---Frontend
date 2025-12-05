<script setup lang="ts">
const props = defineProps({
  name: String
});
</script>
<template>
  <div class="text-xl text-white font-bold py-4 px-3">{{ props.name }}</div>
</template>

<script setup lang="ts">
const props = defineProps({
  name: String,
});
</script>
<template>
  <div class="text-red-500 text-sm text-center">{{ props.name }}</div>
</template>

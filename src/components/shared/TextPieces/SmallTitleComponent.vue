<script setup lang="ts">
const props = defineProps({
  text: String
});
</script>
<template>
  <div class="text-blue-500 font-semibold text-md">
    {{ props.text }}
  </div>
</template>

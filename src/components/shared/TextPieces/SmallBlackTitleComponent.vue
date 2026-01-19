<script setup lang="ts">
const props = defineProps({
  text: String
});
</script>
<template>
  <div class="text-black font-semibold text-md">
    {{ props.text }}
  </div>
</template>

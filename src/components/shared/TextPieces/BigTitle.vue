<script setup lang="ts">
defineProps<{
  text: string
}>()
</script>
<template>
  <span class="font-extrabold text-3xl text-blue-800 p-3">{{text}}</span>
</template>

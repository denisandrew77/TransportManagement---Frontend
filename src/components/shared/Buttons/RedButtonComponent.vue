<script setup lang="ts">
const props = defineProps({
  name: String,
  color: String,
});
const emit = defineEmits<{
  (e: "clicked"): void
}>();

const sendClicked = () => {
  emit('clicked');
}
</script>
<template>
  <button
    class="px-2 py-2 bg-red-500 hover:bg-red-600
        active:bg-red-600 rounded-md text-white"
    @click="sendClicked">
        {{ props.name }}
  </button>
</template>

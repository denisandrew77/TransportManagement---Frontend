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
    class="px-2 py-2 bg-green-500 hover:bg-green-600
        active:bg-green-600 rounded-md text-white"
    @click="sendClicked">
        {{ props.name }}
  </button>
</template>

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
    class="px-2 py-2 bg-gray-50 hover:bg-gray-100
        active:bg-gray-500 rounded-md text-gray-900"
    @click="sendClicked">
        {{ props.name }}
  </button>
</template>

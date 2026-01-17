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
    class="px-4 py-2 bg-[#409EFF] hover:bg-[#66b1ff]
        active:bg-blue-500 rounded-md text-white font-bold"
    @click="sendClicked">
        {{ props.name }}
  </button>
</template>

<script setup lang="ts">
const props = defineProps({
  name: String
});

const emit = defineEmits<{
  (e: "clicked"): void
}>();

const sendClicked = () => {
  emit('clicked');
}
</script>
<template>
  <div class="text-xl text-white font-semibold py-4 px-3 active:text-orange-500 cursor-pointer" @click="sendClicked">{{ props.name }}</div>
</template>

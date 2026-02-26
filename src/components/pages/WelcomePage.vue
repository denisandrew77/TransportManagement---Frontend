<script setup lang="ts">
import vansLine from "@/assets/vansLine.jpg";
import { useUserStore } from "@/stores/user";
import gsap from "gsap";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
const user = useUserStore();

onMounted(()=>{
  gsap.from(".min-h-screen",{
    opacity: 0,
    y: 50,
    duration: 2,
  })
  gsap.from(".font-bold",{
    opacity: 0,
    y: 60,
    duration: 4,
  })
})

const router = useRouter();
</script>
<template>
  <div :style="{ backgroundImage: `url(${vansLine})` }" class="min-h-screen w-full bg-center bg-cover flex items-center" @click="router.push('/dashboard')">
    <div class="font-bold text-9xl text-white ml-20">
      <div>Welcome</div>
      <div>{{ user.userName }}</div>
    </div>
  </div>
</template>

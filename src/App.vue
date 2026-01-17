<script setup lang="ts">
import { onMounted } from 'vue';
import HeaderComponent from './components/shared/HeaderComponent.vue';
import { useUserStore } from './stores/user';
import { useRouter } from 'vue-router';
const user = useUserStore();
const router = useRouter();

onMounted(()=>{
  if(!user.loggedIn){
    router.push("/");
  } else {
    router.push("/dashboard");
  }
})
</script>

<template>
  <HeaderComponent v-if="user.loggedIn"/>
  <router-view/>
</template>

<style scoped>

</style>

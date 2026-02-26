<script setup lang="ts">
import truck from '@/assets/truck.jpg'
import sigla_denicar from "@/assets/sigla_denicar.jpg";
import InputComponent from '../shared/Inputs/InputComponent.vue'
import ButtonComponent from '../shared/Buttons/ButtonComponent.vue'
import ErrorMessageComponent from '../shared/ErrorMessageComponent.vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const user = useUserStore()
const router = useRouter()
const emptyUserOrPass = ref(false)
const wrongCredentials = ref(false)

const signIn = async () => {
  if (user.userName === '' || user.password === '') {
    emptyUserOrPass.value = true
  }
  await user.authenticate()
  console.log(user.loggedIn)
  if (user.loggedIn) {
    router.push('WelcomePage')
  } else if ((user.userName === '' || user.password === '') && user.loggedIn === false) {
    emptyUserOrPass.value = true
  } else if (user.loggedIn === false) {
    wrongCredentials.value = true
  }
}
</script>

<template>
  <div :style="{ backgroundImage: `url(${truck})` }"
    class="min-h-screen w-full bg-center bg-cover flex justify-center items-center">
    <div class="flex flex-col items-center justify-center gap-5 bg-white w-2xs rounded-2xl p-7">
      <img :src="sigla_denicar" alt="" class="w-55" />
      <InputComponent placeHolder="Username" v-model="user.userName" />
      <InputComponent placeHolder="Password" v-model="user.password" @keyup.enter="signIn" :passwordBox="true"/>
      <ErrorMessageComponent :name="'Please enter username and password'" v-if="emptyUserOrPass" />
      <ErrorMessageComponent :name="'Wrong credentials'" v-if="wrongCredentials" />
      <ButtonComponent :name="'Sign in'" @clicked="signIn" />
    </div>
  </div>
</template>

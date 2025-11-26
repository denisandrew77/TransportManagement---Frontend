<script setup lang="ts">
import truck from "@/assets/truck.jpg";
import byExpressLogo from "@/assets/byExpressLogo.png";
import InputComponent from "../shared/InputComponent.vue";
import ButtonComponent from "../shared/ButtonComponent.vue";
import { useUserStore } from "@/stores/user";

const user = useUserStore();

//username and password setters
const setUserName = (value: string) => {
  user.userName = value;
}
const setPassword = (value: string) => {
  user.password = value;
  console.log(user.password)
}

const signIn = async () => {
  console.log("yes")
  await user.authenticate();
}

</script>

<template>
  <div
    :style="{backgroundImage: `url(${truck})`}"
    class="min-h-screen w-full bg-center bg-cover flex justify-center items-center">
    <div class="flex flex-col items-center justify-center gap-5 bg-white w-2xs  rounded-2xl p-7">
      <img :src="byExpressLogo" alt="" class="w-55">
      <InputComponent placeHolder="Username" @sendValue="setUserName"/>
      <InputComponent placeHolder="Password" @sendValue="setPassword"/>
      <ButtonComponent :name="'Sign in'" @clicked="signIn"/>
    </div>
  </div>
</template>

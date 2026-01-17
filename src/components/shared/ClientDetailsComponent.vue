<script setup lang="ts">
import InputComponent from './Inputs/InputComponent.vue'
import WhiteButtonComponent from './Buttons/WhiteButtonComponent.vue'
import RedButtonComponent from './Buttons/RedButtonComponent.vue'
import GreenButtonComponent from './Buttons/GreenButtonComponent.vue'
import LoadingDetailsComponent from './Client/LoadingDetailsComponent.vue'
import IndexListComponent from './Client/IndexListComponent.vue'
import GoodsComponent from './GoodsComponent.vue'
import MediumTitle from './TextPieces/MediumTitle.vue'
import TextAreaComponent from './Inputs/TextAreaComponent.vue'
import SmallTitleComponent from './TextPieces/SmallTitleComponent.vue'

</script>
<template>
  <div class="m-4">
    <div class="bg-blue-300 p-2 flex flex-row justify-between">
      <div class="flex flex-row gap-6">
        <div class="text-xs pt-2">Order-No</div>
        <div class="flex flex-row items-center gap-2 text-xl font-bold">
          <div>Client Ref</div>
          <div>
            <InputComponent />
          </div>
        </div>
        <div class="flex flex-row items-center gap-2 text-xl font-bold">
          <div>Client Ref</div>
          <div>
            <InputComponent />
          </div>
        </div>
      </div>
      <div class="flex flex-row gap-5">
        <div class="flex flex-row gap-3">
          <WhiteButtonComponent :name="'Duplicate'" />
          <WhiteButtonComponent :name="'Show Map'" />
          <WhiteButtonComponent :name="'Order to client'" />
        </div>
        <div class="">
          <RedButtonComponent :name="'Delete'" class="mr-4" />
          <GreenButtonComponent :name="'Save and edit this item'" />
        </div>
      </div>
    </div>
    <div class="bg-gray-200 p-2 flex flex-col">
      <div class="flex flex-row justify-between w-160">
        <div></div>
        <MediumTitle :text="'Sender'" />
        <MediumTitle :text="'Receiver'" />
      </div>
      <div class="flex flex-row gap-3">
        <IndexListComponent />
        <LoadingDetailsComponent />
        <LoadingDetailsComponent />
        <GoodsComponent />
        <div class="flex flex-col">
          <SmallTitleComponent :text="'Observations'" />
          <TextAreaComponent />
        </div>
      </div>
    </div>
  </div>
</template>

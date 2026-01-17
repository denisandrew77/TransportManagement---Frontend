<script setup lang="ts">
import SizedInputComponent from '../Inputs/SizedInputComponent.vue';
import DateInputComponent from '../Inputs/DateInputComponent.vue';
import TimeInputComponent from '../Inputs/TimeInputComponent.vue';
</script>
<template>
  <div class="flex flex-col gap-2 w-70">
        <SizedInputComponent/>
        <SizedInputComponent/>
        <div class="flex flex-row gap-2">
          <SizedInputComponent class="w-25"/>
          <SizedInputComponent class="w-43"/>
        </div>
        <div class="flex flex-row gap-2">
          <SizedInputComponent class="w-20"/>
          <div>Refs</div>
          <SizedInputComponent class="w-38"/>
        </div>
        <SizedInputComponent/>
        <div class="flex flex-row gap-2">
          <DateInputComponent class="w-44"/>
          <TimeInputComponent class="w-23"/>
        </div>
      </div>
</template>

<script setup lang="ts">
const tableHeader: string[] = ["Order Nr","Plate", "Carrier", "Client NR", "Client", "Loading", "Delivery", "Status", "Info"];
</script>
<template>
  <table>
    <thead>
      <tr class="bg-blue-950 font-thin! text-sm text-white">
        <th class="p-3" v-for="title in tableHeader">{{title}}</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>H</td>
        <td>H</td>
        <td>H</td>
      </tr>
      <tr>
        <td>H</td>
        <td>H</td>
        <td>H</td>
      </tr>
    </tbody>
  </table>
</template>

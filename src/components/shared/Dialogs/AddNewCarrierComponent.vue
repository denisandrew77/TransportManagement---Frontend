<script setup lang="ts">
import { countries } from 'countries-list'
import cc from 'currency-codes'
import { useCarrierStore } from '@/stores/carrier'

const carrier = useCarrierStore()
const currencyList = cc.data.map((c) => ({ code: c.code, name: c.currency }))
</script>
<template>
  <div class="w-full flex justify-center py-6">
<div class="w-full rounded-2xl p-8 flex flex-col gap-10">

      <!-- Company fields -->
      <div class="grid grid-cols-4 gap-x-6 gap-y-8">
        <div class="flex flex-col gap-1">
          <span class="text-sm text-gray-500">NIF</span>
          <el-input v-model="carrier.fiscalCode" />
        </div>
        <div class="flex flex-col gap-1">
          <span class="text-sm text-gray-500">Fiscal name</span>
          <el-input v-model="carrier.fiscalName" />
        </div>
        <div class="flex flex-col gap-1">
          <span class="text-sm text-gray-500">ORC</span>
          <el-input v-model="carrier.orc" />
        </div>
        <div class="flex flex-col gap-1">
          <span class="text-sm text-gray-500">Commercial name</span>
          <el-input v-model="carrier.commercialName" />
        </div>

        <div class="flex flex-col gap-1">
          <span class="text-sm text-gray-500">Country</span>
          <el-select filterable v-model="carrier.country">
            <el-option v-for="(country, code) in countries" :key="code" :label="country.name" :value="code" />
          </el-select>
        </div>
        <div class="flex flex-col gap-1">
          <span class="text-sm text-gray-500">Currency</span>
          <el-select filterable v-model="carrier.currency">
            <el-option v-for="c in currencyList" :key="c.code" :label="`${c.code} - ${c.name}`" :value="c.code" />
          </el-select>
        </div>
        <div class="flex flex-col gap-1">
          <span class="text-sm text-gray-500">Capital</span>
          <el-input v-model="carrier.capital" />
        </div>
        <div class="flex flex-col gap-1">
          <span class="text-sm text-gray-500">Registered</span>
          <el-date-picker v-model="carrier.registered" type="date" placeholder="Select date" style="width: 100%" />
        </div>

        <div class="flex flex-col gap-1">
          <span class="text-sm text-gray-500">Postal Code</span>
          <el-input v-model="carrier.postalCode" />
        </div>
        <div class="flex flex-col gap-1">
          <span class="text-sm text-gray-500">County</span>
          <el-input v-model="carrier.county" />
        </div>
        <div class="flex flex-col gap-1">
          <span class="text-sm text-gray-500">Address</span>
          <el-input v-model="carrier.address" />
        </div>
        <div class="flex flex-col gap-1">
          <span class="text-sm text-gray-500">City</span>
          <el-input v-model="carrier.city" />
        </div>

        <div class="flex flex-col gap-1">
          <span class="text-sm text-gray-500">Swift</span>
          <el-input v-model="carrier.swift" />
        </div>
        <div class="flex flex-col gap-1">
          <span class="text-sm text-gray-500">Phone</span>
          <el-input v-model="carrier.phoneNumber" />
        </div>
        <div class="flex flex-col gap-1">
          <span class="text-sm text-gray-500">Bank</span>
          <el-input v-model="carrier.bankName" />
        </div>
        <div class="flex flex-col gap-1">
          <span class="text-sm text-gray-500">IBAN</span>
          <el-input v-model="carrier.iban" />
        </div>

        <div class="flex flex-col gap-1">
          <span class="text-sm text-gray-500">VAT %</span>
          <el-input-number v-model="carrier.vatPercentage" :min="0" :max="100" controls-position="right" />
        </div>
      </div>

      <div class="flex justify-end pt-4 border-t border-slate-200">
        <el-button @click="carrier.createCarrier" type="success" size="large">Save</el-button>
      </div>

      <!-- Contact section -->
      <div class="flex flex-col gap-6">
        <h3 class="text-base font-semibold text-slate-600 tracking-wide">Add a new Contact</h3>
        <div class="grid grid-cols-4 gap-x-6 gap-y-8">
          <div class="flex flex-col gap-1">
            <span class="text-sm text-gray-500">Name</span>
            <el-input v-model="carrier.contact.name" />
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-sm text-gray-500">Mobile</span>
            <el-input v-model="carrier.contact.phoneNumber" />
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-sm text-gray-500">Email</span>
            <el-input v-model="carrier.contact.email" />
          </div>
        </div>
        <div class="flex justify-end pt-4 border-t border-slate-200">
          <el-button @click="carrier.createCarrierContact" type="success" size="large">Save</el-button>
        </div>
      </div>

    </div>
  </div>
</template>


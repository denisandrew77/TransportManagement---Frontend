<script setup lang="ts">
import { countries } from 'countries-list';
import cc from 'currency-codes';
import type { carrier } from '@/models/cargo-related/carrier';
import type { carrierTitles } from '@/models/UI-related/carrierTitles';

const currencyList = cc.data.map((c) => ({ code: c.code, name: c.currency }))
const props = defineProps<{
  inputTitleList: carrierTitles
  modelValue: carrier
}>()

const emit = defineEmits<{
  (e: "update:modelValue", value: carrier): void
  (e: "update:model-value", value: carrier): void
  (e: "saveRequest", value: boolean): void
  (e: "validateCodeRequest", value: boolean): void
}>()

const updateField = (field: keyof carrier, value: any) => {
  emit('update:modelValue', { ...props.modelValue, [field]: value })
  emit('update:model-value', { ...props.modelValue, [field]: value })
}

const saveRequest = () => {
  emit('saveRequest', true);
}

const validateCodeRequest = () => {
  emit('validateCodeRequest', true);
}
</script>
<template>
  <div class="w-full flex justify-center py-8">
<div class="w-2/4 bg-slate-50 rounded-2xl shadow-lg p-8 flex flex-col gap-10">

      <div class="grid grid-cols-4 gap-x-6 gap-y-8">
        <div class="flex flex-col gap-1">
          <span class="text-sm text-gray-500">{{ inputTitleList.nif }}</span>
          <el-input :model-value="modelValue.fiscalCode" @update:model-value="updateField('fiscalCode', $event)"/>
        </div>
        <div class="flex flex-col gap-1">
          <span class="text-sm text-gray-500">{{ inputTitleList.fiscalName }}</span>
          <el-input :model-value="modelValue.fiscalName" @update:model-value="updateField('fiscalName', $event)"/>
        </div>
        <div class="flex flex-col gap-1">
          <span class="text-sm text-gray-500">{{ inputTitleList.orc }}</span>
          <el-input :model-value="modelValue.orc" @update:model-value="updateField('orc', $event)"/>
        </div>
        <div class="flex flex-col gap-1">
          <span class="text-sm text-gray-500">{{ inputTitleList.commercialName }}</span>
          <el-input :model-value="modelValue.commercialName" @update:model-value="updateField('commercialName', $event)"/>
        </div>

        <div class="flex flex-col gap-1">
          <span class="text-sm text-gray-500">{{ inputTitleList.country }}</span>
          <el-select filterable :model-value="modelValue.country" @update:model-value="updateField('country', $event)">
            <el-option v-for="(country, code) in countries" :key="code" :label="country.name" :value="code" />
          </el-select>
        </div>
        <div class="flex flex-col gap-1">
          <span class="text-sm text-gray-500">{{ inputTitleList.currency }}</span>
          <el-select filterable :model-value="modelValue.currency" @update:model-value="updateField('currency', $event)">
            <el-option v-for="c in currencyList" :key="c.code" :label="`${c.code} - ${c.name}`" :value="c.code" />
          </el-select>
        </div>
        <div class="flex flex-col gap-1">
          <span class="text-sm text-gray-500">{{ inputTitleList.capital }}</span>
          <el-input :model-value="modelValue.capital" @update:model-value="updateField('capital', $event)"/>
        </div>
        <div class="flex flex-col gap-1">
          <span class="text-sm text-gray-500">{{ inputTitleList.registered }}</span>
          <el-date-picker :model-value="modelValue.registered" @update:model-value="updateField('registered', $event)" type="date" placeholder="Select date" style="width: 100%" />
        </div>

        <div class="flex flex-col gap-1">
          <span class="text-sm text-gray-500">{{ inputTitleList.postalCode }}</span>
          <el-input :model-value="modelValue.postalCode" @update:model-value="updateField('postalCode', $event)"/>
        </div>
        <div class="flex flex-col gap-1">
          <span class="text-sm text-gray-500">{{ inputTitleList.county }}</span>
          <el-input :model-value="modelValue.county" @update:model-value="updateField('county', $event)"/>
        </div>
        <div class="flex flex-col gap-1">
          <span class="text-sm text-gray-500">{{ inputTitleList.address }}</span>
          <el-input :model-value="modelValue.address" @update:model-value="updateField('address', $event)"/>
        </div>
        <div class="flex flex-col gap-1">
          <span class="text-sm text-gray-500">{{ inputTitleList.city }}</span>
          <el-input :model-value="modelValue.city" @update:model-value="updateField('city', $event)"/>
        </div>

        <div class="flex flex-col gap-1">
          <span class="text-sm text-gray-500">{{ inputTitleList.swift }}</span>
          <el-input :model-value="modelValue.swift" @update:model-value="updateField('swift', $event)"/>
        </div>
        <div class="flex flex-col gap-1">
          <span class="text-sm text-gray-500">{{ inputTitleList.phone }}</span>
          <el-input :model-value="modelValue.phoneNumber" @update:model-value="updateField('phoneNumber', $event)"/>
        </div>
        <div class="flex flex-col gap-1">
          <span class="text-sm text-gray-500">{{ inputTitleList.bank }}</span>
          <el-input :model-value="modelValue.bankName" @update:model-value="updateField('bankName', $event)"/>
        </div>
        <div class="flex flex-col gap-1">
          <span class="text-sm text-gray-500">{{ inputTitleList.iban }}</span>
          <el-input :model-value="modelValue.iban" @update:model-value="updateField('iban', $event)"/>
        </div>

        <div class="flex flex-col gap-1">
          <span class="text-sm text-gray-500">{{ inputTitleList.vatPercentage }}</span>
          <el-input-number :model-value="modelValue.vatPercentage" @update:model-value="updateField('vatPercentage', $event)" :min="0" :max="100" controls-position="right"/>
        </div>
      </div>

      <div class="flex justify-end gap-3 pt-4 border-t border-gray-100">
        <el-button @click="validateCodeRequest" type="primary" size="large">Validate VAT code</el-button>
        <el-button @click="saveRequest" type="success" size="large">Save</el-button>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import type { User } from '@/stores/users';

interface Props {
  modelValue: boolean;
  user: User | null;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  user: null
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'confirm'): void;
}>();

const handleConfirm = () => {
  emit('confirm');
  emit('update:modelValue', false);
};

const handleCancel = () => {
  emit('update:modelValue', false);
};
</script>

<template>
  <el-dialog
    :model-value="modelValue"
    @update:model-value="(val) => emit('update:modelValue', val)"
    title="Delete User"
    width="400px"
  >
    <div v-if="user" class="delete-confirmation">
      <div class="warning-icon">
        <i class="bi bi-exclamation-circle text-warning text-3xl"></i>
      </div>
      <p class="confirmation-text">
        Are you sure you want to delete user <strong>{{ user.userName }}</strong>?
      </p>
      <p class="warning-text">This action cannot be undone.</p>
    </div>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleCancel">Cancel</el-button>
        <el-button type="danger" @click="handleConfirm">Delete</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>
.delete-confirmation {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 15px;
  padding: 20px;
}

.warning-icon {
  display: flex;
  justify-content: center;
  width: 100%;
}

.confirmation-text {
  font-size: 16px;
  margin: 0;
  color: #333;
}

.warning-text {
  font-size: 12px;
  color: #ff6b6b;
  margin: 0;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>

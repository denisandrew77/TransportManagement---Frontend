<script setup lang="ts">
import { ref, watch } from 'vue';
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
  (e: 'submit', data: { id: number; userName: string; password: string; adminRole: boolean }): void;
}>();

const form = ref({
  id: 0,
  userName: '',
  password: '',
  adminRole: false
});

const formRef = ref();

const rules = {
  userName: [
    { required: true, message: 'Username is required', trigger: 'blur' },
    { min: 3, message: 'Username must be at least 3 characters', trigger: 'blur' }
  ],
  password: [
    { required: true, message: 'Password is required', trigger: 'blur' },
    { min: 6, message: 'Password must be at least 6 characters', trigger: 'blur' }
  ]
};

const handleSubmit = async () => {
  if (!formRef.value) return;

  await formRef.value.validate((valid: boolean) => {
    if (valid) {
      emit('submit', {
        id: form.value.id,
        userName: form.value.userName,
        password: form.value.password,
        adminRole: form.value.adminRole
      });
      emit('update:modelValue', false);
    }
  });
};

const handleClose = () => {
  emit('update:modelValue', false);
};

watch(() => props.user, (newUser) => {
  if (newUser) {
    form.value = {
      id: newUser.id,
      userName: newUser.userName,
      password: newUser.password,
      adminRole: newUser.adminRole
    };
  }
}, { deep: true });
</script>

<template>
  <el-dialog
    :model-value="modelValue"
    @update:model-value="(val) => emit('update:modelValue', val)"
    title="Edit User"
    width="500px"
    @close="handleClose"
  >
    <el-form ref="formRef" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="Username" prop="userName">
        <el-input v-model="form.userName" placeholder="Enter username" />
      </el-form-item>

      <el-form-item label="Password" prop="password">
        <el-input v-model="form.password" type="password" placeholder="Enter password" show-password />
      </el-form-item>

      <el-form-item label="Admin Role">
        <el-switch v-model="form.adminRole" />
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose">Cancel</el-button>
        <el-button type="primary" @click="handleSubmit">Update User</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>
.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>

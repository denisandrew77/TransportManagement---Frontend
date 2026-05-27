<script setup lang="ts">
import { ref, watch } from 'vue';
import { ElMessage } from 'element-plus';

interface Props {
  modelValue: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'submit', data: { userName: string; password: string; adminRole: boolean }): void;
}>();

const form = ref({
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
        userName: form.value.userName,
        password: form.value.password,
        adminRole: form.value.adminRole
      });
      resetForm();
      emit('update:modelValue', false);
    }
  });
};

const resetForm = () => {
  form.value = {
    userName: '',
    password: '',
    adminRole: false
  };
};

const handleClose = () => {
  resetForm();
  emit('update:modelValue', false);
};

watch(() => props.modelValue, (newVal) => {
  if (!newVal) {
    resetForm();
  }
});
</script>

<template>
  <el-dialog
    :model-value="modelValue"
    @update:model-value="(val) => emit('update:modelValue', val)"
    title="Add New User"
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
        <el-button type="primary" @click="handleSubmit">Add User</el-button>
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

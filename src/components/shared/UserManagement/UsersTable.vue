<script setup lang="ts">
import { computed } from 'vue';
import type { User } from '@/stores/users';

interface Props {
  users: User[];
  loading: boolean;
}

withDefaults(defineProps<Props>(), {
  loading: false
});

defineEmits<{
  (e: 'edit', user: User): void;
  (e: 'delete', user: User): void;
}>();
</script>

<template>
  <div class="users-table">
    <el-table :data="users" v-loading="loading" style="width: 100%" stripe highlight-current-row>
      <el-table-column prop="userName" label="Username" width="250" align="center" />
      <el-table-column prop="adminRole" label="Role" width="120" align="center">
        <template #default="{ row }">
          <el-tag :type="row.adminRole ? 'success' : 'info'" size="large">
            {{ row.adminRole ? 'Admin' : 'User' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Actions" width="220" fixed="right" align="center">
        <template #default="{ row }">
          <el-button type="primary" size="small" @click="$emit('edit', row)">
            <i class="bi bi-pencil mr-2"></i>Edit
          </el-button>
          <el-button type="danger" size="small" @click="$emit('delete', row)">
            <i class="bi bi-trash mr-2"></i>Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped>
.users-table {
  width: 100%;
}

:deep(.el-table) {
  font-size: 14px;
}

:deep(.el-table__header) {
  background-color: #f5f7fa;
  font-weight: 600;
}

:deep(.el-table__body tr:hover > td) {
  background-color: #f0f9ff !important;
}
</style>

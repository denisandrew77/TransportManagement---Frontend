<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useUsers } from '@/stores/users';
import UsersTable from '../shared/UserManagement/UsersTable.vue';
import AddUserDialog from '../shared/UserManagement/AddUserDialog.vue';
import EditUserDialog from '../shared/UserManagement/EditUserDialog.vue';
import DeleteUserDialog from '../shared/UserManagement/DeleteUserDialog.vue';
import { ElMessage } from 'element-plus';
import type { User } from '@/stores/users';

const usersStore = useUsers();

const addUserDialogVisible = ref(false);
const editUserDialogVisible = ref(false);
const deleteUserDialogVisible = ref(false);
const selectedUser = ref<User | null>(null);

onMounted(async () => {
  await usersStore.fetchAllUsers();
});

const handleOpenAddDialog = () => {
  addUserDialogVisible.value = true;
};

const handleAddUser = async (data: { userName: string; password: string; adminRole: boolean }) => {
  const success = await usersStore.addUser(data.userName, data.password, data.adminRole);
  if (success) {
    ElMessage.success('User created successfully');
  } else {
    ElMessage.error('Failed to create user');
  }
};

const handleEditClick = (user: User) => {
  selectedUser.value = user;
  editUserDialogVisible.value = true;
};

const handleEditUser = async (data: { id: number; userName: string; password: string; adminRole: boolean }) => {
  const success = await usersStore.updateUser(data.id, data.userName, data.password, data.adminRole);
  if (success) {
    ElMessage.success('User updated successfully');
  } else {
    ElMessage.error('Failed to update user');
  }
};

const handleDeleteClick = (user: User) => {
  selectedUser.value = user;
  deleteUserDialogVisible.value = true;
};

const handleDeleteUser = async () => {
  if (!selectedUser.value) return;
  const success = await usersStore.deleteUserById(selectedUser.value.id);
  if (success) {
    ElMessage.success('User deleted successfully');
  } else {
    ElMessage.error('Failed to delete user');
  }
};
</script>

<template>
  <div class="settings-page">
    <div class="settings-container">
      <div class="settings-header">
        <div class="header-content">
          <h1>User Management</h1>
          <p class="header-description">Manage users, permissions, and access control</p>
        </div>
        <el-button type="primary" size="large" @click="handleOpenAddDialog" class="add-button">
          <i class="bi bi-plus-lg mr-2"></i>Add New User
        </el-button>
      </div>

      <div class="users-section">
        <div class="section-header">
          <h2>Users List</h2>
          <span class="user-count">{{ usersStore.userList.length }} users</span>
        </div>
        <UsersTable
          :users="usersStore.userList"
          :loading="usersStore.loading"
          @edit="handleEditClick"
          @delete="handleDeleteClick"
        />
      </div>
    </div>

    <!-- Add User Dialog -->
    <AddUserDialog
      v-model="addUserDialogVisible"
      @submit="handleAddUser"
    />

    <!-- Edit User Dialog -->
    <EditUserDialog
      v-model="editUserDialogVisible"
      :user="selectedUser"
      @submit="handleEditUser"
    />

    <!-- Delete User Dialog -->
    <DeleteUserDialog
      v-model="deleteUserDialogVisible"
      :user="selectedUser"
      @confirm="handleDeleteUser"
    />
  </div>
</template>

<style scoped>
.settings-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 30px 20px;
}

.settings-container {
  max-width: 1200px;
  margin: 0 auto;
}

.settings-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 40px;
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.header-content h1 {
  margin: 0;
  font-size: 32px;
  font-weight: 700;
  color: #1f2937;
  letter-spacing: -0.5px;
}

.header-description {
  margin: 8px 0 0 0;
  color: #6b7280;
  font-size: 14px;
}

.add-button {
  padding: 12px 24px;
  font-weight: 600;
}

.users-section {
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 2px solid #f0f1f3;
}

.section-header h2 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;
}

.user-count {
  background: #eef2ff;
  color: #667eea;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
}

:deep(.el-table) {
  box-shadow: none;
}
</style>

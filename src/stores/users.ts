import { defineStore } from 'pinia';
import { ref } from 'vue';
import { api } from '@/services/api';

export interface User {
  id: number;
  userName: string;
  password: string;
  adminRole: boolean;
}

export const useUsers = defineStore('users', () => {
  const userList = ref<User[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchAllUsers = async () => {
    loading.value = true;
    error.value = null;
    try {
      const token = localStorage.getItem('token');
      const response = await api.get('/getAllUsers', {
        headers: {
          'Authorization': token
        }
      });
      userList.value = response.data;
    } catch (err) {
      error.value = 'Failed to fetch users';
      console.error('Error fetching users:', err);
    } finally {
      loading.value = false;
    }
  };

  const addUser = async (userName: string, password: string, adminRole: boolean) => {
    loading.value = true;
    error.value = null;
    try {
      const token = localStorage.getItem('token');
      const response = await api.post(
        '/createUser',
        {
          newUserName: userName,
          password: password,
          adminRole: adminRole
        },
        {
          headers: {
            'Authorization': token
          }
        }
      );
      if (response.data) {
        await fetchAllUsers();
        return true;
      }
      return false;
    } catch (err) {
      error.value = 'Failed to create user';
      console.error('Error creating user:', err);
      return false;
    } finally {
      loading.value = false;
    }
  };

  const updateUser = async (id: number, userName: string, password: string, adminRole: boolean) => {
    loading.value = true;
    error.value = null;
    try {
      const token = localStorage.getItem('token');
      const response = await api.post(
        '/editUser',
        {
          id: id,
          newUsername: userName,
          password: password,
          adminRole: adminRole
        },
        {
          headers: {
            'Authorization': token
          }
        }
      );
      if (response.data) {
        await fetchAllUsers();
        return true;
      }
      return false;
    } catch (err) {
      error.value = 'Failed to update user';
      console.error('Error updating user:', err);
      return false;
    } finally {
      loading.value = false;
    }
  };

  const deleteUserById = async (id: number) => {
    loading.value = true;
    error.value = null;
    try {
      const token = localStorage.getItem('token');
      const response = await api.post(
        '/deleteUser',
        { id: id },
        {
          headers: {
            'Authorization': token
          }
        }
      );
      if (response.data) {
        await fetchAllUsers();
        return true;
      }
      return false;
    } catch (err) {
      error.value = 'Failed to delete user';
      console.error('Error deleting user:', err);
      return false;
    } finally {
      loading.value = false;
    }
  };

  return {
    userList,
    loading,
    error,
    fetchAllUsers,
    addUser,
    updateUser,
    deleteUserById
  };
});

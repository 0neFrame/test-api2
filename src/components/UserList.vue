<script setup>
import { user } from '@/api'
import { computed, ref } from 'vue'
import UserDeleteBtn from './UserDeleteBtn.vue'
import UserUpdateBtn from './UserUpdateBtn.vue'
import UserInfoLink from './UserInfoLink.vue'
import UserCreateBtn from './UserCreateBtn.vue'

const headers = ref([
  { title: 'Редактировать', key: 'edit', sortable: false, width: 50 },
  { title: 'Логин', key: 'login', sortable: false },
  { title: 'Имя', key: 'name', sortable: true },
  { title: 'Статус', key: 'active', sortable: true },
  { title: 'Удалить', key: 'delete', sortable: false, width: 50 },
])
const search = ref('')
const sortBy = ref([{ key: 'name', order: 'asc' }])
const users = ref([])
const usersPerPage = ref(10)
const usersPerPageOptions = ref([
  { value: 10, title: '10' },
  { value: 50, title: '50' },
  { value: 100, title: '100' },
  { value: -1, title: 'Все' },
])
const usersTotal = computed(() => users.value?.length ?? 0)

async function handlerLoadUsers() {
  users.value = await user.getUsers()
}
</script>

<template>
  <v-sheet class="d-flex align-center justify-space-between text-center px-4" height="100">
    <UserCreateBtn @refreshUsers="handlerLoadUsers"></UserCreateBtn>
    <v-btn prepend-icon="mdi-file-upload-outline" @click="handlerLoadUsers">
      список пользователей
    </v-btn>
  </v-sheet>

  <v-card flat>
    <template v-slot:text>
      <v-text-field
        v-model="search"
        label="Поиск"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        hide-details
        single-line
      ></v-text-field>
    </template>

    <v-data-table
      :headers="headers"
      :items="users"
      :items-length="usersTotal"
      :items-per-page="usersPerPage"
      :items-per-page-options="usersPerPageOptions"
      :search="search"
      :sort-by="sortBy"
      items-per-page-text="Пользователей на странице"
      no-data-text="Пользователи отсутствуют"
    >
      <template v-slot:item="{ item }">
        <tr>
          <td class="text-center">
            <UserUpdateBtn :item="item" @refreshUsers="handlerLoadUsers"></UserUpdateBtn>
          </td>

          <td>{{ item.login }}</td>

          <td><UserInfoLink :item="item"></UserInfoLink></td>

          <td>
            <span :class="[item.active ? 'bg-green' : 'bg-red', 'px-2', 'rounded-circle']"></span>
          </td>

          <td class="text-center">
            <UserDeleteBtn :item="item" @refreshUsers="handlerLoadUsers"></UserDeleteBtn>
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-card>
</template>

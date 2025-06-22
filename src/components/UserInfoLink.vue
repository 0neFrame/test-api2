<script setup>
import { ref } from 'vue'
import { user } from '@/api'
import DefaultModal from '@/components/DefaultModal.vue'

const { item } = defineProps({
  item: Object,
})

const userInfo = ref(null)

async function handlerGetUser() {
  userInfo.value = await user.getUserById(item.user_id)
}
</script>

<template>
  <DefaultModal :title="`Пользователь - ${item.name}(${item.login})`">
    <template #activator="activatorProps">
      <span
        v-bind="activatorProps"
        class="text-decoration-underline cursor-pointer"
        @click="handlerGetUser"
      >
        {{ item.name }}
      </span>
    </template>

    <div class="d-flex flex-column">
      <span>Логин - {{ item.login }}</span>
      <span>Имя - {{ item.name }}</span>
      <span>
        Статус -
        <span :class="item.active ? 'text-green' : 'text-red'">
          {{ item.active ? 'активирован' : 'деактивирован' }}
        </span>
      </span>
      <span v-if="userInfo?.created_at">Создан - {{ userInfo?.created_at }}</span>
      <span v-if="userInfo?.updated_at">Изменен - {{ userInfo?.updated_at }}</span>
    </div>
  </DefaultModal>
</template>

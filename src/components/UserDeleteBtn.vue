<script setup>
import { user } from '@/api'
import DefaultModal from '@/components/DefaultModal.vue'

const { item } = defineProps({
  item: Object,
})

const emit = defineEmits(['refreshUsers'])

async function handlerDeleteUser() {
  await user.deleteUserById(item.user_id)
  emit('refreshUsers')
}
</script>

<template>
  <DefaultModal title="Удалить пользователя?" @agree="handlerDeleteUser">
    <template #activator="activatorProps">
      <v-btn v-bind="activatorProps" icon="mdi-delete" variant="text"></v-btn>
    </template>

    <div>
      <span>
        Пользователь <b> {{ item.name }}({{ item.login }}) </b> будет удалён
      </span>
    </div>
  </DefaultModal>
</template>

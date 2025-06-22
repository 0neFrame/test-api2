<script setup>
import { ref } from 'vue'
import { user } from '@/api'
import DefaultModal from '@/components/DefaultModal.vue'

const { item } = defineProps({
  item: Object,
})

const emit = defineEmits(['refreshUsers'])

const updateData = ref(JSON.parse(JSON.stringify(item)))

async function handlerUpdateUser() {
  const { user_id, name, password, active } = updateData.value
  await user.updateUserById({ user_id, name, password, active })
  emit('refreshUsers')
}
function resetComponentData() {
  updateData.value = JSON.parse(JSON.stringify(item))
}
</script>

<template>
  <DefaultModal
    :title="`Редактировать - ${item.name}`"
    @agree="handlerUpdateUser"
    @modalClose="resetComponentData"
  >
    <template #activator="activatorProps">
      <v-btn v-bind="activatorProps" icon="mdi-pencil" variant="text"></v-btn>
    </template>

    <template #default>
      <div class="d-flex flex-column">
        <v-text-field
          v-model="updateData.name"
          clearable
          label="Имя"
          placeholder="Новое имя"
          class="mb-2"
        ></v-text-field>

        <v-text-field
          v-model="updateData.password"
          clearable
          label="Пароль"
          placeholder="Новый пароль"
          class="mb-2"
        ></v-text-field>

        <span>
          <v-switch
            v-model="updateData.active"
            :false-value="0"
            :true-value="1"
            color="green"
            :label="`Пользователь ${updateData.active ? 'активирован' : 'деактивирован'}`"
            hide-details
          ></v-switch
        ></span>
      </div>
    </template>
  </DefaultModal>
</template>

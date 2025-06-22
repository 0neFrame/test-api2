<script setup>
import { computed, ref } from 'vue'
import { user } from '@/api'
import DefaultModal from '@/components/DefaultModal.vue'

const emit = defineEmits(['refreshUsers'])

const defaultModal = ref(null)
const errorMessage = ref('')
const hasError = ref(true)
const name = ref('')
const password = ref('')

const disabledBtn = computed(() => !name.value?.length || !password.value?.length)

async function handlerCreateUser() {
  const response = await user.createUser({ name: name.value, password: password.value })
  hasError.value = !!response

  // если 'response === TRUE' значит там ОШИБКА
  if (response) {
    errorMessage.value = response
  } else {
    emit('refreshUsers')
    defaultModal.value?.hideModal()
  }
}
function resetComponentData() {
  errorMessage.value = ''
  hasError.value = true
  name.value = ''
  password.value = ''
}
</script>

<template>
  <DefaultModal
    ref="defaultModal"
    title="Новый пользователь"
    :disabledBtn="disabledBtn"
    :error="hasError"
    @agree="handlerCreateUser"
    @modalClose="resetComponentData"
  >
    <template #activator="activatorProps">
      <v-btn v-bind="activatorProps" prepend-icon="mdi-plus"> новый пользователь </v-btn>
    </template>

    <template #default>
      <div class="d-flex flex-column">
        <v-text-field
          v-model="name"
          clearable
          label="Имя"
          placeholder="Новое имя"
          class="mb-2"
        ></v-text-field>

        <v-text-field
          v-model="password"
          :error-messages="errorMessage"
          clearable
          label="Пароль"
          placeholder="Новый пароль"
          class="mb-2"
        ></v-text-field>
      </div>
    </template>
  </DefaultModal>
</template>

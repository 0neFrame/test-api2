<script setup>
import { ref, toValue } from 'vue'
import { auth } from '@/api'

const errorMessage = ref('')
const form = ref(false)
const login = ref(null)
const password = ref(null)
const loading = ref(false)
const showPassword = ref(false)

async function onSubmit() {
  if (!form.value) return
  loading.value = true
  const response = await handlerLogin()
  errorMessage.value = response
  loading.value = false
}
function required(v) {
  return !!v || 'Заполните поле'
}
function handlerLogin() {
  return auth.login({ login: toValue(login), password: toValue(password) })
}
</script>

<template>
  <v-sheet class="bg-deep-purple d-flex align-center justify-center text-center" height="100vh">
    <v-card class="mx-auto px-6 py-8" min-width="344">
      <v-form v-model="form" @submit.prevent="onSubmit">
        <v-text-field
          v-model="login"
          :readonly="loading"
          :rules="[required]"
          class="mb-2"
          label="Логин"
          clearable
          @update:focused="errorMessage = ''"
        ></v-text-field>

        <v-text-field
          v-model="password"
          :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :error-messages="errorMessage"
          :readonly="loading"
          :rules="[required]"
          :type="showPassword ? 'text' : 'password'"
          label="Пароль"
          placeholder="Введите пароль"
          clearable
          @click:append-inner="showPassword = !showPassword"
          @update:focused="errorMessage = ''"
        ></v-text-field>

        <br />

        <v-btn
          :disabled="!form"
          :loading="loading"
          color="success"
          size="large"
          type="submit"
          variant="elevated"
          block
        >
          Войти
        </v-btn>
      </v-form>
    </v-card>
  </v-sheet>
</template>

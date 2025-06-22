<script setup>
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import { auth } from '@/api'

const authUserData = ref(null)

async function handlerLoadAuthUserData() {
  authUserData.value = await auth.getAuthUser()
}
function handlerLogout() {
  auth.logout()
}

handlerLoadAuthUserData()
</script>

<template>
  <v-toolbar class="bg-deep-purple text-white">
    <v-toolbar-title text="Test-Api2"></v-toolbar-title>

    <div class="text-center">
      <v-menu open-on-hover>
        <template v-slot:activator="{ props }">
          <v-btn color="primary" v-bind="props"> {{ authUserData?.login }} </v-btn>
        </template>

        <v-list>
          <v-list-item value="Выход">
            <v-list-item-title @click="handlerLogout">Выход</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </v-toolbar>

  <RouterView />
</template>

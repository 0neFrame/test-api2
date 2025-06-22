<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  item: Object,
  title: String,
  disabledBtn: Boolean,
  error: Boolean,
})

const emit = defineEmits(['agree', 'modalClose'])

const showModal = ref(false)

function handlerAgree() {
  emit('agree')

  // props.error - из UserCreateBtn, для контроля над модалкой
  if (!props.error) showModal.value = false
}
function hideModal() {
  showModal.value = false
}

defineExpose({
  // hideModal в defineExpose - для контроля над модалкой из UserCreateBtn
  hideModal,
})

watch(showModal, () => {
  emit('modalClose')
})
</script>

<template>
  <v-dialog v-model="showModal" max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <slot name="activator" v-bind="activatorProps"></slot>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card :title="props.title">
        <v-card-text>
          <slot></slot>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn @click="isActive.value = false">Отмена</v-btn>
          <v-btn :disabled="disabledBtn" @click="handlerAgree">ОК</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<template>
  <div>
    <div class="modal-backdrop opacity-25" />
    <div class="modal show fade">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">{{ props.title }}</h4>
            <button type="button" @click="close"></button>
          </div>
          <slot/>
          <div class="modal-footer">
            <button type="button" @click="close" class="notification-button button-accent">Проверить</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps(['title']);
const emit = defineEmits(['close']);
import { useAuthStore } from "~~/store/auth";

const auth = useAuthStore();
const { toggleUserMode } = auth;

const toggle = () => {
  let isEmployerMode = localStorage.getItem('isEmployer');
  if (isEmployerMode === String(isEmployer.value)){
    localStorage.setItem('isEmployer', !isEmployer.value);
  }
  toggleUserMode();
}

const close = () => {
  console.log(1);
  emit('close');
}

</script>

<style scoped>
.modal-title{
  font-size: 1.2rem;
}

.modal-content{
  justify-content: center;
}
</style>
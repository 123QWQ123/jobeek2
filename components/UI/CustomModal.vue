<template>
  <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          ...
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Understood</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
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

const isAuthed = computed(() => auth.isAuthed);
const isEmployer = computed(() => auth.isEmployer);

let isEmployerMode = localStorage.getItem('isEmployer');
if (isEmployerMode === null){
  localStorage.setItem('isEmployer', isEmployer.value);
}else{
  if (isEmployerMode !== String(isEmployer.value)){
    toggleUserMode();
  }
}

</script>

<style scoped>

</style>
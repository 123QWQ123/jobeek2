<template>
  <div
    class="modal fade"
    :class="{ show: isOpen }"
    id="resume_list_modal"
    tabindex="-1"
    aria-labelledby="resume_list_modal"
    :aria-hidden="isOpen"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="resume_list_modal">Modal title</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">...</div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["isOpen"]);
const isOpen = computed(() => props.isOpen);
</script>

<style scoped>
.show {
  display: block;
}
</style>

<template>
  <div class="filter-form-item">
    <div class="filter-tree-selector-content">
      <VacanciesCheckbox
        @change="toggle"
        :label="props.label"
        :checked="props.checked"
      />
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["toggle"]);
const props = defineProps({
  parent_id: {
    required: true,
  },
  id: {
    required: true,
  },
  checked: {
    required: false,
  },
  label: {
    required: false,
  },
});

const toggle = (newValue) => {
  emit("toggle", props.id, newValue);
};
</script>

<style scoped></style>

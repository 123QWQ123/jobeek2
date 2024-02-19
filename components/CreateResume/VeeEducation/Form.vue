<template>
  <div class="m-2" :key="field.key" v-for="(field, idx) in fields">
    <CreateResumeVeeEducationItem
      @remove="remove"
      :name="props.name"
      :idx="idx"
    />
  </div>
  <button
    type="button"
    class="btn btn-primary btn-sm mt-1"
    v-if="fields.length === 0"
    @click="addNew"
  >
    Добавить
  </button>
  <button
    type="button"
    class="btn btn-primary mt-1 btn-sm"
    v-if="fields.length > 0"
    @click="addNew"
  >
    Добавить еще
  </button>
</template>

<script setup>
import { useDictionaryStore } from "~/store/dictionary.js";
import { useFieldArray } from "vee-validate";

const props = defineProps(["name", "parent_type_id", "providers"]);

const addNew = () => {
  push({
    type_id: props.parent_type_id ?? 115,
    form_id: null,
    profession: null,
    institute: null,
    faculty: null,
    // start_year: null,
    end_year: null,
  });
};

const { push, fields, remove } = useFieldArray(() => props.name);
const { getPreferredContactTypes, getResumeEducationForms } =
  useDictionaryStore();
onMounted(() => {
  getPreferredContactTypes();
  getResumeEducationForms();
});
</script>

<style scoped></style>

<template>
  <div class="mt-2" :key="field.key" v-for="(field, idx) in fields">
    <CreateResumeVeeTestsAndExamsItem
      @remove="remove"
      :name="props.name"
      :providers="props.providers"
      :idx="idx"
    />
  </div>
  <button
    type="button"
    class="btn btn-primary btn-sm mt-3"
    v-if="fields.length === 0"
    @click="addNew"
  >
    Добавить
  </button>
  <button
    type="button"
    class="btn btn-primary mt-3 btn-sm"
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
    name: null,
    profession: null,
    organization: null,
    year: null,
  });
};

const { push, fields, remove } = useFieldArray(() => props.name);
const { getPreferredContactTypes, getResumeEducationForms } =
  useDictionaryStore();
onMounted(() => {});
</script>

<style scoped></style>

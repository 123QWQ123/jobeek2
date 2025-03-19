<template>
  <div class="pe-4">
    <div class="mt-2" :key="field.key" v-for="(field, idx) in fields">
      <CreateResumeForeignLanguagesVeeItem
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
  </div>
</template>

<script setup>
import { useDictionaryStore } from "~/store/dictionary.js";
import { useFieldArray } from "vee-validate";
import { useAsyncData } from "#app";

const props = defineProps(["name"]);

const addNew = () => {
  push({
    language_id: null,
    level_id: null,
  });
};

const { push, fields, remove } = useFieldArray(() => props.name);
const { getForeignLanguages } = useDictionaryStore();

await useAsyncData(
  "getForeignLanguages",
  async () => await getForeignLanguages(),
);
</script>

<style scoped></style>

<template>
  <div>
    <div :key="field.key" v-for="(field, idx) in fields">
      <CreateResumeVeeWorkExperienceItem
        @delete="remove"
        :name="props.name"
        :value="field.value"
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
  </div>
</template>

<script setup>
import { useFieldArray } from "vee-validate";

const props = defineProps(["name", "parent_type_id", "providers"]);

const addNew = () => {
  push({
    profession: null,
    company: null,
    company_url: null,
    city_id: 2119,
    industries: null,
    start_year: null,
    end_year: null,
    start_month: null,
    end_month: null,
    until_today: false,
    responsibilities: null,
    achievements: null,
    company_scope: null,
  });
};

const { push, fields, remove } = useFieldArray(() => props.name);
</script>

<style scoped></style>

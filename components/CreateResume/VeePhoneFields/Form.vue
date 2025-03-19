<template>
  <div class="input-row">
    <label>Телефоны</label>

    <div class="input-wrapper mt-2">
      <div class="phone_network_form">
        <div :key="field.key" v-for="(field, idx) in fields">
          <CreateResumeVeePhoneFieldsVeeItem
            @remove="remove"
            :name="props.name"
            :providers="props.providers"
            :idx="idx"
            :value="value[idx]"
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
    </div>
  </div>
</template>

<script setup>
import { useDictionaryStore } from "~/store/dictionary.js";
import { useFieldArray } from "vee-validate";

const props = defineProps(["name", "providers", "value"]);

const addNew = () => {
  push({
    type_id: 150,
    phone: null,
    comment: null,
    start_available_time_phone: null,
    end_available_time_phone: null,
    is_preferred: false,
  });
};

const { push, fields, remove } = useFieldArray(() => props.name);
const { getPreferredContactTypes } = useDictionaryStore();
await getPreferredContactTypes();
</script>

<style scoped></style>

<template>
  <div>
    <legend>User #{{ idx }}</legend>
    <label :for="`${props.name}_${idx}`">Тип</label>
    <VeeCustomSelect
      :options="preferredContactTypeOptions"
      :name="`${name}[${idx}].type_id`"
      label="Выберите"
    />
    <label :for="`email_${idx}`">Email</label>
    <ResumeTextInput
      :name="`${props.name}[${idx}].comment`"
      placeholder="Enter your comment"
    />
    <button class="btn btn-primary btn-sm" type="button" @click="remove(idx)">
      X
    </button>
    <br />
    <button type="button" class="btn btn-light" @click="confirmEmail">
      Confirm Email
    </button>
  </div>
</template>
<script setup>
import ResumeTextInput from "~/components/CreateResume/ResumeTextInput.vue";
import { useField } from "vee-validate";
import { useDictionaryStore } from "~/store/dictionary.js";

const props = defineProps(["idx", "name"]);
const { idx, name } = toRefs(props);
const emit = defineEmits(["remove"]);

const { value, errorMessage } = useField(
  () => props.name + "[" + props.idx + "].phone",
);
const confirmEmail = () => {
  value.value = "@mail.uz";
};
const dictionaryStore = useDictionaryStore();
const preferredContactTypeOptions = computed(() => {
  return dictionaryStore.preferred_contact_types.map((item) => ({
    name: item.name,
    value: item.id,
  }));
});

const remove = (id) => {
  emit("remove", id);
};
</script>

<style>
input {
  display: block;
}

span {
  display: block;
  margin-bottom: 20px;
}

label {
  display: block;
  margin-top: 20px;
}

button {
  display: block;
}

button[type="submit"] {
  margin-top: 10px;
}

.InputGroup button {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>

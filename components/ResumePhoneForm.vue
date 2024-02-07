<template>
  <div>
    <fieldset :key="field.key" v-for="(field, idx) in fields">
      <ResumePhoneFormItem @remove="remove" :name="props.name" :idx="idx" />
    </fieldset>
    <button type="button" @click="push({ email: '', name: '' })">
      Add User +
    </button>
  </div>
</template>
<script setup>
import { useDictionaryStore } from "~/store/dictionary.js";
import { useFieldArray } from "vee-validate";

const props = defineProps(["name"]);

const { push, fields, remove } = useFieldArray(() => props.name);
const { getPreferredContactTypes } = useDictionaryStore();
onMounted(() => {
  getPreferredContactTypes();
});
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

.InputGroup {
  padding: 10px;
  border: 2px dotted black;
  margin-bottom: 30px;
  position: relative;
}

.InputGroup button {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>

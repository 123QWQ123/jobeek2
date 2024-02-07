<template>
  <div>
    <fieldset :key="field.key" v-for="(field, idx) in fields">
      <ChildForm3Item @remove="remove" :idx="idx" />
    </fieldset>
    <button type="button" @click="push({ email: '', name: '' })">
      Add User +
    </button>
  </div>
</template>
<script setup>
const props = defineProps(["name"]);
import { useFieldArray } from "vee-validate";
import ChildForm3Item from "~/components/ChildForm3Item.vue";

const { push, fields, remove } = useFieldArray(() => props.name);
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

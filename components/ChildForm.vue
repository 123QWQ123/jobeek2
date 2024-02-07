<template>
  <FieldArray name="users" v-slot="{ fields, push, remove }">
    <fieldset
      class="InputGroup"
      v-for="(field, idx) in fields"
      :key="field.key"
    >
      <legend>User #{{ idx }}</legend>
      <label :for="`name_${idx}`">Name</label>
      <Field :id="`name_${idx}`" :name="`users[${idx}].name`" />
      <ErrorMessage :name="`users[${idx}].name`" />

      <label :for="`email_${idx}`">Email</label>
      <Field :id="`email_${idx}`" :name="`users[${idx}].email`" type="email" />
      <ErrorMessage :name="`users[${idx}].email`" />
      <button type="button" @click="remove(idx)">X</button>
    </fieldset>

    <button type="button" @click="push({ email: '', name: '' })">
      Add User +
    </button>
  </FieldArray>
</template>
<script setup>
import { ErrorMessage, Field, FieldArray } from "vee-validate";
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

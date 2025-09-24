<script setup lang="js">
import * as yup from "yup";
import { useForm } from "vee-validate";

const initialData = {
  users: [
    {
      name: "",
      email: "te@domain.uz",
    },
  ],
  email: "",
};

const schema = yup.object().shape({
  users: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string().required().label("Name"),
        email: yup.string().email().required().label("Email"),
      }),
    )
    .strict(),
  email: yup.string().email().required(),
});

function onSubmit() {
  validate();
}

const { values, setValues, errors, handleSubmit, validate } = useForm({
  initialValues: initialData,
  validationSchema: schema,
});
</script>

<template>
  <div class="container">
    <div class="p-5">
      <h1>vee-validate array fields</h1>

      <form @submit.prevent="onSubmit">
        <div class="input-group">
          <label for="email">Parent E-mail</label>
          <Field id="email" name="email" type="email" />
          <ErrorMessage name="email" />
        </div>

        <ChildForm3 name="users" />

        <button class="btn btn-primary" type="submit">Submit</button>
      </form>
    </div>
    {{ errors }}
  </div>
</template>

<style>
#app {
  font-family: Arial, Helvetica, sans-serif;
  max-width: 500px;
}

form {
  padding: 20px;
  border: 1px solid black;
}

form + form {
  margin-top: 20px;
}
</style>

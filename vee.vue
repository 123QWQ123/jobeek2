<template>
  <div>
    {{ values }}
    <form @submit.prevent="onSubmit">
      <Field name="email" type="email" rules="required|email" />

      <button>Sign up for newsletter</button>
    </Form>
    {{ errors }}
  </div>
</template>
<script setup>
import { Field, Form, defineRule, useForm } from 'vee-validate';
import { required, email, min } from '@vee-validate/rules';
defineRule('required', required);
defineRule('email', email);
defineRule('min', min);

const onSubmit= (e) => {
  console.log(e);
}
// Creates a form context
// This component now acts as a form
// Usually you will destruct the form context to get what you need
const { values, errors } = useForm();
</script>
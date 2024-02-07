<template>
  <form @submit="onSubmit">
    <CreateResumeVeePhoneFieldsForm name="phones" />

    <!--    <div v-for="(field, idx) in fields" :key="field.key">-->
    <!--      <Field :name="`links[${idx}].url`" type="url" />-->

    <!--      <button type="button" @click="remove(idx)">Remove</button>-->
    <!--    </div>-->

    <!--    <button type="button" @click="push({ url: '' })">Add</button>-->

    <!--    <button>Submit</button>-->
  </form>
</template>

<script setup>
import * as yup from "yup";
import { useForm } from "vee-validate";

const schema = computed(() => {
  return {
    email: "required|email",
    phones: yup
      .array()
      .of(
        yup.object().shape({
          type_id: yup.number().required(),
          comment: yup.string().required(),
        }),
      )
      .strict(),
  };
});

const initialValues = ref({
  email: null,
  phones: [
    {
      type_id: 151,
      comment: "sdkmfksd",
      phone: "+998942638523",
      is_preferred: false,
      start_available_time_phone: "08:00",
      end_available_time_phone: "08:00",
    },
  ],
});
const {
  errors,
  values,
  setErrors,
  defineField,
  meta,
  handleSubmit,
  setValues,
  resetForm,
  resetField,
} = useForm({
  initialValues: initialValues,
  validationSchema: schema,
});

const onSubmit = () => {
  console.log(1);
};
</script>

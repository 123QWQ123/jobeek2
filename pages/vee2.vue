<script setup lang="js">
import * as yup from "yup";
import { useI18n } from "vue-i18n";

const initialData = {
  phones: [
    {
      type_id: null,
      phone: null,
      comment: null,
      start_available_time_phone: null,
      end_available_time_phone: null,
      is_preferred: false,
    },
  ],
  email: "",
};
const { t } = useI18n();
const schema = yup.object().shape({
  phones: yup
    .array()
    .of(
      yup.object().shape({
        type_id: yup.string().required(t("create_resume.validation.required")),
        comment: yup.string().required(t("create_resume.validation.required")),
        start_available_time_phone: yup
          .string()
          .required(t("create_resume.validation.required")),
        end_available_time_phone: yup
          .string()
          .required(t("create_resume.validation.required")),
        phone: yup.string().email().required().label("phone"),
        is_preferred: yup
          .bool()
          .required(t("create_resume.validation.required")),
      }),
    )
    .strict(),
  email: yup
    .string()
    .email(t("create_resume.validation.invalid_email"))
    .required(t("create_resume.validation.required")),
});

const schema2 = {
  email: "required|email",
};

console.log(schema);
console.log(schema2);

function onSubmit() {
  console.log(JSON.stringify(values, null, 2));
  validate();
}

const { values, setValues, errors, handleSubmit, validate } = useForm({
  initialValues: initialData,
  validationSchema: schema,
});

onMounted(() => {
  setTimeout(() => {
    setValues({
      phones: [
        {
          type_id: "151",
          phone: null,
          comment: null,
          start_available_time_phone: null,
          end_available_time_phone: null,
          is_preferred: false,
        },
      ],
      email: "",
    });
  });
});
</script>

<template>
  <div class="container">
    <div class="p-5">
      <h1>vee-validate array fields</h1>

      <form @submit.prevent="onSubmit">
        <div class="input-group">
          <label for="email">Parent Email</label>
          <Field id="email" name="email" type="email" />
          <ErrorMessage name="email" />
        </div>

        <CreateResumeVeePhoneFieldsForm name="phones" />
        {{ values }}
        <br />

        <button class="btn btn-primary" type="submit">Submit</button>
      </form>
    </div>
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

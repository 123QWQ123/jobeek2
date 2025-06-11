<template>
  <div class="w-box w-box--main">
    <div class="w-box-head">
      <h1 class="title">Профиль</h1>
    </div>
    <form
      class="w-box-body"
      @submit.prevent="handleSubmit"
      :style="{ overflowY: 'hidden' }"
      autocomplete="off"
    >
      <PageLoader v-if="isLoading" />
      <div class="input-row">
        <label for="photo">Лого</label>
        <ProfilePhotoInput
          class="photo_radius"
          name="logo"
          name_url="logo_url"
          :preview="authStore.employer?.logo_url"
          :avatar="avatar"
        />
      </div>

      <div class="input-row">
        <label for="password">Название компании <b>*</b></label>
        <div class="input-wrapper position-relative">
          <VeeCustomTextInput
            type="text"
            :autofill="false"
            name="company_name"
            placeholder="Название"
          />
        </div>
      </div>
      <div class="input-row">
        <label for="password">О компании <b>*</b></label>
        <div class="input-wrapper position-relative">
          <VeeCustomTextInput type="text" name="company_description" />
        </div>
      </div>

      <div class="input-row">
        <label for="password">Сайт компании<b>*</b></label>
        <div class="input-wrapper position-relative">
          <VeeCustomTextInput
            type="text"
            name="company_url"
            :autofill="false"
            placeholder="https://"
          />
        </div>
      </div>

      <div class="input-row">
        <label for="phone">Телефон</label>
        <div class="input-wrapper">
          <ProfilePhoneDisabledInput name="phone" />
        </div>
      </div>
      <div class="input-row">
        <label for="email">Электронная почта<b>*</b></label>
        <div class="input-wrapper">
          <ProfileEmailInput
            name="email"
            type="employer"
            key="employer_email"
          />
        </div>
      </div>

      <div class="input-row">
        <label for="password">Пароль<b>*</b></label>
        <div class="input-wrapper position-relative">
          <VeeCustomTextInput name="password" placeholder="********" />
        </div>
      </div>

      <div class="input-row">
        <div class="input-wrapper">
          <base-button type="submit">Сохранить</base-button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { useProfileStore } from "~/store/profile";
import Swal from "sweetalert2";
import { useForm } from "vee-validate";

import avatar from "~/assets/img/jobeek-avatar.png";
import { toTypedSchema } from "@vee-validate/zod";
import { zod } from "~/hooks/ru-zod.js";
import { useAuthStore } from "~/store/auth.js";

const profileStore = useProfileStore();

const { getUser } = profileStore;
const authStore = useAuthStore();
const { refreshEmployer } = authStore;
const { employer } = storeToRefs(authStore);

const schema = zod.object({
  company_name: zod.string().trim().min(1),
  company_url: zod.string().url().trim().min(1),
  company_description: zod.string().trim().min(1),
  email: zod.string().email(),
  phone: zod.string(),
});

const getFields = (newObject) => {
  if (!newObject) return {};
  return {
    logo: newObject.logo ?? null,
    company_name: newObject.company_name,
    company_description: newObject.company_description,
    email: newObject.email,
    company_url: newObject.company_url,
    phone: newObject.phone,
  };
};
const initialValues = getFields(employer.value);
const { values, errors, meta, setErrors, resetForm, validate } = useForm({
  initialValues,
  initialTouched: true,
  validationSchema: toTypedSchema(schema),
});
watch(
  () => authStore.employer,
  () => {
    resetForm({ values: getFields(authStore.employer) });
  },
);

const { updateEmployer } = profileStore;

function getFormData(object) {
  const formData = new FormData();
  Object.keys(object).forEach((key) => formData.append(key, object[key]));
  return formData;
}

const isLoading = ref(false);
const errorMessage = ref(null);
const handleSubmit = async (e) => {
  isLoading.value = true;
  await validate();
  setErrors({});

  errorMessage.value = "";
  const formData = getFormData(JSON.parse(JSON.stringify(values)));
  if (values.hasOwnProperty("password")) {
    if (values.password != null) {
      formData.append("password_confirmation", values.password);
    } else {
      formData.delete("password");
    }
  }
  if (values.hasOwnProperty("logo")) {
    if (values.logo != null) {
      formData.append("logo", values.logo);
    } else {
      formData.delete("logo");
    }
  }
  formData.append("_method", "put");
  const resData = await updateEmployer(formData);
  if (resData.status === "success") {
    getUser();
    await refreshEmployer();
    isLoading.value = false;
  } else {
    errorMessage.value = resData.message;

    if (resData?.errors) {
      setErrors(resData.errors);
    }
    isLoading.value = false;
  }
};
</script>

<style>
input[type="text"]:disabled {
  background: #ccc;
}
</style>
<style scoped>
@media (max-width: 768px) {
  .position-relative {
    position: static !important;
  }

  .position-absolute {
    position: static !important;
  }
}

#photo {
  cursor: pointer;
}
</style>

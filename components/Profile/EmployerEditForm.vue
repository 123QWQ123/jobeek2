<template>
  <form
    class="w-box-body"
    @submit.prevent="handleSubmit"
    :style="{ overflowY: 'hidden' }"
  >
    <PageLoader v-if="isLoading" />

    <ProfilePhotoInput name="logo" preview="logo_url" />

    <div class="input-row">
      <label for="password">Название компании <b>*</b></label>
      <div class="input-wrapper position-relative">
        <CustomTextInput
          type="text"
          name="company_name"
          placeholder="Название"
        />
      </div>
    </div>
    <div class="input-row">
      <label for="password">О компании <b>*</b></label>
      <div class="input-wrapper position-relative">
        <CustomTextInput type="text" name="company_description" />
      </div>
    </div>

    <div class="input-row">
      <label for="password">Сайт компании<b>*</b></label>
      <div class="input-wrapper position-relative">
        <CustomTextInput
          type="text"
          name="company_url"
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
        <ProfileEmailInput name="email" type="employer" key="employer_email" />
      </div>
    </div>

    <div class="input-row">
      <label for="password">Пароль<b>*</b></label>
      <div class="input-wrapper position-relative">
        <CustomTextInput
          type="password"
          name="password"
          placeholder="********"
        />
      </div>
    </div>

    <div class="input-row">
      <div class="input-wrapper">
        <base-button type="submit">Сохранить</base-button>
      </div>
    </div>
  </form>
</template>

<script setup>
import { useProfileStore } from "~/store/profile";
import { storeToRefs } from "pinia";
import Swal from "sweetalert2";
import { useRuntimeConfig } from "nuxt/app";
import { useCheckJSON } from "~/composables/useCheckJSON";
import { useDiff } from "~/composables/useDiff.js";
import { useForm } from "vee-validate";

const CONFIG = useRuntimeConfig();

const profileStore = useProfileStore();

const { getUser } = profileStore;
const { employer } = storeToRefs(profileStore);

const schema = computed(() => {
  return {
    company_name: "required|min:1|max:100",
    company_url: "required|min:1|max:2500",
    company_description: "required|min:1|max:255",
    email: { required: true, email: true },
  };
});
const { values, errors, meta, setErrors, resetForm, validate } = useForm({
  initialValues: {
    logo: null,
    company_name: null,
    company_url: null,
    company_description: null,
    email: null,
  },
  initialTouched: true,
  validationSchema: schema,
});

const sectionData = ref({});

const getFields = (newObject) => {
  return {
    logo: newObject.logo ?? null,
    company_name: newObject.company_name,
    company_description: newObject.company_description,
    email: newObject.email,
    company_url: newObject.company_url,
    logo_url: newObject.logo_url,
    phone: newObject.phone,
  };
};
watch(
  () => profileStore.employer,
  (newObject) => {
    if (newObject) {
      sectionData.value = getFields(newObject);
    }
  },
);
watch(
  () => sectionData.value,
  (newData, oldData) => {
    const diffData = useDiff(newData, oldData);
    if (Object.keys(diffData).length) {
      resetForm({ values: newData });
    }
  },
);

onMounted(() => {
  if (!profileStore.employer) {
    getUser();
  } else {
    sectionData.value = getFields(profileStore.employer);
  }
});

const route = useRoute();
const routeErrorMessage = computed(() => {
  if (useCheckJSON(route.query.message)) {
    return JSON.parse(route.query.message).text;
  }
  return route.query.message;
});
const { updateEmployer } = profileStore;

function getFormData(object) {
  console.log(object);
  const formData = new FormData();
  Object.keys(object).forEach((key) => formData.append(key, object[key]));
  return formData;
}

const isLoading = ref(false);
const errorMessage = ref(null);
const handleSubmit = async (e) => {
  isLoading.value = true;
  validate();
  setErrors({});

  errorMessage.value = "";
  const formData = getFormData(values);
  console.log(values.company_url);
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
    await getUser();

    Swal.fire({
      title: "Успешно!",
      text: resData.message,
      icon: "success",
      confirmButtonText: "ОК",
      preConfirm: () => {
        // navigateTo({ path: "/", query: {} });
      },
    });
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

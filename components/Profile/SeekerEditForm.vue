<template>
  <form class="w-box-body" @submit.prevent="handleSubmit">
    <PageLoader v-if="isLoading" />

    <div class="alert alert-danger" v-if="errorMessage">
      {{ errorMessage }}
    </div>
    <ProfilePhotoInput name="photo" preview="photo_url" />
    <div class="input-row">
      <label for="name">Имя и фамилия <b>*</b></label>
      <div class="input-wrapper">
        <div class="c2">
          <CustomTextInput name="first_name" placeholder="Имя" />
          <CustomTextInput name="last_name" placeholder="Фамилия" />
        </div>
      </div>
    </div>
    <div class="input-row">
      <label>Дата рождения <b>*</b></label>
      <div class="input-wrapper">
        <VeeBirthDatePicker name="birth_date"></VeeBirthDatePicker>
      </div>
    </div>
    <div class="input-row">
      <label for="country">Город проживания <b>*</b></label>
      <div class="input-wrapper">
        <VeeSelectWithSearch
          :options="countryOptions"
          name="country_id"
          placeholder="Выберите страну"
        ></VeeSelectWithSearch>

        <div class="mt-2">
          <VeeSelectWithSearch
            :options="cityOptions"
            @input="updateCityInput"
            name="city_id"
            :placeholder="'Выберите город'"
          ></VeeSelectWithSearch>
        </div>
      </div>

      <div class="input-wrapper mt-2"></div>
    </div>
    <div class="input-row">
      <label for="phone">Телефон</label>
      <div class="input-wrapper">
        <PhoneDisabledInput name="phone" />
      </div>
    </div>
    <div class="input-row">
      <label for="email">Электронная почта<b>*</b></label>
      <div class="input-wrapper">
        <ProfileEmailInput name="email" type="seeker" />
      </div>
    </div>

    <div class="input-row">
      <label for="password">Пароль<b>*</b></label>
      <div class="input-wrapper position-relative">
        <CustomTextInput type="password" name="password" />
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
import Swal from "sweetalert2";
import PageLoader from "../UI/PageLoader";
import { useAuthStore } from "~/store/auth";
import { useCheckJSON } from "~/composables/useCheckJSON";
import { navigateTo } from "#app";
import useFormValidation from "~/composables/useFormValidation.js";
import useResumeHooks from "~/hooks/useResumeHooks.js";
import { useDiff } from "~/composables/useDiff.js";
import PhoneDisabledInput from "~/components/Profile/PhoneDisabledInput.vue";

const profileStore = useProfileStore();

const { getUser } = profileStore;
const { refreshSeeker } = useAuthStore();
const { getCityNameFromArea2 } = useResumeHooks();
const { searchCities } = profileStore;
const updateCityInput = async (newValue = "") => {
  if (newValue) {
    const items = await searchCities({
      search: newValue,
    });
    cityOptions.value = items.map((item) => ({
      value: item.id,
      name: getCityNameFromArea2(item),
    }));
  }
};

const seeker = computed(() => profileStore.seeker);
const schema = computed(() => {
  return {
    first_name: "required|min:1|max:100",
    last_name: "required|min:1|max:100",
    email: { required: true, email: true },
    birth_date: "required|date",
    city_id: "required|numeric",
    country_id: "required|numeric",
  };
});
const { values, errors, meta, setErrors, resetForm, validate } = useForm({
  initialValues: {
    first_name: null,
    last_name: null,
    email: null,
    birth_date: null,
    city_id: null,
    country_id: 1,
  },
  initialTouched: true,
  validationSchema: schema,
});

const sectionData = ref({});

const getFields = (newObject) => {
  return {
    first_name: newObject.first_name,
    last_name: newObject.last_name,
    email: newObject.email,
    email_to_verify: newObject.email_to_verify,
    phone: newObject.phone,
    birth_date: newObject.birth_date,
    city_id: newObject.city_id,
    country_id: newObject.country_id,
    photo_url: newObject.photo_url,
  };
};
watch(
  () => profileStore.seeker,
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
      const country_id = newData.country_id;
      if (country_id) {
        getCities({ country_ids: [country_id] });
      }
    }
  },
);

onMounted(() => {
  if (!profileStore.seeker) {
    getUser();
  } else {
    sectionData.value = getFields(profileStore.seeker);
  }
});

const { getCountries, getCities } = profileStore;
await getCountries();

const { countryOptions } = storeToRefs(profileStore);
const cityOptions = ref([]);

const { value: country_id } = useField("country_id");

watch(
  () => country_id.value,
  (new_value) => {
    if (new_value) {
      getCities({ country_ids: [new_value] });
    }
  },
);

watch(
  () => profileStore.cities,
  (newItems) => {
    cityOptions.value = newItems.map((item) => ({
      value: item.id,
      name: getCityNameFromArea2(item),
    }));
  },
);
const { upload } = profileStore;

const { errors: serverErrors, handleErrorResponse } = useFormValidation();

watch(
  () => serverErrors.value,
  (newErrors) => {
    if (Object.keys(newErrors).length > 0) {
      const backendErrors = {};
      Object.keys(newErrors).map(
        (item) => (backendErrors[item] = newErrors[item]),
      );
      setErrors(backendErrors);
    }
  },
);
const errorMessage = ref(null);
const isLoading = ref(false);
const route = useRoute();
const routeErrorMessage = computed(() => {
  if (useCheckJSON(route.query.message)) {
    return JSON.parse(route.query.message).text;
  }
  return route.query.message;
});
const { updateSeeker } = profileStore;

function getFormData(object) {
  const formData = new FormData();
  Object.keys(object).forEach((key) => formData.append(key, object[key]));
  return formData;
}

const handleSubmit = async (e) => {
  isLoading.value = true;
  validate();
  setErrors({});
  errorMessage.value = "";
  const formData = getFormData(values);
  if (values.hasOwnProperty("password")) {
    if (values.password instanceof String) {
      formData.append("password_confirmation", values.password);
    } else {
      formData.delete("password");
    }
  }
  formData.append("_method", "put");
  const resData = await updateSeeker(formData);

  if (resData.status === "success") {
    await getUser();
    await refreshSeeker();
    Swal.fire({
      title: "Успешно!",
      text: resData.message,
      icon: "success",
      confirmButtonText: "ОК",
      preConfirm: () => {
        navigateTo({ path: "/", query: {} });
      },
    });
    isLoading.value = false;

    if (routeErrorMessage.value) {
      navigateTo({ name: "profile", query: {} });
    }
  } else {
    errorMessage.value = resData.message;
    if (resData.data.hasOwnProperty("errors")) {
      setErrors(resData.data.errors);
      return;
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
#photo {
  cursor: pointer;
}
</style>

<template>
  <form class="w-box-body" autocomplete="off" @submit.prevent="handleSubmit">
    <PageLoader v-if="isLoading" />

    <ProfilePhotoInput
      class="photo_radius"
      name="photo"
      preview="photo_url"
      :avatar="avatar"
    />

    <div class="input-row">
      <label for="name">Имя и фамилия <b>*</b></label>
      <div class="input-wrapper">
        <div class="c2">
          <VeeCustomTextInput name="first_name" placeholder="Имя" />
          <VeeCustomTextInput name="last_name" placeholder="Фамилия" />
        </div>
      </div>
    </div>
    <div class="input-row">
      <label>Дата рождения <b>*</b></label>
      <div class="input-wrapper">
        <VeeBirthDatePicker name="birth_date" />
      </div>
    </div>
    <div class="input-row">
      <label for="country">Страна и город проживания <b>*</b></label>
      <div class="input-wrapper">
        <div class="c2">
          <VeeSelectWithSearch
            :options="countryOptions"
            name="country_id"
            placeholder="Выберите страну"
            not_found="Страна не найдено"
          />

          <VeeSelectWithSearch
            :options="cityOptions"
            @input="updateCityInput"
            name="city_id"
            :placeholder="'Выберите город'"
            not_found="Город не найдено"
          />
        </div>
      </div>
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
        <ProfileEmailInput name="email" type="seeker" key="employer_email" />
      </div>
    </div>

    <div class="input-row">
      <label for="password">Пароль<b>*</b></label>
      <div class="input-wrapper position-relative">
        <VeeCustomTextInput
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
import Swal from "sweetalert2";
import PageLoader from "../UI/PageLoader";
import { useAuthStore } from "~/store/auth";
import { useCheckJSON } from "~/composables/useCheckJSON";
import { navigateTo } from "#app";
import useFormValidation from "~/composables/useFormValidation.js";
import useResumeHooks from "~/hooks/useResumeHooks.js";
import { useDiff } from "~/composables/useDiff.js";
import PhoneDisabledInput from "~/components/Profile/PhoneDisabledInput.vue";

import avatar from "~/assets/img/jobeek-avatar.png";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "~/hooks/ru-zod.js";

console.log("render");

const profileStore = useProfileStore();

const { getUser } = profileStore;
const { refreshSeeker } = useAuthStore();
const { getCityNameFromArea, getCityNameFromArea2 } = useResumeHooks();
const { searchCities } = profileStore;
const isCityLoading = ref(false);
const { countryOptions } = storeToRefs(profileStore);
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

const schema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  birth_date: z.string(),
  email: z.string().email(),
  city_id: z.number().safe("Выберити город из списка"),
  country_id: z.number().safe("Выберити страну из списка"),
});
const { values, errors, meta, setErrors, resetForm, validate } = useForm({
  initialValues: {
    first_name: null,
    last_name: null,
    email: null,
    birth_date: null,
    city_id: null,
    country_id: null,
  },
  initialTouched: true,
  validationSchema: toTypedSchema(schema),
});
const cityOptions = ref([]);

const { value: country_id, setValue: setCountryId } = useField("country_id");
const { value: city_id, setValue: setCityId } = useField("city_id");

watch(
  () => country_id.value,
  (new_value) => {
    if (new_value) {
      const city = values.city_id;
      if (city) {
        setCityId(values.city_id ?? undefined);
        getCities({ city_id: values.city_id });
      } else {
        getCities({ country_ids: [new_value] });
      }
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

const sectionData = ref({});

const getFields = (newObject) => {
  return {
    first_name: newObject.first_name,
    last_name: newObject.last_name,
    email: newObject.email,
    email_to_verify: newObject.email_to_verify,
    phone: newObject.phone,
    birth_date: newObject.birth_date,
    city_id: newObject.city_id ?? undefined,
    city_name: newObject.city_name,
    photo_url: newObject.photo_url,
    country_id: newObject.country_id ?? 1,
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
  const formData = getFormData(JSON.parse(JSON.stringify(values)));
  if (values.hasOwnProperty("password")) {
    if (values.password !== "") {
      formData.append("password_confirmation", values.password);
    } else {
      formData.delete("password");
    }
  }
  if (values.hasOwnProperty("photo") && values.photo instanceof File) {
    formData.append("photo", values.photo) !== "";
  }

  formData.append("_method", "put");
  const resData = await updateSeeker(formData);

  if (resData.status !== "success") {
    errorMessage.value = resData.message;
    if (
      resData.message === "требуется создать Пароль при первом входе в систему!"
    ) {
      setErrors({ password: resData.message });
    }
    if (resData.hasOwnProperty("errors") && resData.errors) {
      setErrors(resData.errors);
    }
    isLoading.value = false;
    return;
  }
  await getUser();
  await refreshSeeker();
  Swal.fire({
    title: "Успешно!",
    text: resData.message,
    icon: "success",
    preConfirm: () => {
      // navigateTo({ path: "/", query: {} });
    },
  });
  isLoading.value = false;

  if (routeErrorMessage.value) {
    navigateTo({ name: "profile", query: {} });
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

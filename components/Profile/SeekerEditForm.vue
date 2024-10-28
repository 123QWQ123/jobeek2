<template>
  <form class="w-box-body" autocomplete="off" @submit.prevent="handleSubmit">
    <PageLoader v-if="isLoading" />

    <div class="input-row">
      <label for="photo">Фото</label>
      <ProfilePhotoInput
        class="photo_radius"
        name="photo"
        name_url="photo_url"
        :preview="authStore.seeker.photo_url"
        :avatar="avatar"
      />
    </div>

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
            :error="countryError"
            @input="updateCountryInput"
          />

          <VeeSelectWithSearch
            :options="cityOptions"
            @input="updateCityInput"
            name="city_id"
            :placeholder="'Выберите город'"
            not_found="Город не найдено"
            :error="cityError"
          />
        </div>
      </div>
    </div>
    <div class="input-row">
      <label for="phone">Телефон</label>
      <div class="input-wrapper">
        <ProfilePhoneDisabledInput v-if="authStore.seeker.phone" name="phone" />
      </div>
    </div>
    <div class="input-row">
      <label for="email">Электронная почта<b>*</b></label>
      <div class="input-wrapper">
        <ProfileEmailInput name="email" type="seeker" key="seeker_email" />
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
import { toTypedSchema } from "@vee-validate/zod";
import avatar from "~/assets/img/jobeek-avatar.png";
import { zod } from "~/hooks/ru-zod.js";

const profileStore = useProfileStore();
const { getUser } = profileStore;

const { refreshSeeker } = useAuthStore();
const { getCityNameFromArea2 } = useResumeHooks();

const { countryOptions } = storeToRefs(profileStore);

const cityError = ref("");
const countryError = ref("");
const updateCountryInput = async (newValue = "") => {
  if (newValue) {
    if (!newValue.toLowerCase().match(/[а-я]/i)) {
      countryError.value = "Используйте только алфавит кириллица";
      return;
    }
  } else {
    countryError.value = "";
  }
};
const updateCityInput = async (newValue = "") => {
  if (newValue) {
    if (!newValue.toLowerCase().match(/[а-я]/i)) {
      cityError.value = "Используйте только алфавит кириллица";
      return;
    }
    await getCities(
      {
        country_ids: [country_id.value],
        search: newValue,
      },
      true,
    );
  } else {
    cityError.value = "";
  }
};
const getFields = (newObject) => {
  if (!newObject) return {};
  return {
    first_name: newObject.first_name,
    last_name: newObject.last_name,
    email: newObject.email,
    email_to_verify: newObject.email_to_verify,
    birth_date: newObject.birth_date,
    city_id: newObject.city_id ?? undefined,
    city_name: newObject.city_name,
    photo: newObject.photo ?? null,
    country_id: newObject.country_id ?? 1,
    phone: newObject.phone,
  };
};
const schema = zod.object({
  first_name: zod.string(),
  last_name: zod.string(),
  birth_date: zod.string(),
  email: zod.string().email(),
  city_id: zod.number().safe("Выберити город из списка"),
  country_id: zod.number().safe("Выберити страну из списка"),
  phone: zod.string(),
});

const authStore = useAuthStore();

const initialValues = getFields(authStore.seeker);

const { values, errors, meta, setErrors, resetForm, validate } = useForm({
  initialValues,
  initialTouched: true,
  validationSchema: toTypedSchema(schema),
});

watch(
  () => values.city_id,
  () => {
    cityError.value = "";
  },
);
const { getCountries, getCities } = profileStore;
await getCountries();

await getCities({ city_id: values.city_id });

const cityOptions = ref(profileStore.cityOptions ?? []);

const { value: country_id, setValue: setCountryId } = useField("country_id");
const { value: city_id, setValue: setCityId } = useField("city_id");

setCityId(values.city_id ?? undefined);

watch(
  () => country_id.value,
  (new_value) => {
    if (new_value) {
      countryError.value = "";
      countryError.value = "";
      cityError.value = "";
      getCities({ country_ids: [new_value] }, true);
      setCityId(null);
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
    formData.append("photo", values.photo);
  } else {
    formData.delete("photo");
  }

  formData.append("_method", "put");
  const resData = await updateSeeker(formData);
  isLoading.value = false;
  if (resData.status !== "success") {
    errorMessage.value = resData.message;
    //todo  убрать это дебильное сравнение по тексту
    if (
      resData.message === "требуется создать Пароль при первом входе в систему!"
    ) {
      setErrors({ password: resData.message });
    }
    if (resData.hasOwnProperty("errors") && resData.errors) {
      setErrors(resData.errors);
    }
    return;
  }
  await getUser();
  await refreshSeeker();
  await Swal.fire({
    icon: "success",
    text: "Успешно сохранено",
    preConfirm: () => {
      // navigateTo({ path: "/", query: {} });
    },
  });

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

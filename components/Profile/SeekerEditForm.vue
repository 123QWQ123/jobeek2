<template>
  <form class="w-box-body" autocomplete="off" @submit.prevent="handleSubmit">
    <PageLoader v-if="isLoading" />

    <div class="input-row">
      <label>Фото</label>
      <ProfilePhotoInput
        class="photo_radius"
        name="photo"
        name_url="photo_url"
        :preview="seeker?.photo_url"
        :avatar="avatar"
      />
    </div>

    <div class="input-row">
      <label for="name">Имя и фамилия <b>*</b></label>
      <div class="input-wrapper">
        <div class="c2">
          <VeeCustomTextInput
            name="first_name"
            placeholder="Имя"
            :value="seeker?.first_name"
          />
          <VeeCustomTextInput
            name="last_name"
            placeholder="Фамилия"
            :value="seeker?.last_name"
          />
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
        <ProfilePhoneDisabledInput v-if="seeker?.phone" name="phone" />
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
        <VeeCustomTextInput name="password" placeholder="********" />
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
import { navigateTo, useAsyncData } from "#app";
import { toTypedSchema } from "@vee-validate/zod";
import avatar from "~/assets/img/jobeek-avatar.png";
import { zod } from "~/hooks/ru-zod.js";
import { ref, watch } from "vue";

// Stores и основные данные
const profileStore = useProfileStore();
const authStore = useAuthStore();
const { seeker } = storeToRefs(authStore);
const { refreshSeeker } = useAuthStore();
const { getCountries, getCities, getUser, updateSeeker } = profileStore;
const { countryOptions, cityOptions } = storeToRefs(profileStore);

// Вспомогательные реактивные переменные
const cityError = ref("");
const countryError = ref("");
const isLoading = ref(false);
const errorMessage = ref(null);
const route = useRoute();

// Загрузка списков при инициализации
useAsyncData("getCountries", () => getCountries());
useAsyncData("getCities", () =>
  getCities({ city_id: seeker?.city_id ?? undefined }),
);

// Валидация схемы
const schema = zod.object({
  first_name: zod.string().trim().min(1, "Введите имя"),
  last_name: zod.string().trim().min(1, "Введите фамилию"),
  birth_date: zod.string().trim().min(1, "Дата рождения должна быть заполнена"),
  email: zod.string().email("Введите ваш E-mail"),
  city_id: zod.number({ message: "Выберите город из списка" }),
  country_id: zod.number({ message: "Выберите страну из списка" }),
  phone: zod.string().trim().min(1),
});
const getFields = (newObject) => ({
  first_name: newObject?.first_name || "",
  last_name: newObject?.last_name || "",
  email: newObject?.email || "",
  email_to_verify: newObject?.email_to_verify || "",
  birth_date: newObject?.birth_date || "",
  city_id: newObject?.city_id,
  city_name: newObject?.city_name || "",
  photo: newObject?.photo || null,
  country_id: newObject?.country_id || 1,
  phone: newObject?.phone || "",
});
const initialValues = getFields(seeker.value);

const { values, errors, validate, setErrors, meta } = useForm({
  initialValues,
  initialTouched: true,
  validationSchema: toTypedSchema(schema),
});
const { value: country_id } = useField("country_id");
const { value: city_id, setValue: setCityId } = useField("city_id");

watch(country_id, async (val) => {
  if (!val) return;
  countryError.value = "";
  cityError.value = "";
  await getCities({ country_ids: [val] });
  setCityId(null);
});

function updateCountryInput(newValue = "") {
  countryError.value =
    !newValue || /[а-я]/i.test(newValue)
      ? ""
      : "Используйте только алфавит кириллица";
}

async function updateCityInput(newValue = "") {
  if (!newValue || /[а-я]/i.test(newValue)) {
    cityError.value = "";
    if (newValue) {
      await getCities(
        { country_ids: [country_id.value], search: newValue },
        true,
      );
    }
  } else cityError.value = "Используйте только алфавит кириллица";
}

// Универсальная подготовка данных формы
function getFormData(object) {
  const formData = new FormData();
  for (const [key, value] of Object.entries(object)) {
    formData.append(key, value instanceof File ? value : value || "");
  }
  return formData;
}

// Основной submit
const handleSubmit = async () => {
  isLoading.value = true;
  await validate();
  if (!meta.value.valid) {
    isLoading.value = false;
    return;
  }
  const formData = getFormData(values);

  // Проверки для пароля и фото
  if ("password" in values) {
    values.password != null
      ? formData.append("password_confirmation", values.password)
      : formData.delete("password");
  }
  if ("photo" in values) {
    values.photo != null
      ? formData.append("photo", values.photo)
      : formData.delete("photo");
  }
  formData.append("_method", "put");

  const resData = await updateSeeker(formData);
  isLoading.value = false;

  if (resData.status !== "success") {
    errorMessage.value = resData.message || "";
    setErrors(resData.errors || {});
    return;
  }
  await getUser();
  await refreshSeeker();
  await Swal.fire({ icon: "success", text: "Успешно сохранено" });
  navigateTo({ name: "profile" });
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

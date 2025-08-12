<script setup>
definePageMeta({
  layout: "default",
});

useHead({
  title: "Jobeek - Обратная связь",
});

import { useAuthStore } from "~~/store/auth";
import IMask from "imask";
import { useProfileStore } from "../store/profile";
import { useField, useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import { zod } from "~/hooks/ru-zod.js";

const auth = useAuthStore();
const isAuthed = computed(() => auth.isAuthed);
const router = useRouter();

const initialState = {
  phone: {
    val: "",
    isValid: true,
  },
  email: {
    val: "",
    isValid: true,
  },
  message: {
    val: "",
    isValid: true,
  },
  isFormValid: true,
  isLoading: true,
  error: null,
  success: null,
};
const state = reactive(initialState);

const zodSchema = z.object({
  phone: z
    .string()
    .length(11, "Введите полностью 11 цифр номера")
    .regex(/^\d+$/, "Некорректный формат номера"),
  email: zod.string().email(),
  message: z.string(),
});

const { validate, errors, setFieldValue, meta, setErrors, values, resetForm } =
  useForm({
    validationSchema: toTypedSchema(zodSchema),
    initialTouched: false,
    initialValues: {
      phone: "",
      email: "",
      message: "",
    },
  });

const { value: phone } = useField("phone");
const { value: email } = useField("email");
const { value: message } = useField("message");
const route = useRoute();

const profileStore = useProfileStore();
const { sendMessage } = profileStore;
async function onSubmit() {
  await validate();

  if (meta.value.valid) {
    await sendMessage({
      email: email.value,
      phone: phoneMask.value.unmaskedValue,
      message: message.value,
    });
  }
}

const phoneInputElement = ref();
const phoneMask = ref(null);
onMounted(() => {
  phoneMask.value = new IMask(phoneInputElement.value, {
    mask: "+{7}(000)000-00-00",
  });
  phoneInputElement.value.addEventListener("input", () => {
    setFieldValue("phone", phoneMask.value.unmaskedValue);
  });
});
function close() {
  state.error = null;
  state.success = null;
}
</script>

<template>
  <div class="row">
    <base-modal :show="!!state.success" title="Success" @close="close">
      <p>{{ state.success }}</p>
    </base-modal>
    <main class="" role="main">
      <div class="support-page">
        <img
          alt="#"
          src="https://jobeek.me/assets/img/Frame2.svg"
          class="auth-bg-1"
        />
        <img
          alt="#"
          src="https://jobeek.me/assets/img/ft-bg-img.png"
          class="auth-bg-2"
        />
        <div class="wrapper">
          <form class="support-form enter-form" @submit.prevent="onSubmit">
            <h1>Обратная связь</h1>
            <p>
              По всем вопросам обращайтесь на <a href="#">support@hphelp.me</a>,
              или воспользуйтесь формой
            </p>
            <div class="i-wrap">
              <input
                type="text"
                name="email"
                v-model="email"
                placeholder="Email"
              />
            </div>
            <span class="error-message" v-if="errors.email">
              {{ errors.email }}</span
            >
            <div class="note">
              <img src="~/assets/img/svg/i.svg" alt="#" />
              <p>Нужен для того что-бы мы смогли ответить вам.</p>
            </div>
            <div class="i-wrap">
              <input
                type="tel"
                ref="phoneInputElement"
                name="tel"
                placeholder="Номер телефона"
              />
            </div>
            <span class="error-message" v-if="errors.phone">
              {{ errors.phone }}</span
            >
            <div class="i-wrap">
              <textarea
                name="message"
                v-model="message"
                placeholder="Опишите суть проблемы:"
              ></textarea>
            </div>
            <span class="error-message" v-if="errors.message">
              {{ errors.message }}</span
            >
            <button class="btn button-accent" type="submit">Отправить</button>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import IMask from "imask";
import { useAuthStore } from "~~/store/auth";
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useForm, useField } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";

useHead({ title: "Регистрация" });

const authStore = useAuthStore();
const { signUp, confirmPhoneCode, signIn } = authStore;

const router = useRouter();
const route = useRoute();

const phoneInputElement = ref(null);
const phoneMask = ref(null);

const phoneDisabled = ref(false);
const isRegisterTab = ref(true);
const isConfirmTab = ref(false);
const isFirstTimeCodeSent = ref(true);
const isLoading = ref(false);
const session = ref(null);
const localSuccess = ref(null);

const zodSchema = z.object({
  phone: z
    .string()
    .length(11, "Введите полностью 11 цифр номера")
    .regex(/^\d+$/, "Некорректный формат номера"),
  i_agree: z.literal(true, {
    errorMap: () => ({ message: "Подтвердите согласие" }),
  }),
  code: z
    .optional(z.string().length(4, "Код должен содержать 4 цифры"))
    .nullable(),
  session: z.optional(z.string()),
});

const { validate, errors, setFieldValue, setErrors, values, resetForm } =
  useForm({
    validationSchema: toTypedSchema(zodSchema),
    initialTouched: false,
    initialValues: {
      phone: "",
      i_agree: false,
      code: "",
    },
  });

const { value: phone } = useField("phone");
const { value: i_agree } = useField("i_agree");
const { value: code } = useField("code");

// Маска
onMounted(() => {
  if (authStore.isAuthed) {
    router.push({
      name: authStore.isEmployer ? "profile-employer" : "profile-seeker",
    });
  }

  // Восстановление preset_phone
  const newPhone = route.query.phone;
  const localPhone = localStorage.getItem("preset_phone");
  if (newPhone) {
    localStorage.setItem("preset_phone", newPhone);
    setFieldValue("phone", newPhone.replace(/\D/g, ""));
  } else if (localPhone) {
    setFieldValue("phone", localPhone.replace(/\D/g, ""));
  }
  phoneMask.value = new IMask(phoneInputElement.value, {
    mask: "+{7}(000)000-00-00",
  });
  phoneInputElement.value.addEventListener("input", () => {
    setFieldValue("phone", phoneMask.value.unmaskedValue);
  });

  // Если поле уже заполнено
  if (phone.value) {
    phoneDisabled.value = true;
    phoneMask.value.unmaskedValue = phone.value;
  }
});

const isRegisterButton = computed(
  () =>
    !isLoading.value &&
    phone.value &&
    String(phone.value).length === 11 &&
    !errors.value.phone &&
    i_agree.value === true,
);
const isConfirmSMSButton = computed(
  () =>
    !isLoading.value &&
    code.value &&
    String(code.value).length === 4 &&
    !errors.value.code,
);

const onSubmit = async () => {
  await validate();
  isLoading.value = true;
  const response = await signUp({ phone: values.phone }, (result) => {
    if (result.status === "failed") {
      setErrors(result.errors);
    }
  });
  isLoading.value = false;

  if (response.status !== "success") {
    return;
  }
  isRegisterTab.value = false;
  isConfirmTab.value = true;
  session.value = response.data.data.session;
};

const onSMSSubmit = async () => {
  isLoading.value = true;
  const response = await confirmPhoneCode(
    {
      phone: values.phone,
      session: session.value,
      code: values.code,
      preset: phoneDisabled.value,
    },
    (result) => {
      if (result.status === "failed") {
        setErrors(result.errors);
      }
    },
  );
  isLoading.value = false;
  console.log("onSMSSubmit", response);
  if (response.status !== "success") {
    return;
  }
  if (response.data.status !== "success") {
    return;
  }
  localStorage.removeItem("preset_phone");
  await signIn({
    password: values.code,
    phone: values.phone,
  });
  router.push({
    name: authStore.isEmployer ? "profile-employer" : "profile-seeker",
  });
};

function onChangePhone() {
  isConfirmTab.value = false;
  isRegisterTab.value = true;
  setFieldValue("code", "");
}

function onSendOneMoreTime() {
  isFirstTimeCodeSent.value = false;
  onSubmit();
}

function close() {
  localSuccess.value = null;
}
</script>

<template>
  <div>
    <main class="main enter-page sign-up" role="main">
      <div class="enter-page-content">
        <NuxtLink to="/" class="logo">
          <img src="~/assets/img/jobeek-dark.svg" alt="#" />
        </NuxtLink>
        <form
          class="enter-form"
          @submit.prevent="onSubmit"
          v-show="isRegisterTab"
        >
          <h1>Регистрация</h1>
          <div class="i-wrap">
            <input
              :disabled="phoneDisabled"
              type="tel"
              name="tel"
              ref="phoneInputElement"
              placeholder="Номер телефона"
            />
          </div>
          <span class="error-message" v-if="errors.phone">
            {{ errors.phone }}</span
          >
          <div class="help-box">
            <div
              class="check-block"
              :class="{ 'border-bottom border-danger': errors.i_agree }"
            >
              <div class="checkbox">
                <input
                  type="checkbox"
                  id="i_agree"
                  name="i_agree"
                  v-model="i_agree"
                />
                <div class="checkbox-mask">
                  <img src="~/assets/img/svg/check.svg" alt="#" />
                </div>
              </div>
              <label for="i_agree"
                >Согласен с
                <a href="#">правилами обработки персональных данных</a>
              </label>
            </div>
          </div>
          <button
            class="btn button-accent"
            type="submit"
            :disabled="!isRegisterButton"
          >
            Зарегистрироваться
            <Loader class="text-light spinner-border-sm" v-if="isLoading" />
          </button>
        </form>
        <form
          class="enter-form phone-register"
          @submit.prevent="onSMSSubmit"
          v-show="isConfirmTab"
        >
          <h1>Подтвердите телефон</h1>
          <div class="note">
            <img src="~/assets/img/svg/i.svg" alt="#" />
            <p class="">
              <span v-if="isFirstTimeCodeSent">
                Мы вам отправили код подтверждения на телефон
              </span>
              <span v-else>
                Мы вам еще раз отправили код подтверждения на телефон
              </span>
              <span class="text-success">{{ phone.val }}.</span>
              <a href="#" class="fw-medium" @click.prevent="onChangePhone">
                Изменить номер
              </a>
            </p>
          </div>
          <div class="i-wrap">
            <input
              type="text"
              name="code"
              maxlength="4"
              placeholder="SMS-код"
              v-model="code"
            />
            <div class="note error-message" v-if="errors.code">
              <img src="~/assets/img/svg/i.svg" alt="#" />
              <p>
              {{ errors.code }}
              </p>
            </div>
          </div>
          <button
            class="btn button-accent mt-4"
            type="submit"
            :disabled="!isConfirmSMSButton"
          >
            Подтвердить
            <Loader class="text-light spinner-border-sm" v-if="isLoading" />
          </button>
          <span class="col-auto px-3" type="button" disabled>
            Не получили код?
            <a
              class="link link-primary"
              @click.prevent="onSendOneMoreTime"
              v-if="!isFirstTimeCodeSent"
            >
              Отправить еще раз
            </a>
          </span>
        </form>
        <div class="f-prompt">
          Уже есть аккаунт?
          <NuxtLink :to="{ name: 'sign-in' }">Войдите!</NuxtLink>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
input:disabled {
  background-color: #e5e5e5;
}
.phone-register .note {
  margin-bottom: 16px;
}
</style>

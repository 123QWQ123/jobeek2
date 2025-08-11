<script setup>
import Swal from "sweetalert2";
import { useAuthStore } from "~~/store/auth";
import IMask from "imask";
import { navigateTo } from "nuxt/app";
import { ref } from "vue";

definePageMeta({
  layout: "custom",
});
useHead({
  title: "Jobeek - Восстановление пароля",
});

const authStore = useAuthStore();

const { recoverPasswordCode } = authStore;

const isAuthed = computed(() => authStore.isAuthed);

const isFormValid = ref(true);
const isLoading = ref(false);
const error = ref(null);
onBeforeMount(() => {
  if (isAuthed.value) {
    router.replace({ name: "profile" });
  }
});
const state = reactive({
  phone: {
    val: "",
    isValid: true,
  },
  code: {
    val: null,
    isValid: true,
  },
  password: {
    val: null,
    isValid: true,
  },
  password_confirmation: {
    val: null,
    isValid: true,
  },
  token: null,
  isFormValid: true,
  error: null,
  success: null,
});

watch(
  () => state.code.val,
  (newValue) => {
    if (newValue && String(newValue).length !== 4) {
      state.code.isValid = false;
      return;
    }
    state.code.isValid = true;
  },
);

const isConfirmSMSButton = computed(() => {
  if (isLoading.value) return false;
  if (state.code.val) {
    return String(state.code.val).length === 4;
  }
  return false;
});
const phoneInputElement = ref();
const phoneMask = ref(null);
onMounted(() => {
  phoneMask.value = new IMask(phoneInputElement.value, {
    mask: "+{7}(000)000-00-00",
  });
  phoneInputElement.value.addEventListener("input", () => {
    state.phone.val = phoneMask.value.unmaskedValue;
  });
});

function clearValidity(input) {
  state[input].isValid = true;
  state.isFormValid = true;
}

function validateForm() {
  if (state.phone.val === "") {
    state.phone.isValid = false;
    state.isFormValid = false;
  }
}

const router = useRouter();

const tabs = reactive({
  isRegisterTab: true,
  isConfirmTab: false,
  isResetTab: false,
});

const onSubmit = async () => {
  validateForm();
  if (!state.isFormValid) {
    Swal.fire({
      title: "Ошибка!",
      text: "Неправильные данные ввели.",
      icon: "error",
      confirmButtonText: "ОК",
    });
    return;
  }
  isLoading.value = true;
  state.phone.val = phoneMask.value.unmaskedValue;

  const response = await sendRecoveryCode({
    phone: state.phone.val,
  });

  isLoading.value = false;
  if (response.status !== "success") {
    if (response.data && "errors" in response.data) {
      Swal.fire({
        title: "Ошибка!",
        text: response.data.errors.phone[0],
        icon: "error",
        confirmButtonText: "ОК",
      });
    } else {
      Swal.fire({
        title: "Ошибка!",
        text: response.data.message,
        icon: "error",
        confirmButtonText: "ОК",
      });
    }
    return;
  }

  state.token = response.data.token;
  tabs.isConfirmTab = true;
  tabs.isRegisterTab = false;
  tabs.isResetTab = false;
  isLoading.value = false;
};

const { sendRecoveryCode } = authStore;
const onSMSSubmit = async () => {
  isLoading.value = true;
  const response = await recoverPasswordCode({
    phone: state.phone.val,
    code: state.code.val,
    token: state.token,
  });
  isLoading.value = false;

  if (response.status !== "success") {
    if ("errors" in response && response.message) {
      Swal.fire({
        title: "Ошибка!",
        text: response.data.message,
        icon: "error",
        confirmButtonText: "ОК",
      });
    } else {
      Swal.fire({
        title: "Ошибка!",
        text: response.data.message,
        icon: "error",
        confirmButtonText: "ОК",
      });
    }
    isLoading.value = false;
    return;
  }

  state.token = response.data.token;
  tabs.isConfirmTab = false;
  tabs.isRegisterTab = false;
  tabs.isResetTab = true;
  isLoading.value = false;
};
//
const { resetPassword } = authStore;
const onPasswordSubmit = async () => {
  isLoading.value = true;
  const response = await resetPassword({
    phone: state.phone.val,
    code: state.code.val,
    token: state.token,
    password: state.password.val,
    password_confirmation: state.password_confirmation.val,
  });

  isLoading.value = false;

  if (response.status !== "success") {
    if ("errors" in response && response.message) {
      Swal.fire({
        title: "Ошибка!",
        text: response.message,
        icon: "error",
        confirmButtonText: "ОК",
      });
    } else {
      Swal.fire({
        title: "Ошибка!",
        text: response.data.message,
        icon: "error",
        confirmButtonText: "ОК",
      });
    }
    return;
  }
  navigateTo({
    name: "sign-in",
    query: {
      message: JSON.stringify({
        type: "info",
        text: response.message,
      }),
    },
  });
};

const isFirstTimeCodeSent = ref(true);
const onSendOneMoreTime = () => {
  isFirstTimeCodeSent.value = false;
  onSubmit();
};

function close() {
  state.error = null;
}
</script>

<template>
  <div class="row">
    <base-modal
      :show="!!state.error"
      title="Error occured"
      :type="'error'"
      @close="close"
    >
      <p>{{ state.error }}</p>
    </base-modal>

    <base-modal :show="!!state.success" title="Success" @close="close">
      <p>{{ state.success }}</p>
    </base-modal>
    <main class="main enter-page sign-up" role="main">
      <div class="enter-page-content">
        <NuxtLink to="/" class="logo"
          ><img src="~/assets/img/jobeek-dark.svg" alt="#"
        /></NuxtLink>
        <form
          class="enter-form"
          v-if="tabs.isRegisterTab"
          @submit.prevent="onSubmit"
        >
          <h1>{{ title }}</h1>
          <div class="i-wrap">
            <input
              type="tel"
              ref="phoneInputElement"
              name="tel"
              placeholder="Номер телефона"
              @focusout="clearValidity('phone')"
            />
          </div>
          <button class="btn button-accent" type="submit">
            Отправить
            <Loader class="text-light spinner-border-sm" v-if="isLoading" />
          </button>
        </form>
        <form
          v-else-if="tabs.isConfirmTab"
          class="enter-form"
          @submit.prevent="onSMSSubmit"
        >
          <div class="i-wrap">
            <div class="note" v-if="isFirstTimeCodeSent">
              <img src="~/assets/img/svg/i.svg" alt="#" />
              <p>
                На номер +{{ state.phone.val }} отправлен код восстановления
                пароля.
              </p>
            </div>
            <div class="note" v-else>
              <img src="~/assets/img/svg/i.svg" alt="#" />
              <p>
                На номер +{{ state.phone.val }} повторно отправлен код
                восстановления пароля.
              </p>
            </div>

            <input
              class="mt-2"
              type="number"
              name="code"
              v-model="state.code.val"
              placeholder="Код потверждения"
              @focusout="clearValidity('code')"
            />
            <span v-if="!state.code.isValid" class="text text-danger">
              Введите 4 значный код подтверждения
            </span>
            <span class="col-auto px-3" type="button" disabled>
              Не получили код?
              <a class="link link-primary" @click="onSendOneMoreTime">
                Отправить еще раз
              </a>
            </span>
          </div>
          <button
            class="btn button-accent"
            type="submit"
            :disabled="!isConfirmSMSButton"
          >
            Подтвердить
            <Loader class="text-light spinner-border-sm" v-if="isLoading" />
          </button>
        </form>
        <form
          v-else-if="tabs.isResetTab"
          class="enter-form"
          @submit.prevent="onPasswordSubmit"
        >
          <div class="i-wrap">
            <input
              type="password"
              name="password"
              v-model="state.password.val"
              placeholder="Пароль"
              @focusout="clearValidity('password')"
            />
          </div>
          <div class="i-wrap">
            <input
              type="password"
              name="password_confirmation"
              v-model="state.password_confirmation.val"
              placeholder="Повторите пароль"
              @focusout="clearValidity('password_confirmation')"
            />
          </div>
          <div class="note">
            <img src="~/assets/img/svg/i.svg" alt="#" />
            <p>Устаноните новый пароль для аккаунта +{{ state.phone.val }}</p>
          </div>
          <button class="btn button-accent" type="submit">
            Подтвердить
            <Loader class="text-light spinner-border-sm" v-if="isLoading" />
          </button>
        </form>
        <div class="f-prompt">
          Хотите войти?
          <NuxtLink :to="{ name: 'sign-in' }">Войдите!</NuxtLink>
        </div>
      </div>
    </main>
  </div>
</template>

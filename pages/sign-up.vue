<script setup>
import Swal from "sweetalert2";
import IMask from "imask";
import { useAuthStore } from "~~/store/auth";
import { ref } from "vue";

definePageMeta({
  layout: "custom",
});
useHead({
  title: "Регистрация",
});

const authStore = useAuthStore();

const { signUp, confirmPhoneCode, tryLogin } = authStore;

const isAuthed = computed(() => authStore.isAuthed);

const phoneDisabled = ref(false);
const isFormValid = ref(true);
const isLoading = ref(false);
const registerButtonDisabled = ref(false);
const error = ref(null);

const route = useRoute();
onBeforeMount(() => {
  const newPhone = route.query.phone;
  let localPhone = localStorage.getItem("preset_phone");

  if (newPhone) {
    localPhone = newPhone;
    localStorage.setItem("preset_phone", newPhone);
    state.phone.val = route.query.phone;
  } else {
    if (localPhone) {
      state.phone.val = localPhone;
      localStorage.setItem("preset_phone", route.query.phone);
    }
  }

  if (isAuthed.value === true) {
    if (!auth.isEmployer) {
      navigateTo({ name: "profile-seeker" });
    } else {
      navigateTo({ name: "profile-employer" });
    }
  }
});
const state = reactive({
  disabled: {
    val: "",
    isValid: true,
  },
  phone: {
    val: "",
    isValid: true,
  },
  i_agree: {
    val: false,
    isValid: true,
  },
  code: {
    val: null,
    isValid: true,
  },
  session: null,
  isFormValid: true,
  error: null,
  success: null,
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
  if (state.i_agree.val !== true) {
    state.i_agree.isValid = false;
    state.isFormValid = false;
  }

  if (state.phone.val !== null && state.i_agree.val === true) {
    state.i_agree.isValid = true;
    state.isFormValid = true;
  }
}

const router = useRouter();

const isRegisterTab = ref(true);
const isConfirmTab = ref(false);
const isFirstTimeCodeSent = ref(true);

const onSubmit = async () => {
  state.phone.val = phoneMask.value.unmaskedValue;
  validateForm();
  if (state.isFormValid) {
    isLoading.value = true;

    const response = await signUp({
      phone: state.phone.val,
    });

    if (response.status !== "success") {
      let responseMessage = "Unknown error";
      if (response) {
        if (
          response.data &&
          "errors" in response.data &&
          response.data.message
        ) {
          responseMessage = response.data.message;
          state.error = response.data.errors.phone[0];
        } else {
          responseMessage = response.message;
        }
      }

      Swal.fire({
        title: "Ошибка!",
        text: responseMessage,
        icon: "error",
        confirmButtonText: "ОК",
      });
      isLoading.value = false;

      return;
    }
    isConfirmTab.value = true;
    isRegisterTab.value = false;
    state.session = response.data.data.session;
    isLoading.value = false;
  }
};

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
const isRegisterButton = computed(() => {
  if (isLoading.value) return false;
  if (state.phone.val) {
    return String(state.phone.val).length === 11;
  }
  return false;
});
const onChangePhone = () => {
  isConfirmTab.value = false;
  isRegisterTab.value = true;
};
const onSendOneMoreTime = () => {
  isFirstTimeCodeSent.value = false;
  onSubmit();
};

const onSMSSubmit = async () => {
  isLoading.value = true;

  const response = await confirmPhoneCode({
    phone: state.phone.val,
    session: state.session,
    code: state.code.val,
    preset: phoneDisabled.value,
  });
  if (response.status !== "success") {
    let message = "Неизвестная ошибка!";
    if (response && response.hasOwnProperty("message")) {
      message = response.message;
    }
    Swal.fire({
      title: "Ошибка!",
      text: message,
      icon: "error",
      confirmButtonText: "ОК",
    });
    isLoading.value = false;
    return;
  }
  isLoading.value = false;
  await localStorage.removeItem("preset_phone");

  const tryLoginData = await tryLogin(response.data.token);
  if (!tryLoginData) {
    let message = "Неизвестная ошибка!";
    Swal.fire({
      title: "Ошибка!",
      text: message,
      icon: "error",
      confirmButtonText: "ОК",
    });
    return navigateTo({ name: "sign-in" });
  }

  if (!auth.isEmployer) {
    navigateTo({ name: "profile-seeker" });
  } else {
    navigateTo({ name: "profile-employer" });
  }
};

function close() {
  state.error = null;
}

const phoneInputElement = ref();

function validatePhoneNumber(phoneNumber) {
  const phoneNumberPattern = /^\+7\(\d{3}\)\d{3}-\d{2}-\d{2}$/;
  return phoneNumberPattern.test(phoneNumber);
}

onUpdated(() => {
  if (phoneInputElement.value) {
    phoneMask.value = new IMask(phoneInputElement.value, {
      mask: "+{7}(000)000-00-00",
    });
    phoneInputElement.value.addEventListener("input", () => {
      state.phone.val = phoneMask.value.unmaskedValue;
    });
    phoneMask.value.unmaskedValue = state.phone.val;
  }
});
const phoneMask = ref(null);
onMounted(() => {
  phoneMask.value = new IMask(phoneInputElement.value, {
    mask: "+{7}(000)000-00-00",
  });
  phoneInputElement.value.addEventListener("input", () => {
    state.phone.val = phoneMask.value.unmaskedValue;
  });
  if (state.phone.val) {
    phoneDisabled.value = true;
    phoneMask.value.unmaskedValue = state.phone.val;
  }
});
</script>

<template>
  <div>
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
        <NuxtLink to="/" class="logo">
          <img src="~/assets/img/jobeek-dark.svg" alt="#"
        /></NuxtLink>
        <form
          class="enter-form"
          @submit.prevent="onSubmit"
          v-if="isRegisterTab"
        >
          <h1>Регистрация</h1>
          <div class="i-wrap">
            <input
              :disabled="phoneDisabled"
              type="tel"
              name="tel"
              ref="phoneInputElement"
              placeholder="Номер телефона"
              @focusout="clearValidity('phone')"
              autofocus
            />
          </div>
          <div class="help-box">
            <div
              class="check-block"
              :class="{ 'border-bottom border-danger': !state.i_agree.isValid }"
            >
              <div class="checkbox">
                <input
                  type="checkbox"
                  id="agree"
                  v-model="state.i_agree.val"
                  @focusout="clearValidity('i_agree')"
                  autofocus
                />
                <div class="checkbox-mask">
                  <img src="~/assets/img/svg/check.svg" alt="#" />
                </div>
              </div>
              <label for="agree"
                >Согласен с
                <a href="#">правилами обработки персональных данных</a></label
              >
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
          v-if="isConfirmTab"
          class="enter-form"
          @submit.prevent="onSMSSubmit"
        >
          <h1>Потверждения телефона</h1>
          <div class="i-wrap">
            <div class="note">
              <img src="~/assets/img/svg/i.svg" alt="#" />
              <p class="">
                <span v-if="isFirstTimeCodeSent">
                  Мы вам отправили код потверждения на телефон
                </span>
                <span v-else>
                  Мы вам еще раз отправили код потверждения на телефон
                </span>
                <span class="text-success">{{ state.phone.val }}.</span>
                <a href="#" class="fw-medium" @click.prevent="onChangePhone">
                  Изменить номер
                </a>
              </p>
            </div>
            <input
              class="mt-2"
              type="number"
              name="code"
              v-model="state.code.val"
              placeholder="Код потверждения"
              @focusout="clearValidity('code')"
              autofocus
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
            class="btn button-accent mt-4"
            type="submit"
            :disabled="!isConfirmSMSButton"
          >
            Подтвердить
            <Loader class="text-light spinner-border-sm" v-if="isLoading" />
          </button>
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
</style>

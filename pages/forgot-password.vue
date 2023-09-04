<script setup>
import Swal from "sweetalert2";

definePageMeta({
  layout: 'custom',
})
const title = ref("Востановление пароля");
useHead({
  title: title,
});
import { useAuthStore } from "~~/store/auth";
import IMask from "imask";
import {navigateTo} from "nuxt/app";

const authStore = useAuthStore();

const { recoverPasswordCode } = authStore;

const isAuthed = computed(() => authStore.isAuthed);

const isFormValid = ref(true);
const isLoading = ref(true);
const error = ref(null);
onBeforeMount(() => {
  if (isAuthed.value === true) {
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


const phoneInputElement = ref();
const phoneMask = ref(null);
onMounted(( ) => {
  phoneMask.value = new IMask(phoneInputElement.value, {
    mask: "+{7}(000)000-00-00",
  });
  phoneInputElement.value.addEventListener("input", () => {});
})

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
})

// watch(isConfirmTab, () => {
//   title.value = "Потверждения телефона";
// })

const onSubmit = async () => {
  // console.log(isFormValid.value, state.i_agree);
  validateForm();
  if (state.isFormValid) {
    state.phone.val = phoneMask.value.unmaskedValue;

    const response = await sendRecoveryCode({
      phone: state.phone.val,
    });

    if (response.status === 'success'){
      state.token = response.data.token;
      tabs.isConfirmTab = true;
      tabs.isRegisterTab = false;
      tabs.isResetTab = false;
    }else{
      if (response.data && 'errors' in response.data) {
        Swal.fire({
          title: 'Ошибка!',
          text: response.data.errors.phone[0],
          icon: "error",
          confirmButtonText: 'ОК'
        });
      } else {
        Swal.fire({
          title: 'Ошибка!',
          text: response.data.message,
          icon: "error",
          confirmButtonText: 'ОК'
        });
      }
    }
  }
};

const {sendRecoveryCode} = authStore;
const onSMSSubmit = async () => {
  console.log(state.code.val);
  const response = await recoverPasswordCode({
    phone: state.phone.val,
    code: state.code.val,
    token: state.token,
  });

  console.log(response);
  if (response.status === 'success'){
    state.token = response.data.token;
    console.log(response.data.token);
    tabs.isConfirmTab = false;
    tabs.isRegisterTab = false;
    tabs.isResetTab = true;
    // isRegisterTab.value = false;
  }else{
    if ( 'errors' in response && response.message) {
      Swal.fire({
        title: 'Ошибка!',
        text: response.data.message,
        icon: "error",
        confirmButtonText: 'ОК'
      });
    } else {
      Swal.fire({
        title: 'Ошибка!',
        text: response.data.message,
        icon: "error",
        confirmButtonText: 'ОК'
      });
    }
  }
};
//
const {resetPassword} = authStore;
const onPasswordSubmit = async () => {
  const response = await resetPassword({
    phone: state.phone.val,
    code: state.code.val,
    token: state.token,
    password: state.password.val,
    password_confirmation: state.password_confirmation.val,
  });

  console.log(response);
  if (response.status === 'success'){
    navigateTo({name: 'sign-in'})
  }else{
    if ( 'errors' in response && response.message) {
      Swal.fire({
        title: 'Ошибка!',
        text: response.data.message,
        icon: "error",
        confirmButtonText: 'ОК'
      });
    } else {
      Swal.fire({
        title: 'Ошибка!',
        text: response.data.message,
        icon: "error",
        confirmButtonText: 'ОК'
      });
    }
  }
};


function close(){
  state.error = null;
}
</script>

<template>
  <div class="row">
    <base-modal :show="!!state.error" title="Error occured" :type="'error'" @close="close">
      <p>{{ state.error }}</p>
    </base-modal>

    <base-modal :show="!!state.success" title="Success" @close="close">
      <p>{{ state.success }}</p>
    </base-modal>
    <main class="main enter-page sign-up" role="main">
      <div class="enter-page-content">
        <NuxtLink to="/" class="logo"> <img src="~/assets/img/jobeek-dark.svg" alt="#"></NuxtLink>
        <form class="enter-form" v-if="tabs.isRegisterTab">
          <h1>{{ title }}</h1>
          <div class="i-wrap">
            <input type="tel" ref="phoneInputElement" name="tel" v-model="state.phone.val" placeholder="Номер телефона" @focusout="clearValidity('phone')">

          </div>
          <button class="btn button-accent" type="button" @click="onSubmit">Отправить</button>
        </form>
        <form v-else-if="tabs.isConfirmTab" class="enter-form" >
          <div class="i-wrap">
            <input type="number" name="code" v-model="state.code.val" placeholder="Код потверждения" @focusout="clearValidity('code')">
          </div>
          <div class="note">
            <img src="~/assets/img/svg/i.svg" alt="#">
            <p>На номер +{{state.phone.val}} отправлен код восстановления пароля.</p>
          </div>
          <button class="btn button-accent" type="button" @click="onSMSSubmit">Подтвердить</button>
        </form>
        <form v-else-if="tabs.isResetTab" class="enter-form" >
          <div class="i-wrap">
            <input type="password" name="password" v-model="state.password.val" placeholder="Пароль" @focusout="clearValidity('password')">
          </div>
          <div class="i-wrap">
            <input type="password" name="password_confirmation" v-model="state.password_confirmation.val" placeholder="Повторите пароль" @focusout="clearValidity('password_confirmation')">
          </div>
          <div class="note">
            <img src="~/assets/img/svg/i.svg" alt="#">
            <p>Устаноните новый пароль для аккаунта +{{state.phone.val}}</p>
          </div>
          <button class="btn button-accent" type="button" @click="onPasswordSubmit">Подтвердить</button>
        </form>
        <div class="f-prompt">Хотите войти? <NuxtLink :to="{name: 'sign-in'}">Войдите!</NuxtLink>  </div>
      </div>
    </main>

  </div>
</template>
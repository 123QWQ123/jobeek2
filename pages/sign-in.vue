<script setup>
import Swal from "sweetalert2";

definePageMeta({
  layout: 'custom',
});

useHead({
  title: "Авторизация",
})

import { useAuthStore } from "~~/store/auth";
import IMask from "imask";

const auth = useAuthStore();
const isAuthed = computed(() => auth.isAuthed);
const { signIn } = auth;
const router = useRouter();

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
  password: {
    val: "",
    isValid: true,
  },
  remember_me: {
    val: false,
    isValid: true,
  },
  isFormValid: true,
  isLoading: true,
  error: null,
  success: null,
});

function clearValidity(input) {
  console.log(input)
  console.log(state);
  state[input].isValid = true;
  state.isFormValid = true;
}

function validateForm() {
  if (state.phone.val === "") {
    state.phone.isValid = false;
    state.isFormValid = false;
  }
  if (state.password.val === "" || state.password.val.length < 1) {
    state.password.isValid = false;
    state.isFormValid = false;
  }
  if ( !(state.remember_me.val === false  || state.remember_me.val === true)) {
    state.remember_me.isValid = false;
    state.isFormValid = false;
  }
}

const route = useRoute();

async function onSubmit() {
  validateForm();
  if (state.isFormValid) {
    let response;
    try {
        response = await signIn({
        phone: phoneMask.value.unmaskedValue,
        password: state.password.val,
      });

    }catch (error) {
      state.error = error.message;
    }
    if (response.status === 'error' && response.message) {
      Swal.fire({
        title: 'Ошибка!',
        text: response.message,
        icon: "error",
        confirmButtonText: 'ОК'
      });
      return;
    }
    const route_name = route.query.redirect;
    setTimeout(() => {
      if (route_name) {
        router.replace({ name: route_name });
      } else {
        router.replace({ name: "profile" });
      }
    });
  }

}

const phoneInputElement = ref();
const phoneMask = ref(null);
onMounted(( ) => {
  phoneMask.value = new IMask(phoneInputElement.value, {
    mask: "+{7}(000)000-00-00",
  });
  phoneInputElement.value.addEventListener("input", () => {});
})
function close(){
  state.error = null;
  state.success = null;
}
</script>

<template>
  <div class="row">
<!--    <base-modal :show="!!state.error" title="Error occured" :type="'error'" @close="close">-->
<!--      <p>{{ state.error }}</p>-->
<!--    </base-modal>-->

    <base-modal :show="!!state.success" title="Success" @close="close">
      <p>{{ state.success }}</p>
    </base-modal>
    <main class="main enter-page sign-in" role="main">
      <div class="enter-page-content">
        <NuxtLink to="/" class="logo"> <img src="~/assets/img/jobeek-dark.svg" alt="#"></NuxtLink>
        <form class="enter-form" @submit.prevent="onSubmit">
          <h1>Вход</h1>
          <div class="i-wrap has-validation">
            <input ref="phoneInputElement" type="tel" name="tel" placeholder="Номер телефона" v-model="state.phone.val" @focusout="clearValidity('phone')" />
            <div :style="{display: 'none'}" class="text-danger" :class="{'d-block': !state.phone.isValid}">
              Введите правильный номер телефона
            </div>
          </div>
          <div class="i-wrap">
            <input type="password" name="pass" placeholder="Пароль" v-model="state.password.val" @focusout="clearValidity('password')" />
            <div :style="{display: 'none'}" class="text-danger" :class="{'d-block': !state.password.isValid}">
              Введите правильный пароль
            </div>
          </div>
          <div class="note"> <img src="~/assets/img/svg/i.svg" alt="#">
            <p>Если вы не устанавливали пароль, используйте SMS код который получили на телефон во время активации.</p>
          </div>
          <div class="help-box">
            <div class="check-block">
              <div class="checkbox">
                <input type="checkbox" id="remember_me"  v-model="state.remember_me.val" />
                <div class="checkbox-mask"><img src="~/assets/img/svg/check.svg" alt="#"></div>
              </div>
              <label for="agree">Запомнить меня</label>
            </div>
            <NuxtLink :to="{name: 'forgot-password'}">Забыли пароль?</NuxtLink>
          </div>
          <button class="btn button-accent" type="submit">Войти</button>
        </form>
        <div class="f-prompt">Еще нет аккаунта? <NuxtLink :to="{name: 'sign-up'}">Зарегистрируйтесь!</NuxtLink></div>
      </div>
    </main>
  </div>
</template>
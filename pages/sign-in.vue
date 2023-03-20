<script setup>
definePageMeta({
  layout: 'custom',
  middleware: ["guest"]
});

useHead({
  title: "Авторизация",
})

import { useAuthStore } from "~~/store/auth";

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
    const response = await signIn({
      phone: state.phone.val,
      password: state.password.val,
      remember_me: state.remember_me.val,
    });
    console.log(response);
    if (response.errors && response.message) {
      state.error = response.message;
      return;
    }
    const route_name = route.query.redirect;
    state.success = "You signed in";
    setTimeout(() => {
      if (route_name) {
        router.replace({ name: route_name });
      } else {
        router.replace({ name: "profile" });
      }
    });
  }

}

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
    <main class="main enter-page sign-in" role="main">
      <div class="enter-page-content">
        <NuxtLink to="/" class="logo"> <img src="~/assets/img/jobeek-dark.svg" alt="#"></NuxtLink>
        <form class="enter-form" @submit.prevent="onSubmit">
          <h1>Вход</h1>
          <div class="i-wrap has-validation">
            <input type="tel" name="tel" placeholder="Номер телефона" v-model="state.phone.val" @focusout="clearValidity('phone')" />
            <div :style="{display: 'none'}" class="text-danger" :class="{'d-block': !state.phone.isValid}">
              Enter a valid phone
            </div>
          </div>
          <div class="i-wrap">
            <input type="password" name="pass" placeholder="Пароль" v-model="state.password.val" @focusout="clearValidity('password')" />
            <div :style="{display: 'none'}" class="text-danger" :class="{'d-block': !state.password.isValid}">
              Enter a valid phone
            </div>
          </div>
          <div class="note"> <img src="~/assets/img/svg/i.svg" alt="#">
            <p>Если вы не устанавливали пароль, используйте SMS код который получили на телефон во время активации.</p>
          </div>
          <div class="help-box">
            <div class="check-block">
              <div class="checkbox">
                <input type="checkbox" id="remember_me"  v-model="state.remember_me" />
                <div class="checkbox-mask"><img src="~/assets/img/svg/check.svg" alt="#"></div>
              </div>
              <label for="agree">Запомнить меня</label>
            </div>  <a href="#">Забыли пароль?       </a>
          </div>
          <button class="btn button-accent" type="submit">Войти</button>
        </form>
        <div class="f-prompt">Еще нет аккаунта? <NuxtLink :to="{name: 'sign-up'}">Зарегистрируйтесь!</NuxtLink></div>
      </div>
    </main>
  </div>
</template>
<script setup>
definePageMeta({
  layout: 'custom',
})
import { useAuthStore } from "~~/store/auth";

const authStore = useAuthStore();

const { signUp } = authStore;

const isFormValid = ref(true);
const isLoading = ref(true);
const error = ref(null);

const state = reactive({
  phone: {
    val: "",
    isValid: true,
  },
  i_agree: {
    val: false,
    isValid: true,
  },

});

function clearValidity(input) {
  state[input].isValid = true;
  isFormValid.value = true;
}

function validateForm() {
  if (state.phone.val === "") {
    state.phone.isValid = false;
    isFormValid.value = false;
  }
  if (state.i_agree.val !== true) {
    state.i_agree.isValid = false;
    isFormValid.value = false;
  }
}

const router = useRouter();

const onSubmit = async () => {
  console.log(state.i_agree);
  validateForm();
  if (isFormValid.value) {
    const response = await signUp({
      phone: state.phone.val,
      i_agree: state.i_agree.val,
    });

    if (response.error && response.message) {
      this.error = response.message;
    } else {
      router.replace({ name: "profile" });
    }
  }
};
</script>

<template>
  <div class="row">
    <base-modal :show="!!error" title="Error occured">
      <p>{{ error }}</p>
    </base-modal>
    <main class="main enter-page sign-up" role="main">
      <div class="enter-page-content">
        <NuxtLink to="/" class="logo"> <img src="~/assets/img/jobeek-dark.svg" alt="#"></NuxtLink>
        <form class="enter-form" @submit.prevent="onSubmit">
          <h1>Регистрация</h1>
          <div class="i-wrap">
            <input type="tel" name="tel" placeholder="Номер телефона" @focusout="clearValidity('phone')">
          </div>
          <div class="help-box">
            <div class="check-block " :class="{ 'border-bottom border-danger': !state.i_agree.isValid }">
              <div class="checkbox">
                <input type="checkbox" id="agree" v-model="state.i_agree.val" @focusout="clearValidity('i_agree')">
                <div class="checkbox-mask"><img src="~/assets/img/svg/check.svg" alt="#"></div>
              </div>
              <label for="agree">Согласен с <a href="#">правилами обработки персональных данных</a></label>
            </div>
          </div>
          <button class="btn button-accent" type="submit">Зарегистрироваться</button>
        </form>
        <div class="f-prompt">Уже есть аккаунт? <NuxtLink :to="{name: 'sign-in'}">Войдите!</NuxtLink>  </div>
      </div>
    </main>

  </div>
</template>
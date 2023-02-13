<script setup>
import Swal from "sweetalert2";

definePageMeta({
  layout: 'custom',
  middleware: ["guest"]
})
useHead({
  title: "Регистрация",
});
import { useAuthStore } from "~~/store/auth";

const authStore = useAuthStore();

const { signUp, confirmConfirmationCode } = authStore;

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
  console.log(state);
}

const router = useRouter();

const isRegisterTab = ref(true);
const isConfirmTab = ref(false);

const onSubmit = async () => {
  // console.log(isFormValid.value, state.i_agree);
  validateForm();
  if (state.isFormValid) {
    console.log(1);
    const response = await signUp({
      phone: state.phone.val,
      i_agree: state.i_agree.val,
    });

    if (response.status === 'success'){
      isConfirmTab.value = true;
      isRegisterTab.value = false;
      state.session = response.data.session;
    }else{
      if ( 'errors' in response && response.message) {
        state.error = response.errors.phone[0];
      } else {
        state.error = response.message;
      }
    }
  }
};

const onSMSSubmit = async () => {
  const response = await confirmConfirmationCode({
    phone: state.phone.val,
    session: state.session,
    code: state.code.val,
  });

  console.log(response);
  if (response.status === 'success'){
    navigateTo({name: 'sign-in'});
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
        <form class="enter-form" @submit.prevent="onSubmit" v-if="isRegisterTab">
          <h1>Регистрация</h1>
          <div class="i-wrap">
            <input type="tel" name="tel" v-model="state.phone.val" placeholder="Номер телефона" @focusout="clearValidity('phone')">
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
        <form v-if="isConfirmTab" class="enter-form" @submit.prevent="onSMSSubmit" >
          <h1>Регистрация</h1>
          <div class="i-wrap">
            <input type="number" name="code" v-model="state.code.val" placeholder="Код потверждения" @focusout="clearValidity('code')">
          </div>
          <button class="btn button-accent" type="submit">Подтвердить</button>
        </form>
        <div class="f-prompt">Уже есть аккаунт? <NuxtLink :to="{name: 'sign-in'}">Войдите!</NuxtLink>  </div>
      </div>
    </main>

  </div>
</template>
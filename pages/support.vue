<script setup>
import Swal from "sweetalert2";

definePageMeta({
  layout: 'default',
});

useHead({
  title: "Обратная связь",
})

import { useAuthStore } from "~~/store/auth";
import IMask from "imask";

const auth = useAuthStore();
const isAuthed = computed(() => auth.isAuthed);
const { signIn } = auth;
const router = useRouter();

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
    <base-modal :show="!!state.success" title="Success" @close="close">
      <p>{{ state.success }}</p>
    </base-modal>
    <main class="main enter-page sign-in" role="main">
      <div class="support-page">
        <img alt="#" src="https://jobeek.me/assets/img/Frame2.svg" class="auth-bg-1">
        <img alt="#" src="https://jobeek.me/assets/img/ft-bg-img.png" class="auth-bg-2">
        <div class="wrapper">
          <form class="support-form enter-form" action="">
            <h1>Обратная связь</h1>
            <p>По всем вопросам обращайтесь на <a href="#">support@hphelp.me</a>, или воспользуйтесь формой</p><div class="i-wrap">
            <input type="text" name="email" placeholder="Email">
          </div>
            <div class="note"> <img src="~/assets/img/svg/i.svg" alt="#">
              <p>Нужен для того что-бы мы смогли ответить вам.</p>
            </div>
            <div class="i-wrap">
              <input type="tel" name="tel" placeholder="Номер телефона">
            </div>
            <div class="i-wrap">
              <textarea name="problem" placeholder="Опишите суть проблемы:"></textarea></div>
            <button class="btn button-accent" type="submit">Отправить</button>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>
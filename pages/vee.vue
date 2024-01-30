<script setup>
import Swal from "sweetalert2";

definePageMeta({
  layout: "default",
});

useHead({
  title: "Обратная связь",
});

import { useAuthStore } from "~~/store/auth";
import IMask from "imask";
import { useProfileStore } from "../store/profile";

const auth = useAuthStore();
const isAuthed = computed(() => auth.isAuthed);
const { signIn } = auth;
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

function clearValidity(input) {
  state[input].isValid = true;
  state.isFormValid = true;
}

function validateForm() {
  if (state.email.val === "") {
    state.email.isValid = false;
    state.isFormValid = false;
  }
  if (state.phone.val === "") {
    state.phone.isValid = false;
    state.isFormValid = false;
  }
  if (state.message.val === "") {
    state.message.isValid = false;
    state.isFormValid = false;
  }
}

function resetForm() {
  for (const [key, value] of Object.entries(state)) {
    if (value && value.val) state[key] = value.val;
    else state[key] = value;
  }

  phoneMask.value.unmaskedValue = "";
}

const route = useRoute();

const profileStore = useProfileStore();
const { sendMessage } = profileStore;
async function onSubmit() {
  console.log(1);
  validateForm();
  console.log(state.isFormValid);
  if (state.isFormValid) {
    const response = await sendMessage({
      email: state.email.val,
      phone: phoneMask.value.unmaskedValue,
      message: state.message.val,
    });
    console.log(response);
    if (response.status === "success") {
      Swal.fire({
        title: "Успешно!",
        text: response.message,
        icon: "success",
        confirmButtonText: "ОК",
      });
      resetForm();
    } else {
      Swal.fire({
        title: "Ошибка!",
        text: response.message,
        icon: "error",
        confirmButtonText: "ОК",
      });
      return;
    }

    if (response.status === "error" && response.message) {
      Swal.fire({
        title: "Ошибка!",
        text: response.message,
        icon: "error",
        confirmButtonText: "ОК",
      });
      return;
    }
  }
}

const phoneInputElement = ref();
const phoneMask = ref(null);
onMounted(() => {
  phoneMask.value = new IMask(phoneInputElement.value, {
    mask: "+{7}(000)000-00-00",
  });
  phoneInputElement.value.addEventListener(
    "input",
    (e) => (state.phone.val = e.target.value)
  );
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
    <main class="main enter-page sign-in" role="main">
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
              <VeeField v-model="state.email.val"></VeeField>
              <!--              <input type="text" name="email" v-model="state.email.val" placeholder="Email">-->
            </div>
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
            <div class="i-wrap">
              <textarea
                name="problem"
                v-model="state.message.val"
                placeholder="Опишите суть проблемы:"
              ></textarea>
            </div>
            <button class="btn button-accent" type="submit">Отправить</button>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

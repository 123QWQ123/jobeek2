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

const authStore = useAuthStore();

const { sendRecoveryCode, recoverPasswordCode } = authStore;

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
}

const router = useRouter();

const isRegisterTab = ref(true);
const isConfirmTab = ref(false);

watch(isConfirmTab, () => {
  title.value = "Потверждения телефона";
})

const onSubmit = async () => {
  // console.log(isFormValid.value, state.i_agree);
  validateForm();
  if (state.isFormValid) {
    const response = await sendRecoveryCode({
      phone: state.phone.val,
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
  const response = await recoverPasswordCode({
    phone: state.phone.val,
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
          <h1>{{ title }}</h1>
          <div class="i-wrap">
            <input type="tel" name="tel" v-model="state.phone.val" placeholder="Номер телефона" @focusout="clearValidity('phone')">
          </div>
          <button class="btn button-accent" type="submit">Отпрваить</button>
        </form>
        <form v-if="isConfirmTab" class="enter-form" @submit.prevent="onSMSSubmit" >
          <h1></h1>
          <div class="i-wrap">
            <input type="number" name="code" v-model="state.code.val" placeholder="Код потверждения" @focusout="clearValidity('code')">
          </div>
          <button class="btn button-accent" type="submit">Подтвердить</button>
        </form>
        <div class="f-prompt">Хотите войти? <NuxtLink :to="{name: 'sign-in'}">Войдите!</NuxtLink>  </div>
      </div>
    </main>

  </div>
</template>
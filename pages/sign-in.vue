<script setup>
import Swal from "sweetalert2";
import { useAuthStore } from "~~/store/auth";
import IMask from "imask";
import { useVacancyStore } from "~/store/vacancy.js";
import { useResumeStore } from "~/store/resume.js";
import { ref } from "vue";

useHead({
  title: "Авторизация",
});

const auth = useAuthStore();
const vacancyStore = useVacancyStore();
const resumeStore = useResumeStore();
const { refreshSeeker, refreshEmployer } = auth;
const isAuthed = computed(() => auth.isAuthed);
const { signIn, setFcmToken } = auth;
const router = useRouter();

onBeforeMount(() => {
  if (isAuthed.value) {
    if (!auth.isEmployer) {
      navigateTo({ name: "profile-seeker" });
    } else {
      navigateTo({ name: "profile-employer" });
    }
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
  if (!(state.remember_me.val === false || state.remember_me.val === true)) {
    state.remember_me.isValid = false;
    state.isFormValid = false;
  }
}

const route = useRoute();

const { getConnectedEmployerProviders } = vacancyStore;
const { getConnectedSeekerProviders } = resumeStore;
const isLoading = ref(false);

async function onSubmit() {
  validateForm();
  if (state.isFormValid) {
    isLoading.value = true;
    let response;
    try {
      debugger;

      response = await signIn({
        phone: phoneMask.value.unmaskedValue,
        password: state.password.val,
      });
      await setFcmToken();
      isLoading.value = false;
    } catch (error) {
      state.error = error.message;
    }

    if (response.status !== "success") {
      return;
    }

    if (auth.isEmployer) {
      await refreshEmployer();
    } else {
      await refreshSeeker();
    }
    const route_name = route.query.redirect;

    if (auth.isEmployer && auth.employer) {
      if (auth.employer.is_completed) {
        if (route_name) {
          await navigateTo({ name: route_name, redirectCode: 301 });
        } else {
          await navigateTo({ name: "my-vacancies", redirectCode: 301 });
        }
      }
      return;
    }

    if (!auth.isEmployer && auth.seeker) {
      if (auth.seeker.is_completed) {
        if (route_name) {
          await navigateTo({ name: route_name, redirectCode: 301 });
        } else {
          await navigateTo({ name: "my-resumes", redirectCode: 301 });
        }
      }
      return;
    }

    // if (route_name) {
    //   navigateTo({ name: route_name });
    // } else {
    //   if (!auth.isEmployer) {
    //     navigateTo({ name: "profile-seeker" });
    //   } else {
    //     navigateTo({ name: "profile-employer" });
    //   }
    // }
  }
}

const phoneInputElement = ref();
const phoneMask = ref(null);
onMounted(() => {
  phoneMask.value = new IMask(phoneInputElement.value, {
    mask: "+{7}(000)000-00-00",
  });
  phoneInputElement.value.addEventListener("input", (e) => {
    state.phone.val = e.target.value;
  });
});

function close() {
  state.error = null;
  state.success = null;
}
</script>

<template>
  <div>
    <!--    <base-modal :show="!!state.error" title="Error occured" :type="'error'" @close="close">-->
    <!--      <p>{{ state.error }}</p>-->
    <!--    </base-modal>-->

    <base-modal :show="!!state.success" title="Success" @close="close">
      <p>{{ state.success }}</p>
    </base-modal>
    <main class="main enter-page sign-in" role="main">
      <div class="enter-page-content">
        <NuxtLink to="/" class="logo"
          ><img src="~/assets/img/jobeek-dark.svg" alt="#"
        /></NuxtLink>
        <form class="enter-form" @submit.prevent="onSubmit">
          <h1>Вход</h1>
          <div class="i-wrap has-validation">
            <input
              ref="phoneInputElement"
              type="tel"
              name="tel"
              placeholder="Номер телефона"
              @focusout="clearValidity('phone')"
            />
            <div
              :style="{ display: 'none' }"
              class="text-danger"
              :class="{ 'd-block': !state.phone.isValid }"
            >
              Введите правильный номер телефона
            </div>
          </div>
          <div class="i-wrap">
            <input
              type="password"
              name="pass"
              placeholder="Пароль"
              v-model="state.password.val"
              @focusout="clearValidity('password')"
            />
            <div
              :style="{ display: 'none' }"
              class="text-danger"
              :class="{ 'd-block': !state.password.isValid }"
            >
              Введите правильный пароль
            </div>
          </div>
          <div class="note">
            <img src="~/assets/img/svg/i.svg" alt="#" />
            <p class="">
              Если вы не устанавливали пароль, используйте SMS код который
              получили на телефон во время активации.
            </p>
          </div>
          <div class="help-box">
            <div class="check-block">
              <div class="checkbox">
                <input
                  type="checkbox"
                  id="remember_me"
                  v-model="state.remember_me.val"
                />
                <div class="checkbox-mask">
                  <img src="~/assets/img/svg/check.svg" alt="#" />
                </div>
              </div>
              <label for="remember_me">Запомнить меня</label>
            </div>
            <NuxtLink :to="{ name: 'forgot-password' }"
              >Забыли пароль?
            </NuxtLink>
          </div>
          <button class="btn button-accent" type="submit" :disabled="isLoading">
            Войти
            <Loader class="text-light spinner-border-sm" v-if="isLoading" />
          </button>
        </form>
        <div class="f-prompt">
          Еще нет аккаунта?
          <NuxtLink :to="{ name: 'sign-up' }">Зарегистрируйтесь!</NuxtLink>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.note p {
  font-size: 15px;
}

@media only screen and (max-width: 768px) {
  .note p {
    font-size: 14px;
  }
}
</style>

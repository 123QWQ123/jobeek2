<template>
  <main class="main enter-page sign-up" role="main">
    <div class="enter-page-content">
      <div class="logo">
        <img src="../assets/img/jobeek-dark.svg" alt="#" />
      </div>
      <form v-if="codeConfirmation" @submit.prevent="confirmCode()" class="enter-form">
        <h1>Регистрация</h1>
        <div class="i-wrap">
          <input v-model="code" type="text" placeholder="Код подтверждения" />
          <div v-if="errors?.code" class="error">{{ errors.code[0] }}</div>
        </div>
        <div class="help-box">
          <div class="check-block">
            <div class="checkbox">
              <input type="checkbox" id="agree" checked disabled />
              <div class="checkbox-mask">
                <img src="../assets/img/svg/check.svg" alt="#" />
              </div>
            </div>
            <label for="agree">
              Согласен с
              <a href="#">правилами обработки персональных данных</a>
            </label>
          </div>
        </div>
        <button class="btn button-accent" type="submit">
          Подтвердить код
        </button>
      </form>
      <form v-else @submit.prevent="sendCode()" class="enter-form">
        <h1>Регистрация</h1>
        <div class="i-wrap">
          <phone-field v-model:phone="phone" />
          <div v-if="errors?.phone" class="error">{{ errors.phone[0] }}</div>
        </div>
        <div class="help-box">
          <div class="check-block">
            <div class="checkbox">
              <input type="checkbox" id="agree" checked disabled />
              <div class="checkbox-mask">
                <img src="../assets/img/svg/check.svg" alt="#" />
              </div>
            </div>
            <label for="agree">
              Согласен с
              <a href="#">правилами обработки персональных данных</a>
            </label>
          </div>
        </div>
        <button class="btn button-accent" type="submit">
          Зарегистрироваться
        </button>
      </form>
      <div class="f-prompt">
        Уже есть аккаунт? <router-link to="/login">Войдите!</router-link>
      </div>
    </div>
  </main>
</template>

<script>
import axios from 'axios';
import { computed, ref } from 'vue'
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import PhoneField from "../components/PhoneField";

export default {
  components: {
    "phone-field": PhoneField
  },

  setup() {
    const store = useStore();
    const router = useRouter();

    const codeConfirmation = ref(false);
    const phone = ref('');
    const code = ref('');
    const errors = ref([]);
    const confirmationSession = ref('');

    const unformattedPhone = computed(() => {
      return phone.value.replace(/\D/g, '');
    })

    const sendCode = () => {
      axios
        .post('/api/auth/register', { phone: unformattedPhone.value })
        .then(({ data }) => {
          codeConfirmation.value = true;
          confirmationSession.value = data.data.session;
        })
        .catch(({response}) => errors.value = response.data.errors);
    }

    const confirmCode = () => {
      axios
        .post('/api/auth/register/confirm', {
          phone: unformattedPhone.value,
          session: confirmationSession.value,
          code: code.value
        })
        .then(() => {
          store.dispatch('login', { phone: unformattedPhone.value, password: code.value })
            .then(() => router.push('/'))
            .catch(response => errors.value = response.errors);
        })
        .catch(({response}) => errors.value = response.data.errors);
    }

    const back = () => {
      codeConfirmation.value = false;
      code.value = '';
    }

    return {
      codeConfirmation,
      phone,
      code,
      errors,
      sendCode,
      confirmCode,
      back,
    }
  }
}
</script>

<template>
  <main class="main enter-page sign-in" role="main">
    <div class="enter-page-content">
      <div class="logo">
        <img src="../assets/img/jobeek-dark.svg" alt="#" />
      </div>
      <form @submit.prevent="submit()" class="enter-form">
        <h1>Вход</h1>
        <div class="i-wrap">
          <phone-field v-model:phone="form.phone" />
          <div v-if="errors?.phone" class="error">{{ errors.phone[0] }}</div>
        </div>
        <div class="i-wrap">
          <input v-model="form.password" type="password" placeholder="Пароль" />
          <div v-if="errors?.password" class="error">{{ errors.password[0] }}</div>
        </div>
        <div class="note">
          <img src="../assets/img/svg/i.svg" alt="#" />
          <p>
            Если вы не устанавливали пароль, используйте SMS код который
            получили на телефон во время активации.
          </p>
        </div>
        <div class="help-box">
          <div class="check-block">
            <div class="checkbox">
              <input v-model="form.remember" type="checkbox" id="agree" />
              <div class="checkbox-mask">
                <img src="../assets/img/svg/check.svg" alt="#" />
              </div>
            </div>
            <label for="agree">Запомнить меня</label>
          </div>
          <a href="#">Забыли пароль? </a>
        </div>
        <button class="btn button-accent" type="submit">Войти</button>
      </form>
      <div class="f-prompt">
        Еще нет аккаунта? <router-link to="/register">Зарегистрируйтесь!</router-link>
      </div>
    </div>
  </main>
</template>

<script>
import { ref, reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from 'vue-router';
import PhoneField from "../components/PhoneField";

export default {
  components: {
    "phone-field": PhoneField
  },

  setup() {
    const router = useRouter();
    const store = useStore();

    const form = reactive({
      phone: '',
      password: '',
      remember: false,
    });

    const errors = ref([]);

    const submit = () => {
      form.phone = form.phone.replace(/\D/g, '');

      store.dispatch("login", form)
        .then(() => router.push('/'))
        .catch(response => errors.value = response.errors)
    };

    return {
      form,
      errors,
      submit,
    };
  },
};
</script>

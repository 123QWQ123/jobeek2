<template>
  <div v-if="codeConfirmation">
    <p>Подтвердите код</p>
    <p>Номер телефона: {{ phone }}</p>
    <input v-model="code" type="text">
    <button @click="confirmCode()" type="button">Подтвердить</button>
    <button @click="back()" type="button">Отмена</button>
  </div>
  <div v-else>
    <input v-model="phone" type="text" placeholder="Телефон">
    <button @click="sendCode()" type="button">Получить код</button>
  </div>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue'
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();

    const codeConfirmation = ref(false);
    const phone = ref('12345678910');
    const code = ref('');

    let confirmationSession = '';

    const sendCode = () => {
      codeConfirmation.value = true;

      axios.post('/api/auth/register', { phone: phone.value }).then(({ data }) => {
        confirmationSession = data.data.session;
      });
    }

    const confirmCode = () => {
      axios.post('/api/auth/register/confirm', { phone: phone.value, session: confirmationSession, code: code.value }).then(() => {
        store.dispatch('login', { phone: phone.value, password: code.value });
      });
    }

    const back = () => {
      codeConfirmation.value = false;
      code.value = '';
    }

    return {
      codeConfirmation,
      phone,
      code,
      sendCode,
      confirmCode,
      back,
    }
  }
}
</script>

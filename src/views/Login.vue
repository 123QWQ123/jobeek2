<template>
  <form @submit.prevent="submit()">
    <div>
      <input v-model="form.email" type="text" placeholder="E-mail">
    </div>

    <div>
      <input v-model="form.password" type="password" placeholder="Password">
    </div>

    <button type="submit">Submit</button>
  </form>
</template>

<script>
import { reactive } from '@vue/reactivity';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();

    const form  = reactive({
      email: 'admin@jobeek.me',
      password: 'password',
    });

    return {
      form,

      submit: () => {
        store.dispatch('login', form);
      },
    }
  }
}
</script>

<template>
  <form @submit.prevent="submit()">
    <div>
      <input v-model="form.phone" type="text" placeholder="Phone">
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
      phone: '12345678910',
      password: '3604',
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

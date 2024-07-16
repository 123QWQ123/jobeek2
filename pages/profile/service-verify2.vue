
<script setup>

import {useAuthStore} from "../../store/auth";
import {storeToRefs} from "pinia";
import {useProfileStore} from "../../store/profile";
import Swal from "sweetalert2";
import {navigateTo} from "nuxt/app";

const authStore = useAuthStore();
const profileStore = useProfileStore();

const {isEmployer} = storeToRefs(authStore);

const route = useRoute();
const isSuccess = ref("-");
const {code, email} = route.query;

const {verifyEmailConfirmation, getUser} = profileStore;
const {refreshSeeker} = useAuthStore();

onMounted(async() => {
  const resData = await verifyEmailConfirmation({code, email});
  if (resData.status === 'success'){

    isSuccess.value = true;

    Swal.fire({
      title: 'Успешно!',
      text: resData.message,
      icon: 'success',
      confirmButtonText: 'ОК'
    });

    await getUser();

    await refreshSeeker();

    setTimeout(() => {
        navigateTo({
                name:'profile', query:
                    {
                        message: "Вы успешно потвердили ваш эмаил!"
                    }
            }
        );
    }, 500);

    setTimeout(() => {
        navigateTo({
                name:'profile', query: {}
            }
        );
    }, 5000);
  }else{
    isSuccess.value = false;

    navigateTo({name:'404'});
  }
});

</script>

<template>
  <main class="main cabinet profile-page bg-wrapper" role="main">
    <div class="wrapper">
        <div class="w-box" v-if="isSuccess">
          <div class="w-box-head">
            <h1 class="title">Ваш эмаил подтержден!</h1>
          </div>
          <div class="w-box-body">
            <p>Через 5 секунд редиректится!</p>
          </div>
      </div>
    </div>
  </main>
</template>

<style scoped>

</style>
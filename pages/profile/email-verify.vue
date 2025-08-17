<script setup>
import { useAuthStore } from "~/store/auth";
import { storeToRefs } from "pinia";
import { useProfileStore } from "~/store/profile";
import { navigateTo } from "nuxt/app";

const authStore = useAuthStore();
const profileStore = useProfileStore();

const { isEmployer } = storeToRefs(authStore);

const route = useRoute();
const isSuccess = ref(false);
const errorMessage = ref("");
const { code, email } = route.query;
const { verifyEmailConfirmation, getUser } = profileStore;
const { refreshSeeker, refreshEmployer } = useAuthStore();

onMounted(async () => {
  const resData = await verifyEmailConfirmation({ code, email });
  if (resData.status !== "success") {
    isSuccess.value = false;
    errorMessage.value = resData.message;
  } else {
    isSuccess.value = true;

    await getUser();

    await refreshSeeker();
    await refreshEmployer();

    navigateTo({ name: "profile" });
  }
});
</script>

<template>
  <main class="main cabinet profile-page bg-wrapper" role="main">
    <div class="wrapper">
      <div class="w-box" v-if="isSuccess">
        <div class="w-box-head">
          <h2 class="title text-success">
            Ваша электронная почта подтвержденная!
          </h2>
        </div>
      </div>
      <div class="w-box" v-else>
        <div class="w-box-head">
          <h2 class="title text-danger" v-if="errorMessage">
            {{ errorMessage }}
          </h2>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped></style>

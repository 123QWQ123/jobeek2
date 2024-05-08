<script setup>
import { useAuthStore } from "~/store/auth";
import Premium from "~/components/MyVacancies/Premium.vue";

definePageMeta({
  layout: "cabinet",
});
useHead({
  title: "Ваш аккаунт",
});
const authStore = useAuthStore();

const isCompleted = computed(() => {
  if (!authStore.isEmployer) {
    if (authStore.seeker) {
      return authStore.seeker.is_completed;
    }
    return false;
  }
  if (authStore.isEmployer) {
    if (authStore.employer) {
      return authStore.employer.is_completed;
    }
    return false;
  }
  return false;
});

const { setSeeker } = authStore;
onBeforeUnmount(() => {
  const seeker = JSON.parse(sessionStorage.getItem("seeker"));
  if (seeker) {
    setSeeker(seeker);
  }
});
onMounted(() => {
  if (authStore.isEmployer) {
    navigateTo({ name: "profile-employer" });
  }
});
watch(
  () => authStore.isEmployer,
  (newValue) => {
    if (newValue) {
      navigateTo({ name: "profile-employer" });
    }
  },
);
</script>

<template>
  <main class="main cabinet profile-page bg-wrapper" role="main">
    <PersonalCabinetSearchMobile />

    <div class="has-sidebar has-sidebar--v2 wrapper wrapper-1290">
      <div class="content" v-if="authStore.seeker">
        <div class="w-box bg-white" v-if="!isCompleted">
          <p class="text-danger p-3">
            Перед использовании сервиса требуется заполнения вашего профиля.
          </p>
        </div>
        <div class="w-box w-box--main">
          <div class="w-box-head">
            <h1 class="title">Профиль</h1>
          </div>
          <div name="content">
            <ProfileSeekerEditForm />
          </div>
        </div>
      </div>
      <div class="content" v-else></div>
      <aside class="sidebar">
        <Premium />
      </aside>
    </div>
  </main>
</template>

<style scoped>
.content-enter-active,
.content-leave-active {
  transition: opacity 0.5s ease;
}

.content-enter-from,
.content-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .content {
    order: 2;
  }

  .sidebar {
    order: 1;
  }
}
</style>

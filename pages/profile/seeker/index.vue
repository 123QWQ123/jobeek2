<script setup>
import { useAuthStore } from "~/store/auth";
import Premium from "~/components/MyVacancies/Premium.vue";

useHead({
  title: "Jobeek - Ваш аккаунт",
});
const authStore = useAuthStore();

const isCompleted = computed(() =>
  authStore.isEmployer
    ? !!authStore.employer?.is_completed
    : !!authStore.seeker?.is_completed,
);

watch(
  () => authStore.isEmployer,
  (isEmployer) => {
    if (isEmployer) navigateTo({ name: "profile-employer" });
  },
  { immediate: true },
);
</script>

<template>
  <main class="main cabinet profile-page bg-wrapper" role="main">
    <PersonalCabinetSearchMobile />
    <div class="has-sidebar has-sidebar--v2 wrapper wrapper-1290">
      <div class="content">
        <div class="w-box bg-white" v-if="!isCompleted">
          <p class="text-danger p-3">
            Перед использовании сервиса требуется заполнение вашего профиля и
            подтверждения e-mail.
          </p>
        </div>
        <div class="w-box w-box--main">
          <div class="w-box-head">
            <h1 class="title">Профиль</h1>
          </div>
          <div>
            <ProfileSeekerEditForm />
          </div>
        </div>
      </div>
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

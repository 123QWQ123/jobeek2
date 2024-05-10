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
onMounted(() => {
  if (!authStore.isEmployer) {
    navigateTo({ name: "profile-seeker" });
  }
});
watch(
  () => authStore.isEmployer,
  (newValue) => {
    if (!newValue) {
      navigateTo({ name: "profile-seeker" });
    }
  },
);
</script>

<template>
  <main class="main cabinet profile-page bg-wrapper" role="main">
    <PersonalCabinetSearchMobile />

    <div class="has-sidebar has-sidebar--v2 wrapper wrapper-1290">
      <div class="content">
        <div class="w-box bg-white" v-if="!isCompleted">
          <p class="text-danger p-3">
            Перед использовании сервиса требуется заполнения вашего профиля.
          </p>
        </div>

        <ProfileParentEmployerProfile />
      </div>
      <aside class="sidebar">
        <Premium />
      </aside>
    </div>
  </main>
</template>

<style scoped>
@media (max-width: 768px) {
  .content {
    order: 2;
  }

  .sidebar {
    order: 1;
  }
}
</style>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAuthStore } from "~/store/auth";
import Premium from "~/components/MyVacancies/Premium.vue";

useHead({
  title: "Jobeek - Ваш аккаунт",
});

const authStore = useAuthStore();
const { seeker, employer, isEmployer, isSubscribed } = storeToRefs(authStore);

const isCompleted = computed(() => {
  if (!isEmployer.value) return seeker.value?.is_completed ?? false;
  return employer.value?.is_completed ?? false;
});

const router = useRouter();

if (!isEmployer.value) {
  router.push({ name: "profile-seeker" });
}

watch(
  isEmployer,
  (newValue) => {
    if (!newValue) {
      router.push({ name: "profile-seeker" });
    }
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
            подтверждения email-а.
          </p>
        </div>

        <ProfileEmployerEditForm />

        <CashBoxList v-if="isCompleted && isSubscribed" />
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

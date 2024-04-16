<script setup>
import { useAuthStore } from "../../store/auth";
import useAlert from "~/composables/useAlert";

definePageMeta({
  layout: "cabinet",
});
useHead({
  title: "Ваш аккаунт",
});
const authStore = useAuthStore();
const isEmployer = computed(() => authStore.isEmployer);

const route = useRoute();

const error = computed(() => {
  return route.query.message;
});

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
const { handleAlert } = useAlert();

watch(
  () => route.query.message,
  (newMessage) => {
    console.log(newMessage);
  },
);

onMounted(() => {
  handleAlert();
});
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
        <div class="w-box w-box--main">
          <div class="w-box-head">
            <h1 class="title">Профиль</h1>
          </div>
          <client-only>
            <transition name="content">
              <div v-if="isEmployer">
                <ProfileEmployerEditForm
                  :key="`employer${new Date().toTimeString()}`"
                />
              </div>
              <div v-else>
                <ProfileSeekerEditForm
                  :key="`seeker${new Date().toTimeString()}`"
                />
              </div>
            </transition>
          </client-only>
        </div>
      </div>
      <aside class="sidebar">
        <div class="premium-col sticky-item">
          <div class="title" v-if="isEmployer">Премиум</div>
          <div class="title" v-else>Подключите Премиум подписку</div>
          <div class="term" v-if="isEmployer">
            <span>Действует до</span><strong>24 августа 2024</strong>
          </div>
          <a class="btn button-xs" href="#" v-if="isEmployer">Отключить </a>
          <a class="btn button-xs" href="#" v-else>Подключить</a>
        </div>
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

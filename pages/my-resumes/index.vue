<script setup>
import { useAuthStore } from "~/store/auth";
import { useResumeStore } from "~/store/resume";
import { useAsyncData, navigateTo } from "#app";

const authStore = useAuthStore();
const resumeStore = useResumeStore();

const isEmployer = computed(() => authStore.isEmployer);
const isSubscribed = computed(() => authStore.isSubscribed);

useAsyncData("myResumesData", () =>
  Promise.all([
    resumeStore.getMyResumes(),
    resumeStore.getAvailabilityCreate(),
  ]),
);

watch(isEmployer, (value) => {
  if (value) {
    navigateTo({ name: "my-vacancies" });
  }
});

const isCompleted = computed(() => {
  const { hh, superjob } = resumeStore.providers;
  return !!hh && !!superjob;
});
</script>

<template>
  <main class="main cabinet my-vacancies-page" role="main">
    <PersonalCabinetSearchMobile />
    <div class="bg-wrapper position-relative pt-4">
      <div class="has-sidebar has-sidebar--v2 wrapper wrapper-1290">
        <div class="content mb-4">
          <MyResumesConnectedProviders />
          <MyResumesList />
        </div>
        <aside class="sidebar">
          <div class="lk-page-title mb-4 mb-0 margin-top-mobile">Премиум</div>
          
            <!-- NEW block -->
            <div class="sticky-item sidebar-premium">
            	<div class="notification mt-0">
            		<div class="ic"><img src="~/assets/img/svg/crown2.svg" alt="#" /></div>
            		<div class="notification-text">
            			<strong class="title">Подключите премиум</strong>
            			<p> У вас есть лимит на создание резюме: 1 шт. Чтобы создавать неограниченное количество резюме, подключите премиум-подписку. </p>
            			<a class="btn btn-primary mt-3" href="#">Подключить</a>
            		</div>
            	</div>
            </div>
            <!-- END NEW block -->
  
  
          <div class="premium-col sticky-item">
            <div class="title">
              {{ isSubscribed ? "" : "Подключите Премиум подписку" }}
            </div>
            <div v-if="isSubscribed" class="term">
              <span>Действует до</span> <strong>24 августа 2024</strong>
            </div>
            <a v-if="isSubscribed" class="btn button-xs" href="#">Отключить</a>
            <a v-else class="notification-button button-accent" href="#"
              >Подключить</a
            >
          </div>
        </aside>
      </div>
    </div>
  </main>
</template>

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
  	            <div class="notification-text">
  	              <div class="premium-notification-icon"></div>
  	              <strong class="title">Премиум</strong>
                  <div class="plash">Не подключен</div>
                  <div class="premium-checker">
                    <input type="checkbox" id="employer">
                    <div class="premium-checker-ui">
                      <div class="circle left"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="notification mt-0 active">
  	            <div class="notification-text">
  	              <div class="premium-notification-icon"></div>
  	              <strong class="title">Премиум</strong>
                  <div class="plash">Подключен</div>
                  <div class="premium-checker">
                    <input type="checkbox" id="employer">
                    <div class="premium-checker-ui">
                      <div class="circle left"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- END NEW block -->
  
  
          <!--<div class="premium-col sticky-item">
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
          </div>-->
        </aside>
      </div>
    </div>
  </main>
</template>

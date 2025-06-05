<script setup>
import { useAuthStore } from "~/store/auth";

useHead({
  title: "Мои избранные вакансии - Jobeek",
});

const authStore = useAuthStore();

const isEmployer = computed(() => authStore.isEmployer);
const user = computed(() => authStore.user);
const employer = computed(() => authStore.employer);

watch(isEmployer, (new_value) => {
  if (new_value === true) {
    navigateTo({ name: "favorite-resumes" });
  }
});
</script>
<template>
  <main class="main cabinet my-favorite-vacancies-page" role="main">
    <PersonalCabinetSearchMobile />

    <div class="bg-wrapper position-relative pt-4">
      <div class="has-sidebar has-sidebar--v2 wrapper wrapper-1290">
        <div class="content mb-4">
          <MyFavoriteVacanciesList />
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
        </aside>
      </div>
    </div>
  </main>
</template>

<style></style>

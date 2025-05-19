<script setup>
import { useAuthStore } from "~/store/auth";

useHead({
  title: "Мои избранные вакансии - Jobeek",
});

const authStore = useAuthStore();

const isEmployer = computed(() => authStore.isEmployer);
const user = computed(() => authStore.user);
const employer = computed(() => authStore.employer);

watch(
  () => isEmployer.value,
  (new_value) => {
    if (!new_value) {
      navigateTo({ name: "favorite-vacancies" });
    }
  },
);
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
            		<div class="ic"><img src="~/assets/img/svg/crown2.svg" alt="#" /></div>
            		<div class="notification-text">
            			<strong class="title">Подключите премиум</strong>
            			<p> У вас есть лимит на создание вакансий: 1 шт. Чтобы создавать неограниченное количество вакансий, подключите премиум-подписку. </p>
            			<a class="btn btn-primary mt-3" href="#">Подключить</a>
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

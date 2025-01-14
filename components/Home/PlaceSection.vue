<template>
  <div class="place-section section wrapper">
    <div class="place-card place-card--vacancy">
      <h4 class="place-card-title">Работа</h4>
      <p class="place-card-descr">
        <strong>Jobeek</strong> — это лучшие предложения высокооплачиваемой
        работы от российских и зарубежных компаний.
      </p>
      <NuxtLink
        @click.prevent="navigateToResume"
        :to="{ name: 'create-resume' }"
        class="btn button-accent button-accent--ts-bigger"
        >Разместить резюме
      </NuxtLink>
    </div>
    <div class="place-card place-card--resume">
      <h4 class="place-card-title">Сотрудники</h4>
      <p class="place-card-descr">
        <strong>Jobeek</strong> — самая большая и качественная база резюме
        лучших специалистов в России.
      </p>
      <NuxtLink
        @click.prevent="navigateToVacancy"
        :to="{ name: 'create-vacancy' }"
        class="btn button-accent button-accent--ts-bigger"
      >
        Разместить вакансию
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "~/store/auth.js";
import { navigateTo } from "nuxt/app";

const auth = useAuthStore();
const { toggleUserMode } = auth;

const navigateToVacancy = () => {
  if (!auth.isEmployer) {
    toggleUserMode();
  }
  navigateTo({ name: "create-vacancy" });
};

const navigateToResume = () => {
  if (auth.isEmployer) {
    toggleUserMode();
  }
  navigateTo({ name: "create-resume" });
};
</script>

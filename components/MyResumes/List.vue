<template>
  <div class="">
    <!--<div class="notification mt-0">
      <div class="ic">
        <img src="~/assets/img/svg/crown2.svg" alt="#" />
      </div>
      <div class="notification-text">
        <strong class="title">Подключите премиум</strong>
        <p>
          У вас есть лимит на создание резюме:
          {{ can_create_resume_count }} шт. Чтобы создавать неограниченное
          количество резюме, подключите премиум-подписку.
        </p>
      </div>
    </div>-->
    <NuxtLink
      v-if="can_create_resume_count && (providers?.hh || providers?.superjob)"
      class="create-button"
      type="link"
      :to="{ name: 'create-resume' }"
      >Создать резюме
    </NuxtLink>
    <span v-else class="create-button" type="link"
      >Подключите минимум 1 провайдер для дальнейшего использования
      сервиса</span
    >
    <div class="col d-flex justify-content-between mt-4 margin-bottom-mobile">
      <h1 class="lk-page-title mb-4">Ваши резюме ({{ total }})</h1>
    </div>

    <MyResumesListActions
      v-if="my_resumes.length > 0"
      name="provider"
      @onProviderChange="onProviderChange"
    />

    <ul class="resume-list mt-4" v-if="my_resumes.length > 0">
      <MyResumesItem v-for="item in my_resumes" :key="item.id" :item="item" />
    </ul>
    <div class="mt-4 pb-4 justify-content-center" v-else>
      <div class="provider_buttons d-flex mt-4 pb-4 justify-content-center">
        <p class="txt-no-resume">У Вас нет резюме.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useResumeStore } from "~/store/resume";

useHead({
  title: "Jobeek - Мои вакансии",
});

const resumeStore = useResumeStore();
const { getMyResumes } = resumeStore;
const { can_create_resume_count, providers } = storeToRefs(resumeStore);
const { my_resumes, current_page, my_total } = storeToRefs(resumeStore);
const route = useRoute();
const resumes = ref([]);
const form = useMyResumeForm();
const total = computed(() => {
  return resumeStore.my_resumes.length;
});

const onProviderChange = (newProvider) => {
  if (newProvider) {
    getMyResumes({
      providers: [newProvider],
    });
  } else {
    getMyResumes();
  }
};
</script>

<style scoped>
.provider_buttons {
  background-color: #fff;
  border-radius: 12px;
  padding: 20px;
  font-weight: bold;
  margin-bottom: 40px;
}
.txt-no-resume {
  color: #0a2540;
  font-size: 18px;
  font-weight: 600;
  line-height: 25px;
  padding: 10px 0;
}
</style>

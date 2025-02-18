<template>
  <div class="">
    <div class="notification mt-0">
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
    </div>
    <NuxtLink
      v-if="can_create_resume_count"
      class="create-button"
      type="link"
      :to="{ name: 'create-resume' }"
      >Создать резюме
    </NuxtLink>
    <div class="col d-flex justify-content-between mt-4 margin-bottom-mobile">
      <h1 class="lk-page-title mb-4">Ваши резюме ({{ total }})</h1>
    </div>

    <MyResumesListActions
      name="provider"
      @onProviderChange="onProviderChange"
    />

    <ul class="resume-list mt-4" v-if="my_resumes.length > 0">
      <MyResumesItem v-for="item in my_resumes" :key="item.id" :item="item" />
    </ul>
    <div class="d-flex mt-4 pb-4 justify-content-center" v-else>
      <p>Ничего не найдено!</p>
    </div>
  </div>
</template>

<script setup>
import { useResumeStore } from "~/store/resume";

useHead({
  title: "Jobeek - Мои вакансии",
});

const resumeStore = useResumeStore();
const { getMyResumes, getAvailabilityCreate } = resumeStore;
const { can_create_resume_count } = storeToRefs(resumeStore);
const { my_resumes, current_page, my_total } = storeToRefs(resumeStore);
const route = useRoute();
const resumes = ref([]);
const isLoading = ref(false);
const form = useMyResumeForm();
const total = computed(() => {
  return resumeStore.my_resumes.length;
});

useAsyncData("getMyResumes", async () => await getMyResumes({}));
useAsyncData(
  "getAvailabilityCreate",
  async () => await getAvailabilityCreate(),
);

watch(
  () => route.query,
  async (newQuery) => {
    if (newQuery.hasOwnProperty("my_provider")) {
      const params = useMyResumeForm(form.value, "backend");
      await getMyResumes(params);
    }
  },
);

const onProviderChange = (newProvider) => {
  if (newProvider)
    navigateTo({ name: "my-resumes", query: { my_provider: newProvider } });
  else navigateTo({ name: "my-resumes" });
};
</script>

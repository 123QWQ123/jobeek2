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
          {{ can_create_resume_count }} штук. Чтобы создавать неограниченное
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
    <div class="col d-flex justify-content-between mt-4">
      <h1 ref="filterRef" class="lk-page-title mt-4">
        Ваши резюме({{ total }})
      </h1>
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

await getAvailabilityCreate();
const canCreateResume = computed(() => {
  const { hh, superjob } = resumeStore.can_create_resume;
  if (hh && superjob) {
    return (
      hh.is_creation_available === true ||
      superjob.is_creation_available === true
    );
  }
  return false;
});

//
// const canCreateResumeCount = computed(() => {
//   const { hh, superjob } = resumeStore.can_create_resume;
//   if (hh && superjob) {
//     return hh.remaining > superjob.remaining
//       ? hh.remaining
//       : superjob.remaining;
//   }
//   return false;
// });

const { my_resumes, current_page, my_total } = storeToRefs(resumeStore);

const form = useMyResumeForm();
const isPrevDisabled = computed(() => {
  return parseInt(current_page.value) === 1;
});

const total = computed(() => {
  return resumeStore.my_resumes.length;
});
const resumes = ref([]);
const isLoading = ref(false);

const route = useRoute();
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
onMounted(async () => {
  isLoading.value = true;
  await getMyResumes({});
  isLoading.value = false;
});

const filterRef = ref();

const listStyles = {
  left: 0,
  right: "unset",
  width: "auto !important",
};
</script>

<style scoped></style>

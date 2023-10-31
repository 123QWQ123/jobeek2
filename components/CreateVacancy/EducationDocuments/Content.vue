<template>
  <div class="w-box" v-click-outside="save">
    <div class="w-box-head">
      <h3 class="title">Сертификаты, курсы</h3>
      <span class="arrow" :class="{up: isCollapsed, 'is-completed': isCompleted}" @click="isCollapsed = !isCollapsed"></span>
    </div>

    <div class="text-danger d-block p-4" v-if="errors.message">
      {{ errors.message }}
    </div>
    <transition>
        <div class="w-box-body" :class="{collapse: isCollapsed}">
            <div class="" v-if="isShown">
                <div class="row">
                    <CreateResumeEducationDocumentsHistory ref="educationDocumentElement" v-model="education_documents" :errors="errors['education_documents']" />
                </div>
            </div>
            <div class="empty-area" v-else>
                <span>Здесь вы можете указать</span>
                <button class="add" type="button" @click="isShown = !isShown">Добавить </button>
            </div>

            <transition>
        <span v-if="isSaved" class="p-3 d-inline-flex justify-content-center align-items-center" style="color:#0c0">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="me-2">
                <path fill="#0c0" d="M10.041 17l-4.5-4.319 1.395-1.435 3.08 2.937 7.021-7.183 1.422 1.409-8.418 8.591zm5.959 7v-2h-8v2h8zm0-24v2h-8v-2h8zm2 0h1c2.762 0 5 2.239 5 5v1h-2v-1c0-1.654-1.346-3-3-3h-1v-2zm6 16h-2v-8h2v8zm-18 8h-1c-2.762 0-5-2.239-5-5v-1h2v1c0 1.654 1.346 3 3 3h1v2zm18-6v1c0 2.761-2.238 5-5 5h-1v-2h1c1.654 0 3-1.346 3-3v-1h2zm-24-12v-1c0-2.761 2.238-5 5-5h1v2h-1c-1.654 0-3 1.346-3 3v1h-2zm0 2h2v8h-2v-8z"/>
            </svg>
            Сохранен
        </span>
            </transition>
        </div>
    </transition>

  </div>
</template>

<script setup>


import useFormValidation from "~/composables/useFormValidation";
import {useResumeStore} from "~/store/resume";
import {useDiff} from "~/composables/useDiff";
const educationElement = ref(false);
const route = useRoute();
const resumeStore = useResumeStore();
const draftID = computed(() => route.query.draft_id);
const vacancyID = computed(() => route.query.vacancy_id);

const education_documents = ref(resumeStore.resume?.education_documents ?? []);

const isShown = ref(false);
const isChanged = ref(false);
const isSaved = ref(false);
const isCollapsed = ref(true);
const isUpdated = ref(false);

const sectionData = ref({
    education_documents: [],
});
watch(() => sectionData.value, (newData, oldData) => {
    const diffData =  useDiff(newData, oldData, ['id', 'created_at', 'updated_at']);
    if (Object.keys(diffData).length){
        education_documents.value = newData.education_documents;
        if (isUpdated.value){
            isUpdated.value = false;
            return;
        }
    }
});

watch(() => resumeStore.resume, (newResume) => {
    if (newResume){
        sectionData.value = {
            education_documents: newResume.education_documents,
        };
        nextTick(() => {
            isChanged.value = false;
        });
    }
});

onMounted(() => {
    if (resumeStore.resume){
        sectionData.value = {
            education_documents: resumeStore.resume?.education_documents,
        };
        nextTick(() => {
            isChanged.value = false;
        });
    }
})

watch(() => isCollapsed.value, (newData) => {
    if (!newData){
        isShown.value = true;
    }
});

watch(() => education_documents.value, (newData) => {
    isChanged.value = true;
});

const {getResume, updateResume} = resumeStore;

const {errors, handleErrorResponse} = useFormValidation();
const save = async (is_from_parent = false) => {

  if (isChanged.value){
        const resData = await updateResume(draftID.value, {
            form_data: 'EDUCATION_DOCUMENTS_DATA',
            education_documents: education_documents.value
        });

        if (resData.status !== 'success'){
      return handleErrorResponse(resData.data);
    }
    if (is_from_parent)
    {
      return new Promise((resolve, reject) => {
        resolve(true);
      });
    }
        isChanged.value = false;
        isSaved.value = false;
        isUpdated.value = true;

        await getResume(draftID.value);
    }
}

const isCompleted = computed(() => {
    return resumeStore.resume?.education_documents?.length > 0;
});
</script>

<style scoped>

</style>
<template>
  <div class="w-box"  @mouseleave="save">
    <div class="w-box-head">
      <h3 class="title">Опыт работы</h3>
      <span class="arrow" :class="{up: isCollapsed}" @click="isCollapsed = !isCollapsed"></span>
    </div>
      <transition>
          <div class="w-box-body" :class="{collapse: isCollapsed}">
              <div class="form_content" v-if="isShown">
                  <div class="row">
                      <CreateResumeWorkExperienceHistory v-model="work_experiences_items" ref="workExperienceElement"/>
                  </div>
              </div>
              <div class="empty-area" v-else>
                  <span>Здесь вы можете указать</span>
                  <button class="add" type="button" @click="isShown = !isShown">Добавить </button>
              </div>
          </div>
      </transition>

  </div>
</template>

<script setup>

import useFormValidation from "~/composables/useFormValidation";
import {useResumeStore} from "~/store/resume";

const work_experiences_items = ref([]);

const workExperienceElement = ref(false);

const isShown = ref(false);
const isChanged = ref(false);
const isSaved = ref(false);
const isCollapsed = ref(true);

const route = useRoute();
const resumeStore = useResumeStore();
const draftID = computed(() => route.query.draft_id);

watch(() => work_experiences_items.value, (newData) => {
    isChanged.value = true;
});

const resume = computed(() => resumeStore.resume);

const work_histories = computed(() => resume.value?.work_histories ?? []);
watch(() => work_histories.value, (newItems) => {
    if (newItems.length > 0){
        isShown.value = true;
        work_experiences_items.value = newItems;
    }
});

const {getResume, updateResume} = resumeStore;

const {errors, handleErrorResponse} = useFormValidation();
const save = async () => {
    console.log('leaving...')
    if (isChanged.value){
        errors.value = {};
        const resData = await updateResume(draftID.value, {
            form_data: 'EXPERIENCE_DATA',
            work_histories: work_experiences_items.value
        });

        console.log(resData);

        if (resData.status !== 'success'){
            return handleErrorResponse(resData.data);
        }

        isSaved.value = true;
        isChanged.value = true;
        setTimeout(() => {
            isSaved.value = false;
        }, 3000);

        await getResume(draftID.value);
    }
}
</script>

<style scoped>
</style>
<template>
  <div class="w-box"  @mouseleave="save">
    <div class="w-box-head">
      <h3 class="title">Образование</h3>
    </div>
    <div class="w-box-body">
        <div class="" v-if="isShown">
            <div class="row">
                <CreateResumeEducationHistory ref="educationElement" v-model="educations" />
            </div>
        </div>
        <div class="empty-area" v-else>
            <span>Здесь вы можете указать</span>
            <button class="add" type="button" @click="isShown = !isShown">Добавить </button>
        </div>
    </div>
  </div>
</template>

<script setup>

import useFormValidation from "~/composables/useFormValidation";
import {useResumeStore} from "~/store/resume";

const educations = ref([]);

const educationElement = ref(false);

const isShown = ref(false);

// watch(() => educations.value, (newData) => {
//   console.log(newData);
// })

const route = useRoute();
const resumeStore = useResumeStore();

const draftID = computed(() => route.query.draft_id);

const {resume} = resumeStore;

const isSaved = ref(false);

const {getResume, updateResume} = resumeStore;

const {errors, handleErrorResponse} = useFormValidation();
const save = async () => {


    errors.value = {};

    const resData = await updateResume(draftID.value, {
        form_data: 'EDUCATION_DATA',
        education: educations.value
    });

    console.log(resData);

    if (resData.status !== 'success'){
        handleErrorResponse(resData.data);
    }

    isSaved.value = true;
    setTimeout(() => {
        isSaved.value = false;
    }, 3000);

    await getResume(draftID.value);
}
// const save = () => {
//   console.log(educations.value)
//
// };
</script>

<style scoped>

</style>
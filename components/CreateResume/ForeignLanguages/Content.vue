<template>
    <div class="w-box"  @mouseleave="save">
        <div class="w-box-head">
            <h3 class="title">Владение иностранными языками</h3>
            <span class="arrow" :class="{up: isCollapsed}" @click="isCollapsed = !isCollapsed"></span>

        </div>
        <transition>
            <div class="w-box-body" :class="{collapse: isCollapsed}">
                <div class="" v-if="isShown">
                    <div class="row">
                        <SharedComponentsForeignLanguagesWrapper ref="componentElement" v-model="foreign_languages" />
                    </div>
                </div>
                <div class="empty-area" v-else>
                    <span>Здесь вы можете указать</span>
                    <button class="add" type="button" @click="isShown = !isShown">Добавить </button>
                </div>
            </div>
        </transition>

        <transition>
          <span v-if="isSaved" class="p-3 d-inline-flex justify-content-center align-items-center" style="color:#0c0">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="me-2">
                  <path fill="#0c0" d="M10.041 17l-4.5-4.319 1.395-1.435 3.08 2.937 7.021-7.183 1.422 1.409-8.418 8.591zm5.959 7v-2h-8v2h8zm0-24v2h-8v-2h8zm2 0h1c2.762 0 5 2.239 5 5v1h-2v-1c0-1.654-1.346-3-3-3h-1v-2zm6 16h-2v-8h2v8zm-18 8h-1c-2.762 0-5-2.239-5-5v-1h2v1c0 1.654 1.346 3 3 3h1v2zm18-6v1c0 2.761-2.238 5-5 5h-1v-2h1c1.654 0 3-1.346 3-3v-1h2zm-24-12v-1c0-2.761 2.238-5 5-5h1v2h-1c-1.654 0-3 1.346-3 3v1h-2zm0 2h2v8h-2v-8z"/>
              </svg>
              Сохранен
          </span>
        </transition>
    </div>
</template>

<script setup>

import useFormValidation from "~/composables/useFormValidation";
import {useResumeStore} from "~/store/resume";

const isShown = ref(false);
const isChanged = ref(false);
const isSaved = ref(false);
const isCollapsed = ref(true);
const componentElement = ref(false);
const resumeStore = useResumeStore();

const foreign_languages = ref(resumeStore.resume?.languages ?? []);
onMounted(() => {
    if (foreign_languages.value.length > 0){
        isShown.value = true;
        isCollapsed.value = false;
    }
})

const route = useRoute();
const draftID = computed(() => route.query.draft_id);

const {updateResume, getResume} = resumeStore;
const {errors, handleErrorResponse} = useFormValidation();

const save = async() => {
    if (isChanged.value){
        errors.value = {};
        const resData = await updateResume(draftID.value, {
            form_data: 'LANGUAGES_DATA',
            languages: foreign_languages.value
        });

        if (resData.status !== 'success'){
            return handleErrorResponse(resData.data);
        }

        isSaved.value = true;
        isChanged.value = false;
        setTimeout(() => {
            isSaved.value = false;
        }, 3000);

    }
}
watch(() => foreign_languages.value,  (newItems) => {
    isChanged.value = true;
});

</script>

<style scoped>

</style>
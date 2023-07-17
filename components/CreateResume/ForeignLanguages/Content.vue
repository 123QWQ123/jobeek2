<template>
    <div class="w-box"  v-click-outside="save">
        <div class="w-box-head">
            <h3 class="title">Владение иностранными языками</h3>
            <span class="arrow" :class="{up: isCollapsed, 'is-completed': isCompleted}" @click="isCollapsed = !isCollapsed"></span>

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

    </div>
</template>

<script setup>

import useFormValidation from "~/composables/useFormValidation";
import {useResumeStore} from "~/store/resume";

const isShown = ref(false);
const isChanged = ref(false);
const isSaved = ref(false);
const isCollapsed = ref(true);
const isUpdated = ref(false);

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
const resume = computed(() => resumeStore.resume);
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

        isChanged.value = false;
        isSaved.value = false;
        getResume(draftID.value);
    }
}
watch(() => foreign_languages.value,  (newItems) => {
    isChanged.value = true;
});



const isCompleted = computed(() => {
    if (isUpdated.value === true){
        return foreign_languages.value.length > 0;
    }else{
        return resumeStore.resume?.languages?.length > 0;
    }
});
</script>

<style scoped>

</style>
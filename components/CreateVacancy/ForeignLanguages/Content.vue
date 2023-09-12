<template>
    <div class="w-box"  v-click-outside="save">
        <div class="w-box-head">
            <h3 class="title">Владение иностранными языками</h3>
            <span class="arrow" :class="{up: isCollapsed, 'is-completed': isCompleted}" @click="isCollapsed = !isCollapsed"></span>
        </div>

        <div class="text-danger d-block p-4" v-if="errors.message">
          {{ errors.message }}
        </div>
        <transition>
            <div class="w-box-body" :class="{collapse: isCollapsed}">
                <div class="" v-if="isShown">
                    <div class="row">
                      <div class="w-box-body">
                        <SharedComponentsForeignLanguagesWrapper ref="componentElement" v-model="foreign_languages" :errors="errors.languages ?? []" />
                      </div>
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
import {useDiff} from "~/composables/useDiff";
const route = useRoute();
const resumeStore = useResumeStore();
const draftID = computed(() => route.query.draft_id);

const foreign_languages = ref(resumeStore.resume?.languages ?? []);

const isShown = ref(false);
const isChanged = ref(false);
const isSaved = ref(false);
const isCollapsed = ref(true);
const isUpdated = ref(false);

const sectionData = ref({
    languages: [],
});
watch(() => sectionData.value, (newData, oldData) => {
    const diffData =  useDiff(newData, oldData, ['id', 'created_at', 'updated_at']);
    if (Object.keys(diffData).length){
        foreign_languages.value = newData.languages;
        if (isUpdated.value){
            isUpdated.value = false;
            return;
        }
    }
});
watch(() => resumeStore.resume, (newResume) => {
    if (newResume){
        sectionData.value = {
            languages: newResume.languages,
        };
        nextTick(() => {
            isChanged.value = false;
        });
    }
});

onMounted(() => {
    if (resumeStore.resume){
        sectionData.value = {
            languages: resumeStore.resume?.languages,
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

watch(() => foreign_languages.value, (newData) => {
    isChanged.value = true;
});

const {getResume, updateResume} = resumeStore;

const {errors, handleErrorResponse} = useFormValidation();
const save = async () => {
    if (isChanged.value){
        const resData = await updateResume(draftID.value, {
            form_data: 'LANGUAGES_DATA',
            languages: foreign_languages.value
        });

        if (resData.status !== 'success'){
            return handleErrorResponse(resData.data);
        }
        isChanged.value = false;
        isSaved.value = false;
        isUpdated.value = true;

        await getResume(draftID.value);
    }
}

const isCompleted = computed(() => {
    return resumeStore.resume?.languages?.length > 0;
});


</script>

<style scoped>

</style>
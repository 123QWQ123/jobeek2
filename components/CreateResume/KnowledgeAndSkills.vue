<template>
  <div class="w-box" v-click-outside="save">
      <div class="w-box-head">
        <h3 class="title">Знания и навыки</h3>
        <span class="arrow" :class="{up: isCollapsed, 'is-completed': isCompleted}" @click="isCollapsed = !isCollapsed"></span>

      </div>
      <transition>
          <div class="w-box-body" :class="{collapse: isCollapsed}">
              <div class="form_content" v-if="isShown">
                  <CreateResumeSkillsContent v-model="skills"/>
              </div>
              <div class="empty-area" v-else>
                  <span>Здесь вы можете указать релевантный опыт в сфере которую вы выбарли</span>
                  <button class="add" type="button" @click="add">Добавить</button>
              </div>
          </div>
      </transition>

  </div>

</template>

<script setup>


import useFormValidation from "~/composables/useFormValidation";
import {useResumeStore} from "~/store/resume";
import {useDiff} from "~/composables/useDiff";
import {useDictionaryStore} from "~/store/dictionary";
const educationElement = ref(false);
const route = useRoute();
const resumeStore = useResumeStore();
const dictionaryStore = useDictionaryStore();
const draftID = computed(() => route.query.draft_id);

const skills = ref(resumeStore.resume?.skills ?? []);

const isShown = ref(false);
const isChanged = ref(false);
const isSaved = ref(false);
const isCollapsed = ref(true);
const isUpdated = ref(false);

const sectionData = ref({
    skills: [],
});
watch(() => sectionData.value, (newData, oldData) => {
    const diffData =  useDiff(newData, oldData, ['id', 'created_at', 'updated_at']);
    if (Object.keys(diffData).length){
        skills.value = newData.skills;
        if (isUpdated.value){
            isUpdated.value = false;
            return;
        }
    }
});
watch(() => resumeStore.resume, (newResume) => {
    if (newResume){
        sectionData.value = {
            skills: newResume?.skills,
        };
        nextTick(() => {
            isChanged.value = false;
        });
    }
});

watch(() => skills.value, (newData) => {
    isChanged.value = true;
});

onMounted(() => {
    if (resumeStore.resume){
        sectionData.value = {
            skills: resumeStore.resume?.skills,
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


const {getResume, updateResume} = resumeStore;

const {errors, handleErrorResponse} = useFormValidation();
const save = async () => {
    console.log(isChanged.value);
    if (isChanged.value){
        const resData = await updateResume(draftID.value, {
            form_data: 'KNOWLEDGE_AND_SKILLS_DATA',
            skills: skills.value
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
    if (isUpdated.value === true){
        return skills.value.length > 0;
    }else{
        return resumeStore.resume?.skills?.length > 0;
    }
});
</script>

<style scoped>

</style>
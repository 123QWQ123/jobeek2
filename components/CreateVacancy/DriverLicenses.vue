<template>
  <div class="w-box" v-click-outside="save">
    <div class="w-box-head">
      <h3 class="title">Водительские права</h3>
      <span class="arrow" :class="{up: isCollapsed, 'is-completed': isCompleted}" @click="isCollapsed = !isCollapsed"></span>
    </div>

    <div class="text-danger d-block p-4" v-if="errors.message">
      {{ errors.message }}
    </div>
    <transition>
        <div class="w-box-body" :class="{collapse: isCollapsed}">
            <div class="form_content" v-if="isShown">
                <div class="checkboxes-row" >
                    <div class="check-block" v-for="item in driving_license_options">
                        <div class="checkbox" @click="toggle(item.id)">
                            <input type="checkbox" :id="item.id" :checked="check(item.id)"/>
                            <div class="checkbox-mask"><img src="~/assets/img/svg/check.svg" alt="#"></div>
                        </div>
                        <label :for="item.id">{{ item.name }}</label>
                    </div>
                </div>
            </div>
            <div class="empty-area" v-else>
                <span>Здесь вы можете выбрать права</span>
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
import {useDictionaryStore} from "~/store/dictionary";
const educationElement = ref(false);
const route = useRoute();
const resumeStore = useResumeStore();
const dictionaryStore = useDictionaryStore();
const draftID = computed(() => route.query.draft_id);

const driver_licenses = ref(resumeStore.resume?.driver_licenses ?? []);
const {getDriverLicenses} = dictionaryStore;
const driving_license_options = computed(() => dictionaryStore.driver_licenses);
await getDriverLicenses();
const check = (id) => {
    return driver_licenses.value.includes(id);
}
const toggle = (id) => {
    const IDs = [...driver_licenses.value];
    if (!IDs.includes(id)){
        IDs.push(id);
    }else{
        const deleteIndex = IDs.indexOf(id);
        IDs.splice(deleteIndex, 1);
    }
    driver_licenses.value = IDs;
}

const isShown = ref(false);
const isChanged = ref(false);
const isSaved = ref(false);
const isCollapsed = ref(true);
const isUpdated = ref(false);

const sectionData = ref({
    driver_licenses: [],
});
watch(() => sectionData.value, (newData, oldData) => {
    const diffData =  useDiff(newData, oldData, ['id', 'created_at', 'updated_at']);
    if (Object.keys(diffData).length){
        driver_licenses.value = newData.driver_licenses;
        if (isUpdated.value){
            isUpdated.value = false;
            return;
        }
    }
});
watch(() => resumeStore.resume, (newResume) => {
    if (newResume){
        sectionData.value = {
            driver_licenses: newResume?.driver_licenses,
        };
        nextTick(() => {
            isChanged.value = false;
        });
    }
});

watch(() => driver_licenses.value, (newData) => {
    console.log(newData);
    isChanged.value = true;
});

onMounted(() => {
    if (resumeStore.resume){
        sectionData.value = {
            driver_licenses: resumeStore.resume?.driver_licenses,
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
    if (isChanged.value){
        const resData = await updateResume(draftID.value, {
            form_data: 'DRIVER_LICENSES_DATA',
            driver_licenses: driver_licenses.value
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
        return driver_licenses.value.length > 0;
    }else{
        return resumeStore.resume?.driver_licenses?.length > 0;
    }
});

</script>

<style scoped>
.checkboxes-row{
    width: -webkit-fill-available;
}
</style>
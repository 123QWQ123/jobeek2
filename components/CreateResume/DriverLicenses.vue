<template>
  <div class="w-box" v-click-outside="save">
    <div class="w-box-head">
      <h3 class="title">Водительские права</h3>
      <span class="arrow" :class="{up: isCollapsed, 'is-completed': isCompleted}" @click="isCollapsed = !isCollapsed"></span>
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
import {useDictionaryStore} from "~/store/dictionary";
import {storeToRefs} from "pinia";
import {useWatchStateValues} from "~/composables/useWatchStateValues";

const route = useRoute();
const resumeStore = useResumeStore();
const dictionaryStore = useDictionaryStore();


const selected_licenses = ref( resumeStore.resume.driver_licenses ?? []);
const draftID = computed(() => route.query.draft_id);

const isShown = ref(false);
const isChanged = ref(false);
const isSaved = ref(false);
const isCollapsed = ref(true);
const isUpdated = ref(false);

const {getDriverLicenses} = dictionaryStore;
const {driver_licenses: driving_license_options} = storeToRefs(dictionaryStore);
await getDriverLicenses();

watch(() => useWatchStateValues(selected_licenses.value), (newData) => {
    isChanged.value = true;
});

watch(() => resumeStore.resume?.driver_licenses, (newItems) => {
    if (isUpdated.value){
        isUpdated.value = false;
        return;
    }
    if (newItems.length>0){
        selected_licenses.value = newItems;
    }
})

onMounted(() => {
    if (selected_licenses.value.length > 0){
        isShown.value = true;
        isCollapsed.value = false;
    }
})
const isCompleted = computed(() => {
    return resumeStore.resume.driver_licenses?.length > 0;
});


const {getResume, updateResume} = resumeStore;

const {errors, handleErrorResponse} = useFormValidation();
const check = (id) => {
    return selected_licenses.value.includes(id);
}
const save = async () => {
    if (isChanged.value){
        errors.value = {};
        const resData = await updateResume(draftID.value, {
            form_data: 'DRIVER_LICENSES_DATA',
            driver_licenses: selected_licenses.value
        });

        if (resData.status !== 'success'){
            return handleErrorResponse(resData.data);
        }

        isSaved.value = true;
        isChanged.value = false;


        isUpdated.value = true;
        getResume(draftID.value)

    }
}

const toggle = (id) => {
    if (!selected_licenses.value.includes(id)){
        selected_licenses.value.push(id);
    }else{
        const deleteIndex = selected_licenses.value.indexOf(id);
        selected_licenses.value.splice(deleteIndex, 1);
    }
}


</script>

<style scoped>
.checkboxes-row{
    width: -webkit-fill-available;
}
</style>
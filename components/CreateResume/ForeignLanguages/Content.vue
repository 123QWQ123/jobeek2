<template>
    <div class="w-box"  @focusout="save">
        <div class="w-box-head">
            <h3 class="title">Владение иностранными языками</h3>
        </div>
        <div class="w-box-body">
            <div class="" v-if="isFirst">
                <div class="row">
                    <CreateResumeForeignLanguagesHistory ref="componentElement" v-model="foreign_languages" />
                </div>
            </div>
            <div class="empty-area" v-else>
                <span>Здесь вы можете указать</span>
                <button class="add" type="button" @click="isFirst = !isFirst">Добавить </button>
            </div>
        </div>
    </div>
</template>

<script setup>

import CreateResume from "~/pages/create-resume.vue";

const isFirst = ref(false);
const componentElement = ref(false);

// watch(() => isFirst.value, (newValue) => {
//     if (newValue){
//         setTimeout(() => educationDocumentElement.value.reset());
//     }
// })

const foreign_languages = ref([]);

const save = () => {
    // console.log(education_documents.value)
}
</script>

<style scoped>

</style>
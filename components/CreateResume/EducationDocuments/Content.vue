<template>
  <div class="w-box"  @focusout="save">
    <div class="w-box-head">
      <h3 class="title">Сертификаты, курсы</h3>
    </div>
    <div class="w-box-body">
        <div class="" v-if="isShown">
            <div class="row">
                <CreateResumeEducationDocumentsHistory ref="educationDocumentElement" v-model="education_documents" />
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

const educationDocumentElement = ref(false);

const isShown = ref(false);
const education_documents = ref([]);

watch(() => education_documents.value, (newEduDocuments) => {
  console.log(newEduDocuments);
})
const save = () => {
  console.log(education_documents.value)
};
</script>

<style scoped>

</style>
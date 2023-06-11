<template>
  <div class="w-box"  @focusout="save">
    <div class="w-box-head">
      <h3 class="title">Сертификаты, курсы</h3>
    </div>
    <div class="w-box-body">
        <div class="" v-if="isFirst">
            <div class="row">
                <CreateResumeEducationDocumentsHistory ref="educationDocumentElement" v-model="education_documents" />
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

const isFirst = ref(false);
const educationDocumentElement = ref(false);

// watch(() => isFirst.value, (newValue) => {
//     if (newValue){
//         setTimeout(() => educationDocumentElement.value.reset());
//     }
// })

const education_documents = ref([]);

const save = () => {
    // console.log(education_documents.value)
}
</script>

<style scoped>

</style>
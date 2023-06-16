<template>
  <div class="w-box"  @focusout="save">
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

const educations = ref([]);

const educationElement = ref(false);

const isShown = ref(false);

watch(() => educations.value, (newData) => {
  console.log(newData);
})
const save = () => {
  console.log(educations.value)
};
</script>

<style scoped>

</style>
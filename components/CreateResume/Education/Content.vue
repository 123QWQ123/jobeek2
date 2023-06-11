<template>
  <div class="w-box"  @focusout="save">
    <div class="w-box-head">
      <h3 class="title">Образование</h3>
    </div>
    <div class="w-box-body">
        <div class="" v-if="isFirst">
            <div class="row">
                <CreateResumeEducationHistory v-model="educations" />
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

const educations = ref([]);

const save = () => {
    console.log(educations.value)
}
</script>

<style scoped>

</style>
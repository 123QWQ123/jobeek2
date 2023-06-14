<template>
  <div class="w-box">
      <div class="w-box-head">
        <h3 class="title">Знания и навыки</h3>
      </div>
      <div class="w-box-body">
          <div class="form_content" v-if="isShown">
<!--              <CreateResumeForeignLanguages v-if="isShown" @set="updateState"></CreateResumeForeignLanguages>-->

              <CreateResumeSkillsContent/>
          </div>
          <div class="empty-area" v-else>
              <span>Здесь вы можете указать релевантный опыт в сфере которую вы выбарли</span>
              <button class="add" type="button" @click="add">Добавить</button>
          </div>
      </div>

      <div class="w-box-foot d-flex justify-content-end" v-if="hasChanged">
          <button class="btn p-2 btn-outline-primary add" type="button">Сохранить</button>
      </div>
  </div>

</template>

<script setup>
const emit = defineEmits(['set']);
const isShown = ref(false);
const hasChanged = ref(false);

const add  = () => {
    isShown.value = !isShown.value;
    hasChanged.value = true;
}

const updateState = (name, value) => {
    console.log(name, value);
    emit('set', name, value);
};
</script>

<style scoped>

</style>
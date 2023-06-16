<template>
  <div class="w-box">
      <div class="w-box-head">
        <h3 class="title">Знания и навыки</h3>
      </div>
      <div class="w-box-body">
          <div class="form_content" v-if="isShown">
              <CreateResumeSkillsContent v-model="skills"/>
          </div>
          <div class="empty-area" v-else>
              <span>Здесь вы можете указать релевантный опыт в сфере которую вы выбарли</span>
              <button class="add" type="button" @click="add">Добавить</button>
          </div>
      </div>

  </div>

</template>

<script setup>
const isShown = ref(false);
const skills = ref([]);

const add  = () => {
    isShown.value = !isShown.value;
}

watch(() => skills.value, (newSkills) => {
  console.log(newSkills);
})
const save = (items) => {
  console.log(items);
  console.log(skills.value)
};
</script>

<style scoped>

</style>
<template>
  <div class="input-row" v-if="isButton">
      <button>Добавить</button>
  </div>
  <div class="input-row" v-else>
      {{ props.selectedLanguages }}
      -
      {{selectedLanguage}}
      -
      {{selectedLanguageLevel}}
      <div class="row mb-3">
          <div class="c2">
              <div class="input-wrapper">
                  <SelectWithSearch :options="props.languages" v-model.number="selectedLanguage"></SelectWithSearch>
              </div>
              <div class="input-wrapper">
                  <CustomSelect :options="props.languageLevels" v-model.number="selectedLanguageLevel"></CustomSelect>
              </div>
          </div>
      </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['add', 'delete', 'update'])
const props = defineProps({
    languages: {
        required: true,
        type: Array
    },
    languageLevels: {
        required: true,
        type: Array
    },
    selectedLanguages: {
        required: true,
        type: Array
    },
});


const isButton = computed(() => {
    return props.selectedLanguages.length > 1 && props.selectedLanguages[props.selectedLanguages.length-1] === 0;
});
const selectedLanguage = ref(null);
const selectedLanguageLevel = ref(null);

watch(() => selectedLanguageLevel.value, (newLevel) => {
    console.log(newLevel);
    if (newLevel && selectedLanguage.value){
        emit('add', {id: selectedLanguage.value, level: newLevel});
    }
})
watch(() => selectedLanguage.value, (newLanguage) => {
    console.log(newLanguage);

    if (selectedLanguageLevel.value && newLanguage){
        emit('add', {id: newLanguage, level: selectedLanguageLevel.value});
    }
});

onMounted(() => {
    console.log(1);
})
</script>

<style scoped>

</style>
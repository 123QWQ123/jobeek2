<template>
  <div class="row position-relative">
      <span class="position-absolute absoluted_icon" @click="deleteItem">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
          </svg>
      </span>
      <div class="col-12">
          <div class="c2">
              <div class="input-wrapper">
                  <SelectWithSearch :placeholder="'Выберите'" :options="languageOptions" v-model.number="selectedLanguage"></SelectWithSearch>
              </div>
              <div class="input-wrapper">
                  <CustomSelect :options="props.languageLevels" v-model.number="selectedLanguageLevel"></CustomSelect>
              </div>
          </div>
      </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['delete', 'update'])
const props = defineProps({
    isNew: {
        required: false,
        default: false
    },
    id: {
        required: true,
        default: null
    },
    level: {
        required: true,
        default: null
    },
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


const isNew = ref(props.isNew);
const selectedLanguage = ref(props.id);
const selectedLanguageLevel = ref(props.level);

watch(() => selectedLanguage.value, (newLanguage) => {
    if (selectedLanguageLevel.value && newLanguage){
        emit('update', props.id, {id: newLanguage, level: selectedLanguageLevel.value});
    }
});

watch(() => selectedLanguageLevel.value, (newLevel) => {
    if (newLevel && selectedLanguage.value){
        emit('update', props.id, {id: selectedLanguage.value, level: newLevel});
    }
})

const languageOptions = computed(() => {
    const selectedIDs = props.selectedLanguages.map(({id}) => id);
    const filtered = props.languages.filter(item => !selectedIDs.includes(item.value) || item.value === props.id);
    return filtered;
})

const deleteItem = (id = null) => {
    emit('delete', selectedLanguage.value);
}

onMounted(() => {
    if (props.id){
        isNew.value = false;
    }
})
</script>

<style scoped>
.absoluted_icon{
    position: absolute;
    left: -2rem;
    top: .5rem;
    font-size: 1rem;
    z-index: 1;
    cursor: pointer;
    max-width: 3rem;
}
.absoluted_icon svg{
    width: 24px;
    height: 24px;
}
</style>
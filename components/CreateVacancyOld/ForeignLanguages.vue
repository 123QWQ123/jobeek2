<template>
  <div class="input-row">

    <div class="left">
        <label>Владение иностранными языками</label>
    </div>
    <div class="right">
        <SharedComponentsForeignLanguagesWrapper v-model="selectedLanguages" />
    </div>

  </div>
</template>

<script setup>
import {useDictionaryStore} from "~/store/dictionary";

const emit  = defineEmits(['set']);
const dictionaryStore = useDictionaryStore();

const selectedLanguages = ref([]);

watch(selectedLanguages, (newValues) => {
    emit('set', 'languages', newValues);
})
</script>

<style scoped>

</style>
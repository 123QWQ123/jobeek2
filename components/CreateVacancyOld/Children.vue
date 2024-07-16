<template>
  <div class="input-row">
    <label for="remote-work">Дети</label>
    <div class="input-wrapper">
        <CustomSelect :options="childrenOptions" v-model="children"></CustomSelect>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['set']);
const props = defineProps({
  modelValue: {
    required: false,
    default: 15
  }
});
import {useDictionaryStore} from "~/store/dictionary";
const dictionaryStore = useDictionaryStore();
const {getChildren} = dictionaryStore;
await getChildren();

const childrenOptions = computed(() => dictionaryStore.children.map(item => ({value: item.id, name: item.name})));

const children = ref(15);

watch(children, (newValues) => {
    emit('set', 'children', newValues);
})
</script>

<style scoped>

</style>
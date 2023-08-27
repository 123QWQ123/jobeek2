<template>
  <QuillEditor class="rich_editor" :options="richEditorOptions" ref="quillEditor" toolbar="minimal" @textChange="onInput" :contentType="'html'" />
</template>

<script>
export default {
  name: "RichEditor",
}
</script>

<script setup>

const props = defineProps(['options', 'modelValue', 'listStyles']);
const emit = defineEmits(['change', 'update:modelValue']);
const options = computed(() => props.options);
const current = ref(props.modelValue);
watch(
    current,
    (newValue) => {
      emit('update:modelValue', newValue);
})
const quillEditor = ref();

onMounted(() => {
  quillEditor.value.setHTML(props.modelValue ?? '');
});

watch(() => props.modelValue, (newValue) => {
  quillEditor.value.setHTML(newValue ?? '');
})
const onInput = (input) => {
  current.value = quillEditor.value.getHTML();
}

const richEditorOptions = {
  compatibilityMode: false
}
</script>

<style>
.rich_editor{
  height: 180px;
}
</style>
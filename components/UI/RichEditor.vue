<template>
<!--  <QuillEditor class="rich_editor" :options="richEditorOptions" ref="quillEditor" toolbar="minimal" @textChange="onInput" :contentType="'html'" />-->
<!--  <no-ssr>-->
<!--    -->
<!--&lt;!&ndash;    <mavon-editor :toolbars="mavonOptions" v-model="current"/>&ndash;&gt;-->
<!--  </no-ssr>-->
  <client-only>
    <TinyMC-Editor api-key="no-api-key" v-model="current" :init="tinyMCEditorOptions"></TinyMC-Editor>
  </client-only>
</template>

<script>
export default {
  name: "RichEditor",
}
</script>

<script setup>
import {useNuxtApp} from "#app";

const app = useNuxtApp();

const props = defineProps(['options', 'modelValue', 'listStyles']);
const emit = defineEmits(['change', 'update:modelValue']);
const options = computed(() => props.options);
const current = ref(props.modelValue ?? "<p>Test</p>");
watch(
    () => current.value,
    (newValue) => {
      emit('update:modelValue', newValue);
})
const quillEditor = ref();
const vueEditor = ref();

watch(() => props.modelValue, (newValue) => {
  current.value = newValue;
});

const onInput = (input) => {
  // current.value = quillEditor.value.getHTML();
}

const richEditorOptions = {
  compatibilityMode: false
}

const mavonOptions = {

}

const tinyMCEditorOptions = {
  menubar: false,
  plugins: 'lists link image emoticons',
  toolbar: 'bold italic underline| alignleft aligncenter alignright alignjustify | bullist numlist | link emoticons'
};
</script>

<style>
.rich_editor{
  height: 180px;
}

.tox-notifications-container{
  display: none;
}
</style>
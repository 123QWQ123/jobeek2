<template>
  <client-only>
    <QuillEditor theme="snow" v-model:content="current" contentType="html" />
  </client-only>
</template>

<script>
export default {
  name: "CustomQuilRichEditor",
};
</script>

<script setup>
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { QuillEditor } from "@vueup/vue-quill";
import { useNuxtApp } from "#app";

const app = useNuxtApp();
app.vueApp.component("QuillEditor", QuillEditor);

const props = defineProps(["options", "modelValue", "listStyles"]);
const emit = defineEmits(["change", "update:modelValue"]);
// const options = computed(() => props.options);
const current = ref("");

watch(
  () => current.value,
  (newValue) => {
    emit("update:modelValue", newValue);
  },
);
watch(
  () => props.modelValue,
  (newValue) => {
    current.value = newValue;
  },
);
</script>

<style></style>

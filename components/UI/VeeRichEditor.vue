<template>
  <!--  <editor-content :editor="editor" />-->
  <Editor v-model="content" />
  <!--  <Editor v-model="content" />-->
  <div class="text text-danger">
    {{ errorMessage }}
  </div>
</template>

<script setup>
import { useField } from "vee-validate";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: {
    required: false,
    type: String,
    default: "",
  },
  name: {
    required: true,
    type: String,
    default: "editor",
  },
});

const { value: content, setValue, errorMessage } = useField(() => props.name);
const phoneElement = ref();

watch(
  () => content.value,
  (newValue) => {
    if (content.value) {
      setValue(newValue);
      emit("update:modelValue", content.value);
    }
  },
);
watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue) {
      content.value = newValue;
    }
  },
);

defineExpose({
  focus,
});
</script>

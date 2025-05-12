<script setup>
import { useField } from "vee-validate";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
    required: false,
  },
  name: {
    type: String,
    default: "content",
  },
  value: {
    required: false,
  },
});

const { value: content, setValue, errorMessage } = useField(() => props.name);

const editor = ref(
  useEditor({
    content: props.value || content.value,
    extensions: [TiptapStarterKit],
    onUpdate: () => {
      setValue(editor.value?.getHTML());
    },
  }),
);

watch(
  () => content.value,
  (value) => {
    const isSame = editor.value.getHTML() === value;
    if (!isSame) {
      editor.value.commands.setContent(value, false);
    }
  },
);

const emit = defineEmits(["update:modelValue"]);

// onBeforeMount(() => {
//   editor.value?.destroy();
//   editor.value = null;
// });
</script>

<template>
  <div>
    <TipTapToolbar v-if="editor" :editor="editor" />

    <TiptapEditorContent :editor="editor" class="parsed_content" />
    <div class="text text-danger">
      {{ errorMessage }}
    </div>
  </div>
</template>

<style>
.parsed_content {
  font-family: var(--font-family);
  font-feature-settings: var(--font-feature-settings, normal);
  font-size: 1rem;
  color: #000;
  border: 1px solid #bbbbbb;
  transition:
    background-color 0.2s,
    color 0.2s,
    border-color 0.2s,
    box-shadow 0.2s,
    outline-color 0.2s;
  appearance: none;
  border-radius: 6px;
  outline-color: transparent;
  padding: 1rem;
}

.parsed_content strong {
  font-weight: bolder;
}

.parsed_content em {
  font-style: italic;
}

.parsed_content s {
  text-decoration: line-through;
}

.parsed_content ul {
  list-style-type: disc;
  padding-left: 1em;
}

.parsed_content ol {
  list-style-type: number;
  padding-left: 1em;
}

.parsed_content ul li {
  padding-left: 0.5em;
}

.parsed_content ol li {
  padding-left: 0.5em;
}
</style>

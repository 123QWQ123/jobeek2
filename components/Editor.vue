<template>
  <div>
    <button
      @click.prevent="editor.chain().focus().toggleBold().run()"
      :disabled="!editor.can().chain().focus().toggleBold().run()"
      :class="{ 'is-active': editor.isActive('bold') }"
    >
      bold
    </button>
    <!--    <button-->
    <!--      @click="editor.chain().focus().run()"-->
    <!--      :disabled="!editor.chain().focus().run()"-->
    <!--      :class="{ 'is-active': editor.isActive('italic') }"-->
    <!--    >-->
    <!--      italic-->
    <!--    </button>-->
    <!--    <button-->
    <!--      @click="editor.chain().focus().run()"-->
    <!--      :disabled="!editor.value.can().chain().focus().toggleStrike().run()"-->
    <!--      :class="{ 'is-active': editor.isActive('strike') }"-->
    <!--    >-->
    <!--      strike-->
    <!--    </button>-->
    <editor-content :editor="editor" />
    {{ 1 }}
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: "<p>I’m running Tiptap with Vue.js. 🎉</p>",
  },
});
const emit = defineEmits(["update:modelValue"]);
import { Editor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";

const editor = ref(
  new Editor({
    extensions: [StarterKit],
    content: props.modelValue,
    onUpdate: () => {
      // HTML
      emit("update:modelValue", editor.value.getHTML());

      // JSON
      // this.$emit('update:modelValue', this.editor.getJSON())
    },
  }),
);

watch(
  () => props.modelValue,
  (newValue) => {
    // HTML
    const isSame = editor.value.getHTML() === newValue;

    // JSON
    // const isSame = JSON.stringify(this.editor.getJSON()) === JSON.stringify(value)

    if (isSame) {
      return;
    }

    editor.value.commands.setContent(newValue, false);
  },
);
onMounted(() => {
  editor.value = new Editor({
    extensions: [StarterKit],
    content: props.modelValue,
    onUpdate: () => {
      // HTML
      emit("update:modelValue", editor.value.getHTML());

      // JSON
      // this.$emit('update:modelValue', this.editor.getJSON())
    },
  });
});
onUnmounted(() => {
  editor.value.destroy();
});
</script>
<!--<script>-->
<!--// import StarterKit from "@tiptap/starter-kit";-->
<!--// import { Editor, EditorContent } from "@tiptap/vue-3";-->

<!--export default {-->
<!--  components: {-->
<!--    EditorContent,-->
<!--  },-->

<!--  props: {-->
<!--    modelValue: {-->
<!--      type: String,-->
<!--      default: "",-->
<!--    },-->
<!--  },-->

<!--  emits: ["update:modelValue"],-->

<!--  data() {-->
<!--    return {-->
<!--      editor: null,-->
<!--    };-->
<!--  },-->

<!--  watch: {-->
<!--    modelValue(value) {-->
<!--      // HTML-->
<!--      const isSame = this.editor.getHTML() === value;-->

<!--      // JSON-->
<!--      // const isSame = JSON.stringify(this.editor.getJSON()) === JSON.stringify(value)-->

<!--      if (isSame) {-->
<!--        return;-->
<!--      }-->

<!--      this.editor.commands.setContent(value, false);-->
<!--    },-->
<!--  },-->

<!--  mounted() {-->
<!--    this.editor = new Editor({-->
<!--      extensions: [StarterKit],-->
<!--      content: this.modelValue,-->
<!--      onUpdate: () => {-->
<!--        // HTML-->
<!--        this.$emit("update:modelValue", this.editor.getHTML());-->

<!--        // JSON-->
<!--        // this.$emit('update:modelValue', this.editor.getJSON())-->
<!--      },-->
<!--    });-->
<!--  },-->

<!--  beforeUnmount() {-->
<!--    this.editor.destroy();-->
<!--  },-->
<!--};-->
<!--</script>-->

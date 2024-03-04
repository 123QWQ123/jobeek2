<template>
  <div class="wrapper wrapper-1290">
    <TipTapToolbar v-if="editor" :editor="editor" />
    <TiptapEditorContent :editor="editor" class="parsed_content" />
  </div>
</template>

<script setup>
const editor = useEditor({
  content: "<p>I'm running Tiptap with Vue.js. 🎉</p>",
  extensions: [TiptapStarterKit],
});
</script>

<style>
.parsed_content {
  font-family: var(--font-family);
  font-feature-settings: var(--font-feature-settings, normal);
  font-size: 1rem;
  color: #000;
  //background: #d5d5d5;
  //padding: 0.5rem 0.75rem;
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
  padding: 1rem 2rem;
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
  list-style-type: circle;
}

.parsed_content ol {
  list-style-type: number;
}

.parsed_content ul li {
  //padding-left: 1.5rem;
}
</style>

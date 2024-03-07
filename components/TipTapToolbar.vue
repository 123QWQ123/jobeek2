<template>
  <div class="tiptap-toolbar border-black border-1 py-1">
    <button
      @click.prevent="editor.chain().focus().toggleBold().run()"
      :disabled="!editor.can().chain().focus().toggleBold().run()"
      :class="{ 'is-active': editor.isActive('bold') }"
    >
      <svg
        class="svg-icon"
        style="
          width: 1em;
          height: 1em;
          vertical-align: middle;
          fill: currentColor;
          overflow: hidden;
        "
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M576 661.333H426.667v-128H576c35.413 0 64 28.587 64 64 0 35.414-28.587 64-64 64m-149.333-384h128c35.413 0 64 28.587 64 64 0 35.414-28.587 64-64 64h-128m238.933 55.04C706.987 431.36 736 384 736 341.333c0-96.426-74.667-170.666-170.667-170.666H298.667V768H599.04c89.6 0 158.293-72.533 158.293-161.707 0-64.853-36.693-120.32-91.733-145.92z"
        />
      </svg>
    </button>
    <button
      @click.prevent="editor.chain().focus().toggleItalic().run()"
      :disabled="!editor.can().chain().focus().toggleItalic().run()"
      :class="{ 'is-active': editor.isActive('italic') }"
    >
      <svg
        class="svg-icon"
        style="
          width: 1em;
          height: 1em;
          vertical-align: middle;
          fill: currentColor;
          overflow: hidden;
        "
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M748.307692 242.215385V216.615385c0-21.661538-17.723077-39.384615-39.384615-39.384616H433.230769c-21.661538 0-39.384615 17.723077-39.384615 39.384616v39.384615c0 21.661538 17.723077 39.384615 39.384615 39.384615 33.476923 0 59.076923 31.507692 51.2 63.015385L413.538462 704.984615c-5.907692 25.6-27.569231 43.323077-51.2 43.323077H315.076923c-21.661538 0-39.384615 17.723077-39.384615 39.384616v39.384615c0 21.661538 17.723077 39.384615 39.384615 39.384615h275.692308c21.661538 0 39.384615-17.723077 39.384615-39.384615v-39.384615c0-21.661538-17.723077-39.384615-39.384615-39.384616-33.476923 0-59.076923-31.507692-51.2-63.015384L610.461538 338.707692c5.907692-25.6 27.569231-43.323077 51.2-43.323077h33.476924c29.538462 0 53.169231-23.630769 53.16923-53.16923z"
        />
      </svg>
    </button>
    <button
      @click.prevent="editor.chain().focus().toggleStrike().run()"
      :disabled="!editor.can().chain().focus().toggleStrike().run()"
      :class="{ 'is-active': editor.isActive('strike') }"
    >
      <svg
        class="svg-icon"
        style="
          width: 1em;
          height: 1em;
          vertical-align: middle;
          fill: currentColor;
          overflow: hidden;
        "
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M898.719 512v70.312H744.383c35.156 75.235 33.398 281.25-219.024 281.25-292.851 1.758-281.601-228.515-281.601-228.515l139.57 1.758c1.055 118.476 111.094 118.476 132.89 117.07 22.5-1.758 106.524-1.406 113.204-83.672 2.812-38.32-35.86-67.5-78.047-87.89H125.281V512H898.72M772.508 367.508l-139.922-1.055s5.976-97.383-115.313-97.734c-121.289-0.703-110.742 77.343-110.742 87.187 1.407 9.844 11.953 58.36 105.469 81.563H290.867S168.172 200.867 467.703 160.437c306.211-42.187 305.508 207.774 304.805 207.07z"
        />
      </svg>
    </button>
    <button
      @click.prevent="editor.chain().focus().setParagraph().run()"
      :class="{ 'is-active': editor.isActive('paragraph') }"
    >
      <svg
        class="svg-icon"
        style="
          width: 1em;
          height: 1em;
          vertical-align: middle;
          fill: currentColor;
          overflow: hidden;
        "
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M554.666667 576H128a42.666667 42.666667 0 0 0 0 85.333333h426.666667a42.666667 42.666667 0 0 0 0-85.333333z m341.333333-213.333333H128a42.666667 42.666667 0 0 0 0 85.333333h768a42.666667 42.666667 0 0 0 0-85.333333z"
        />
      </svg>
    </button>
    <!--      <button-->
    <!--        @click.prevent="editor.chain().focus().toggleHeading({ level: 1 }).run()"-->
    <!--        :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"-->
    <!--      >-->
    <!--        h1-->
    <!--      </button>-->
    <!--      <button-->
    <!--        @click.prevent="editor.chain().focus().toggleHeading({ level: 2 }).run()"-->
    <!--        :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"-->
    <!--      >-->
    <!--        h2-->
    <!--      </button>-->
    <!--      <button-->
    <!--        @click.prevent="editor.chain().focus().toggleHeading({ level: 3 }).run()"-->
    <!--        :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"-->
    <!--      >-->
    <!--        h3-->
    <!--      </button>-->
    <!--      <button-->
    <!--        @click.prevent="editor.chain().focus().toggleHeading({ level: 4 }).run()"-->
    <!--        :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }"-->
    <!--      >-->
    <!--        h4-->
    <!--      </button>-->
    <!--      <button-->
    <!--        @click.prevent="editor.chain().focus().toggleHeading({ level: 5 }).run()"-->
    <!--        :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }"-->
    <!--      >-->
    <!--        h5-->
    <!--      </button>-->
    <!--      <button-->
    <!--        @click.prevent="editor.chain().focus().toggleHeading({ level: 6 }).run()"-->
    <!--        :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }"-->
    <!--      >-->
    <!--        h6-->
    <!--      </button>-->
    <button
      @click.prevent="editor.chain().focus().toggleBulletList().run()"
      :class="{ 'is-active': editor.isActive('bulletList') }"
    >
      <svg
        class="svg-icon"
        style="
          width: 1em;
          height: 1em;
          vertical-align: middle;
          fill: currentColor;
          overflow: hidden;
        "
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M298.667 213.333v85.334H896v-85.334M298.667 554.667H896v-85.334H298.667m0 341.334H896v-85.334H298.667m-128-14.08c-31.574 0-56.747 25.6-56.747 56.747s25.6 56.747 56.747 56.747c31.146 0 56.746-25.6 56.746-56.747s-25.173-56.747-56.746-56.747m0-519.253c-35.414 0-64 28.587-64 64s28.586 64 64 64c35.413 0 64-28.587 64-64s-28.587-64-64-64m0 256c-35.414 0-64 28.587-64 64s28.586 64 64 64c35.413 0 64-28.587 64-64s-28.587-64-64-64z"
        />
      </svg>
    </button>
    <button
      @click.prevent="editor.chain().focus().toggleOrderedList().run()"
      :class="{ 'is-active': editor.isActive('orderedList') }"
    >
      <svg
        class="svg-icon"
        style="
          width: 1em;
          height: 1em;
          vertical-align: middle;
          fill: currentColor;
          overflow: hidden;
        "
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M298.667 554.667H896v-85.334H298.667m0 341.334H896v-85.334H298.667m0-426.666H896v-85.334H298.667m-213.334 256h76.8l-76.8 89.6v38.4h128v-42.666h-76.8l76.8-89.6v-38.4h-128M128 341.333h42.667V170.667H85.333v42.666H128m-42.667 512h85.334v21.334H128v42.666h42.667v21.334H85.333v42.666h128V682.667h-128v42.666z"
        />
      </svg>
    </button>
    <!--      <button-->
    <!--        @click.prevent="editor.chain().focus().toggleCodeBlock().run()"-->
    <!--        :class="{ 'is-active': editor.isActive('codeBlock') }"-->
    <!--      >-->
    <!--        code block-->
    <!--      </button>-->
    <!--      <button-->
    <!--        @click.prevent="editor.chain().focus().toggleBlockquote().run()"-->
    <!--        :class="{ 'is-active': editor.isActive('blockquote') }"-->
    <!--      >-->
    <!--        blockquote-->
    <!--      </button>-->
    <button @click.prevent="editor.chain().focus().setHorizontalRule().run()">
      <svg
        class="svg-icon"
        style="
          width: 1em;
          height: 1em;
          vertical-align: middle;
          fill: currentColor;
          overflow: hidden;
        "
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M63.6 489.6h896.7v44.8H63.6z" />
      </svg>
    </button>
    <button @click.prevent="editor.chain().focus().setHardBreak().run()">
      <svg
        class="svg-icon"
        style="
          width: 1em;
          height: 1em;
          vertical-align: middle;
          fill: currentColor;
          overflow: hidden;
        "
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M127.389 851.634l724.21-724.21 45.198 45.196-724.211 724.212z"
        />
      </svg>
    </button>
    <button
      @click.prevent="editor.chain().focus().undo().run()"
      :disabled="!editor.can().chain().focus().undo().run()"
    >
      <svg
        class="svg-icon"
        style="
          width: 1em;
          height: 1em;
          vertical-align: middle;
          fill: currentColor;
          overflow: hidden;
        "
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M76 463.7l294.8 294.9c19.5 19.4 52.8 5.6 52.8-21.9V561.5c202.5-8.2 344.1 59.5 501.6 338.3 8.5 15 31.5 7.9 30.6-9.3-30.5-554.7-453-571.4-532.3-569.6v-174c0-27.5-33.2-41.3-52.7-21.8L75.9 420c-12 12.1-12 31.6 0.1 43.7z"
        />
      </svg>
    </button>
    <button
      @click.prevent="editor.chain().focus().redo().run()"
      :disabled="!editor.can().chain().focus().redo().run()"
    >
      <svg
        class="svg-icon"
        style="
          width: 1em;
          height: 1em;
          vertical-align: middle;
          fill: currentColor;
          overflow: hidden;
        "
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M946.8 420L651.9 125.1c-19.5-19.5-52.7-5.7-52.7 21.8v174c-79.3-1.8-501.8 14.9-532.3 569.6-0.9 17.2 22.1 24.3 30.6 9.3C255 621 396.6 553.3 599.1 561.5v175.2c0 27.5 33.3 41.3 52.8 21.9l294.8-294.9c12.1-12.1 12.1-31.6 0.1-43.7z"
        />
      </svg>
    </button>
  </div>
</template>

<script setup>
const props = defineProps(["editor"]);
const editor = ref(props.editor);

watch(
  () => props.props,
  () => {
    editor.value = props.editor;
  },
);
</script>

<style>
.tiptap-toolbar {
  background-color: #f6f6f6;
  border-radius: 10%;
}

.tiptap-toolbar button.is-active {
  border: 1px solid #7f8b99;
}

.tiptap-toolbar button {
  padding: 2px 6px;
  border-radius: 10%;
  margin-right: 0.5rem;
  border: 1px solid transparent;
}

.tiptap-toolbar button:hover {
  background-color: #7f8b99;
}
</style>

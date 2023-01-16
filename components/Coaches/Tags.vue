<template>
  <div>
    <input
      class="form-control"
      id="tags"
      type="text"
      :class="{ 'is-invalid': !valid }"
      placeholder="Enter tags"
      :value="currentTag.name"
      @keyup="onChangeCurrentTag"
      :data-id="currentTag.id"
      @keydown.enter.prevent="onSubmitCurrentTag($event)"
    />

    <progress-bar
      @setValue="onChangeProgress"
      :name="currentTag.name"
      :value="currentTag.value"
    ></progress-bar>
    <span
      class="badge bg-secondary mx-1"
      style="cursor: pointer"
      v-for="item in tags"
      :key="item.id"
      @click="setCurrentTag(item.id)"
      >{{ item.name }}</span
    >
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";

export default {
  emits: ["set-tags"],
  props: ["valid", "items"],

  setup(props, { emit }) {
    const state = reactive({
      currentTag: {
        id: 1,
        value: 0,
        name: "",
      },
      isValid: true,
      tags: props.items,
      ...props,
    });
    function onChangeCurrentTag(e) {
      state.currentTag.name = e.target.value;
    }
    function onChangeProgress(new_value) {
      state.currentTag.value = parseFloat(new_value);
    }

    function onSubmitCurrentTag(e) {
      e.preventDefault();
      const selectedTag = state.tags.find(
        (item) => item.id === state.currentTag.id
      );
      if (!selectedTag) {
        state.tags.push({ ...state.currentTag });
        state.currentTag.id++;
        state.currentTag.name = "";
        state.currentTag.value = 0;
      } else {
        const selectedTagIndex = state.tags.findIndex(
          (item) => item.id === state.currentTag.id
        );
        const selectedTag = state.tags[selectedTagIndex];
        selectedTag.name = state.currentTag.name;
        selectedTag.value = state.currentTag.value;
        state.currentTag.id = state.tags.length + 1;
        state.currentTag.name = "";
        state.currentTag.value = 0;
      }

      emit("set-tags", [...state.tags]);
    }

    function setCurrentTag(id) {
      const selectedTag = state.tags.find((item) => item.id === id);
      if (selectedTag) {
        state.currentTag = { ...selectedTag };
      }
    }

    return {
      ...toRefs(state),
      onChangeCurrentTag,
      onChangeProgress,
      setCurrentTag,
      onSubmitCurrentTag,
    };
  },
};
</script>
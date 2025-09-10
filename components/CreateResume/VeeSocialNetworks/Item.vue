<template>
  <div class="row position-relative">
    <span class="position-absolute absoluted_icon delete-icon-item" @click="deleteItem">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-x"
        viewBox="0 0 16 16"
      >
        <path
          d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
        />
      </svg>
    </span>
    <div>
      <input type="text" placeholder="URL" v-model="state.url.val" />
      <div class="text-danger d-block" v-if="errors.message">
        {{ errors.message }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { useDictionaryStore } from "~/store/dictionary";

const emit = defineEmits(["delete", "update"]);
const props = defineProps({
  isNew: {
    required: false,
    default: false,
  },
  item: {
    required: false,
    default: false,
  },
  errors: {
    required: true,
    default: {},
  },
});

const errors = ref(props.errors ?? {});
watch(
  () => props.errors,
  (newErrors) => {
    errors.value = newErrors;
  }
);

const dictionaryStore = useDictionaryStore();

const isNew = ref(props.isNew);

const deleteItem = (id = null) => {
  emit("delete", props.item.key);
};

const state = reactive({
  url: {
    val: props.item.url,
    isValid: null,
    is_hidden: false,
  },
});

const save = () => {
  emit("update", props.item.key, { item: state.url.val, key: props.item.key });
};
watch(() => state.url.val, save);
</script>

<style scoped>


</style>

<template>
  <div
    class="nice-select n-select d-select"
    :class="{ open: isOpen }"
    v-click-outside="() => (isOpen = false)"
    tabindex="0"
  >
    <input
      class="current"
      @input="onChangeHandler"
      @focusin="onFocus"
      @focusout="onFocusout"
      :placeholder="props.placeholder"
      :class="{ placeholder: placeholderClass }"
    />
    <span class="select_arrow" @click="toggle"></span>
    <ul class="list" :style="listStyles" v-if="isOpen">
      <li
        v-for="item in options"
        :key="item.value"
        :data-value="item.value"
        class="option"
        @click="onSelect(item.value)"
        :style="listItemStyles"
      >
        {{ item.name }}
      </li>

      <li v-if="options.length === 0">
        <span v-if="isFirstOpen">{{ props.hint }}</span>
        <span v-else>{{ props.not_found }}</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "SelectWithSearch",
};
</script>

<script setup>
const emit = defineEmits(["change", "update:modelValue", "input"]);
const props = defineProps({
  options: {
    required: true,
  },
  label: {
    required: false,
  },
  placeholder: {
    required: false,
  },
  listStyles: {
    required: false,
  },
  listItemStyles: {
    required: false,
  },
  modelValue: {
    required: true,
    default: null,
  },
  selected: {
    required: false,
  },
  not_found: {
    required: false,
    type: String,
    default: "Не найдено",
  },
  hint: {
    required: false,
    type: String,
    default: "Введите...",
  },
});

const isFirst = ref(false);
const isFirstOpen = ref(true);
const isOpen = ref(false);

// watch(
//   () => isOpen.value,
//   (newValue) => {
//     console.log(newValue);
//
//   },
// );

const options = ref(props.options);
const searchInput = ref(props.placeholder ?? "");

watch(
  () => props.placeholder,
  () => (searchInput.value = props.placeholder),
);

watch(
  () => props.options,
  (newOptions) => {
    options.value = newOptions;
    if (props.modelValue) {
      selectedOption.value = options.value.find(
        (item) => String(item.value) === String(props.modelValue),
      );
    }
  },
);
watch(
  () => props.modelValue,
  (newValue) => {
    selectedOption.value = options.value.find(
      (item) => String(item.value) === String(newValue),
    );
  },
);

const selectedOption = ref({});

watch(
  () => selectedOption.value,
  () => (searchInput.value = selectedOption.value?.name),
);

onMounted(() => {
  if (props.modelValue) {
    selectedOption.value = options.value.find(
      (item) => String(item.value) === String(props.modelValue),
    );
  }
});

const input = ref("");

const placeholderClass = computed(() => {
  return isFirst.value || !selectedOption.value;
});

const searchInputElement = ref();

function toggle() {
  isOpen.value = !isOpen.value;
}

watch(
  () => isOpen.value,
  (newOpen) => {
    if (!newOpen) {
      if (searchInput.value === "") {
        searchInput.value = props.placeholder;
      }
    }
  },
);

function onSelect(id) {
  const selectedOptionItem = options.value.find(
    (item) => String(item.value) === String(id),
  );
  if (selectedOptionItem) {
    selectedOption.value = selectedOptionItem;
    searchInput.value = selectedOptionItem.name;
    emit("change", selectedOptionItem);
    emit("update:modelValue", id);
    isOpen.value = false;
  }
}

const onChangeHandler = (e) => {
  isOpen.value = true;

  const typedName = e.target.value.toLowerCase();
  if (typedName.length > 0) isFirstOpen.value = false;

  emit("input", typedName);
  if (typedName === "") {
    options.value = props.options;
  } else {
    options.value = props.options.filter((item) =>
      String(item.name).toLowerCase().includes(typedName),
    );
  }
};

const onFocus = (e) => {
  if (props.placeholder === searchInput.value) {
    searchInput.value = "";
  }
  isOpen.value = true;
  emit("input", searchInput.value);
};

function close() {
  isOpen.value = false;
}
</script>

<style>
.select2-container .select2-selection--multiple .select2-selection__rendered {
  flex-wrap: wrap !important;
}
</style>
<style scoped>
.list {
  max-height: 0vh;
}

input.current::-webkit-outer-spin-button,
input.current::-webkit-inner-spin-button {
  -webkit-appearance: none;
  -moz-appearance: textfield;
}

input {
  padding-left: 5px !important;
}

.current {
  color: #0a2540;
  width: 100%;
  height: unset !important;
  cursor: pointer;
  margin: 0;
  padding-left: 0;
}

.placeholder {
  font-weight: 400 !important;
  font-size: 16px;
  line-height: 22px;
  background-color: unset;
  opacity: 1;
}

.placeholder {
  font-weight: 400 !important;
  font-size: 16px;
  line-height: 22px;
  background-color: unset;
  opacity: 1;
}

.nice-select:after {
  display: none;
}

.select_arrow {
  border-bottom: 2px solid #999;
  border-right: 2px solid #999;
  content: "";
  display: block;
  height: 8px;
  margin-top: -4px;
  pointer-events: initial;
  position: absolute;
  right: 16px;
  top: 50%;
  transform-origin: 66% 66%;
  transform: rotate(45deg);
  transition: all 0.15s ease-in-out;
  width: 8px;
}
</style>

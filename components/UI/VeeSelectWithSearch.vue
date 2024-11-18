<template>
  <div>
    <div
      class="nice-select n-select d-select"
      :class="{ open: isOpen }"
      v-click-outside="() => (isOpen = false)"
      tabindex="0"
    >
      <input
        class="current"
        ref="inputRef"
        v-model="searchInput"
        @input="onChangeHandler"
        role="spinbutton"
        autocomplete="off"
        autofill="off"
        @focusin="onFocus"
        @focusout="onFocusout"
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
          {{ props.not_found }}
        </li>
      </ul>
    </div>

    <div class="text-danger">
      {{ errorMessage }}
    </div>
    <div class="text-danger" v-if="props.error">
      {{ props.error }}
    </div>
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
  name: {
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
  selected: {
    required: false,
  },
  not_found: {
    required: false,
    type: String,
    default: "Не найдено",
  },
  error: {
    required: false,
    type: String,
    default: "",
  },
});

const customErrorMessage = ref(props.error);
const inputRef = ref();

// The `name` is returned in a function because we want to make sure it stays reactive
// If the name changes you want `useField` to be able to pick it up
const { value, errorMessage } = useField(() => props.name);

const isFirst = ref(false);
const isOpen = ref(false);
const options = ref(props.options);
const placeholder = computed(() => props.placeholder);
const searchInput = computed(() => {
  return (
    options.value.find((item) => String(item.value) === String(value.value))
      ?.name || null
  );
});
const selectedOption =
  computed(() => {
    return options.value.find(
      (item) => String(item.value) === String(value.value),
    );
  }) || {};

watch(
  () => props.placeholder,
  () => (placeholder.value = props.placeholder),
);

watch(
  () => props.options,
  (newOptions) => {
    options.value = newOptions;
    if (selectedOption.value && value.value !== selectedOption.value.value) {
      const found = options.value.find(
        (item) => String(item.value) === String(value.value),
      );
      if (!found) return;
      searchInput.value = found.name;
      selectedOption.value = found;
    }
  },
);
watch(
  () => value.value,
  (newValue) => {
    const found = options.value.find(
      (item) => String(item.value) === String(newValue),
    );

    if (!found) {
      searchInput.value = "";
      selectedOption.value = {};
      inputRef.value.focus();
      return;
    }
    selectedOption.value = found;
    searchInput.value = found.name;
  },
);

onMounted(() => {
  if (value.value) {
    const found = options.value.find(
      (item) => String(item.value) === String(value.value),
    );
    if (!found) return;
    selectedOption.value = found;
    searchInput.value = found.name;
  }
});

const input = ref("");

const placeholderClass = computed(() => {
  return isFirst.value || !selectedOption.value;
});

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
    value.value = id;
    isOpen.value = false;
  }
}

const onChangeHandler = (e) => {
  isOpen.value = true;
  const typedName = e.target.textContent.toLowerCase();
  emit("input", searchInput.value);
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

.current {
  font-weight: normal;
  width: 100%;
  height: unset !important;
  cursor: pointer;
  margin: 0;
  padding: 0.5rem;
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

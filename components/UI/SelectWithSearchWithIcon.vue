<template>
  <div
    class="nice-select n-select d-select"
    :class="{ open: isOpen }"
    v-click-outside="() => (isOpen = false)"
    tabindex="0"
  >
    <div class="custom_input-wrap has-icon">
      <span class="d-inline-flex ps-2">
        <img class="icon" src="~/assets/img/svg/location.svg" alt="#" />
      </span>
      <input
        class="current"
        ref="searchInputElement"
        @input="onChangeHandler"
        @focusin="onFocus"
        @focusout="onFocusout"
        :placeholder="props.placeholder"
        :class="{ placeholder: placeholderClass }"
      />
      <span class="select_arrow" @click="toggle"></span>
    </div>

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
</template>
<script>
export default {
  name: "SelectWithSearchWithIcon",
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
});

const isFirst = ref(false);
const isOpen = ref(false);
const options = ref(props.options);
const placeholder = computed(() => props.placeholder);
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

const onFocusout = (e) => {
  e.preventDefault();
};
const labelText = computed(() => {
  if (!isOpen.value) {
    if (selectedOption.value) {
      return selectedOption.value.name;
    } else {
      if (isFirst.value || !selectedOption.value) {
        return placeholder.value;
      }
      return searchInput.value;
    }
  } else {
    return searchInput.value;
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
    searchInputElement.value.value = selectedOptionItem.name;
    selectedOption.value = selectedOptionItem;
    searchInput.value = selectedOptionItem.name;
    emit("input", selectedOptionItem.name.toLowerCase());
    emit("change", selectedOptionItem);
    emit("update:modelValue", id);
    isOpen.value = false;
  }
}

const onChangeHandler = (e) => {
  isOpen.value = true;
  const typedName = e.target.value.toLowerCase();
  searchInputElement.value.value = typedName;
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
.nice-select {
  padding-left: 0 !important;
}

.d-select {
  padding: 0 !important;
  padding-right: 0px !important;
}

.list {
  max-height: 0vh;
}

input.current::-webkit-outer-spin-button,
input.current::-webkit-inner-spin-button {
  -webkit-appearance: none;
  -moz-appearance: textfield;
}

.search-row .n-select .current {
  width: 100%;
  color: #0a2540;
  height: unset !important;
  cursor: pointer;
  margin: 0;
  padding-left: 0;
}

.placeholder {
  font-weight: 600 !important;
  font-size: 16px;
  line-height: 22px;
  background-color: unset;
  opacity: 1;
}

.nice-select:after {
  display: none;
}

.select_arrow {
  border-bottom: 1.5px solid #78757e;
  border-right: 1.5px solid #78757e;
  content: "";
  display: block;
  height: 10px;
  margin-top: -4px;
  pointer-events: initial;
  position: absolute;
  right: 16px;
  top: 50%;
  transform-origin: 66% 66%;
  transform: rotate(45deg);
  transition: all 0.15s ease-in-out;
  width: 10px;
}

.nice-select .custom_input-wrap {
  width: 100%;
  height: 100%;
  display: inline-flex;
}
</style>

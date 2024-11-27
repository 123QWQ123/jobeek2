<template>
  <div
    class="nice-select n-select d-select"
    :class="{ open: isOpen }"
    v-click-outside="() => (isOpen = false)"
    tabindex="0"
  >
    <input
      class="current"
      :value="searchInput"
      @input="onChangeHandler"
      @focusin="onFocus"
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

const options = ref(props.options);
const searchInput = ref("");

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

onMounted(() => {
  if (props.modelValue) {
    selectedOption.value = options.value.find(
      (item) => String(item.value) === String(props.modelValue),
    );
    searchInput.value = selectedOption.value.name;
  }
});

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
    emit("change", selectedOptionItem);
    emit("update:modelValue", id);
    isOpen.value = false;
  }
}

const onChangeHandler = (e) => {
  isOpen.value = true;
  searchInput.value = e.target.value;
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

@media (max-width: 768px) {
  .search-row .input-wrap.has-label .nice-select input,
  .search-row .input-wrap.has-label .nice-select input::placeholder {
    padding-left: 0px !important;
  }
}

.current {
  color: #0a2540;
  width: 100%;
  height: unset !important;
  cursor: pointer;
  margin: 0;
  padding-left: 0;
  z-index: 1;
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
  display: inline-block;
  margin-top: -4px;
  position: absolute;
  transform-origin: 66% 66%;
  transform: rotate(45deg);
  transition: all 0.15s ease-in-out;
  width: 10px;
  height: 10px;
  top: 44%;
  right: 24px;
  border-color: #78757e;
  border-bottom: 1.5px solid #999;
  border-right: 1.5px solid #999;
  z-index: 10;
}

.nice-select.open .select_arrow {
  transform: rotate(225deg);
}
</style>

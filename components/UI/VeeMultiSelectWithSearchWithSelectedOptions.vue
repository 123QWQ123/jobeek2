<template>
  <div class="multi-select_wrapper">
    <div
      v-click-outside="close"
      class="select2-container select2-container--default select2-container--below select2-container--focus nice-select n-select d-select"
      :class="{ open: isOpen, disabled: disabled }"
      tabindex="0"
    >
      <input
        class="current"
        v-model="searchInput"
        @input="onChangeHandler"
        @focusin="onFocus"
      />
      <ul class="list" :style="listStyles">
        <li
          v-for="item in options"
          @click="onSelect"
          :key="item.value"
          :data-value="item.value"
          class="option"
          :style="listItemStyles"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
    <div class="selection selected-options" v-if="fields.length > 0">
      <ul class="selected-options" id="select2--container">
        <div v-for="(field, idx) in fields" :key="field.key">
          <li class="multi-select_selected-item">
            <span class="select2-selection__choice__display">
              {{ getCurrentFieldName(field.value) }}
            </span>
            <button
              @click="onUnselect(idx, field.value)"
              type="button"
              class="select2-selection__choice__remove"
            >
              <span aria-hidden="true">×</span>
            </button>
          </li>
        </div>
      </ul>
    </div>
    <div class="text-danger">
      <ErrorMessage :name="props.name" />
    </div>
  </div>
</template>

<script>
export default {
  name: "VeeMultiSelectWithSearchWithSelectedOptions",
};
</script>

<script setup>
import useSort from "~/composables/useSort";
import { useFieldArray } from "vee-validate";

const emit = defineEmits([
  "change",
  "update:modelValue",
  "input",
  "unselect",
  "updateSelectedOptions",
]);
const props = defineProps({
  options: {
    required: true,
    default: [],
  },
  selected_options: {
    required: false,
    default: [],
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
  name: {
    required: true,
    type: String,
  },
  sort_by: {
    required: false,
    default: "asc",
  },
  disabled: {
    required: false,
    default: false,
  },
  hide_selection: {
    required: false,
    default: false,
  },
});

const { errorMessage } = useField(() => props.name);
const { remove, push, fields, replace } = useFieldArray(() => props.name);

const isOpen = ref(false);
const options = ref(props.options);

const modelValue = ref(props.modelValue);
const { sort } = useSort();
watch(
  () => props.options,
  (newValue) => {
    if (props.sort_by === "none") {
      options.value = newValue;
    } else {
      options.value = sort(newValue, { by: "alpha" });
    }
  },
);

const selectedOptions = ref(props.selected_options ?? []);
onMounted(() => {
  // const selected_ids = [...fields.value.map((item) => item.value)];
  // selectedOptions.value = [
  //   ...options.value.filter((item) => selected_ids.includes(item.value)),
  // ];
});

// watch(
//   () => [...fields.value],
//   () => {
//     const selected_ids = [...fields.value.map((item) => item.value)];
//     selectedOptions.value = [
//       ...options.value.filter((item) => selected_ids.includes(item.value)),
//     ];
//   },
// );
// watch(
//   () => options.value,
//   () => {
//     const selected_ids = [...fields.value.map((item) => item.value)];
//     selectedOptions.value = [
//       ...options.value.filter((item) => selected_ids.includes(item.value)),
//     ];
//   },
// );
watch(
  () => props.selected_options,
  () => {
    selectedOptions.value = props.selected_options;
  },
);

const disabled = ref(props.disabled ?? false);

function onSelect(e) {
  if (disabled.value) return true;
  if (e.target.classList.contains("option")) {
    isOpen.value = false;
    const selectedOptionValue = e.target.dataset.value;
    const selectedOptionItem = options.value.find(
      (item) => String(item.value) === String(selectedOptionValue),
    );
    if (!selectedOptionItem) {
      return;
    }
    const fieldValues = fields.value.map((item) => item.value);
    if (!fieldValues.includes(selectedOptionItem.value)) {
      push(selectedOptionItem.value);
      const items = [...selectedOptions.value];
      items.push(selectedOptionItem);
      emit("updateSelectedOptions", items);
      selectedOptions.value = items;
    }
  }
}

const getCurrentFieldName = (newValue) => {
  const found = options.value.find(
    (item) => String(item.value) === String(newValue),
  );
  if (!found) return;
  return found.name;
};

function onUnselect(deleteId, oldValue) {
  const selectedOptionValue = String(oldValue);
  const selectedOptionItem = selectedOptions.value.find(
    (item) => String(item.value) === selectedOptionValue,
  );
  if (!selectedOptionItem) {
    return;
  }
  const fieldValues = fields.value.map((item) => item.value);
  if (fieldValues.includes(oldValue)) {
    remove(deleteId);
    let items = [...selectedOptions.value];
    items = items.filter((item) => oldValue !== item.value);
    emit("updateSelectedOptions", items);
  }
}

const searchInput = ref(props.placeholder ?? "");

watch(
  () => props.placeholder,
  () => (searchInput.value = props.placeholder),
);
const onChangeHandler = (e) => {
  isOpen.value = true;
  const typedName = e.target.textContent.toLowerCase();
  emit("input", searchInput.value);
  if (typedName.trim() === "") {
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
};
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
.disabled {
  background-color: #eee;
  cursor: default;
}

.multi-select_wrapper {
}

.list {
  max-height: 0vh;
  margin-top: 0;
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
  padding-left: 0;
  border: 0;
  background: none;
}

.selection {
  border-radius: 4px;
  left: 0;
}

.selected-options {
  margin-top: 0.5rem;
  flex-wrap: wrap;
  display: flex;
  padding: 0 0.1rem 0.2rem;
  gap: 0.5rem;
}

.multi-select_selected-item {
  border: 1px solid #5375fd;
  border-radius: 4px;
  padding: 2px 0.2rem 2px 0.5rem;
  color: #5375fd;
}

.multi-select_selected-item span {
  color: #5375fd;
}

.select2-selection__choice__remove {
  float: right;
}
</style>

<template>
  <!--  <VueMultiselect v-model="selected" :options="options"> </VueMultiselect>-->
  <!--  <VueMultiselect-->
  <!--    v-model="selected"-->
  <!--    :options="options"-->
  <!--    :multiple="true"-->
  <!--    :close-on-select="true"-->
  <!--    placeholder="Pick some"-->
  <!--    label="name"-->
  <!--    track-by="value"-->
  <!--  />-->

  <div class="multi-select_wrapper">
    <VueMultiselect
      v-model="selectedOptions"
      :options="options"
      :multiple="true"
      :searchable="true"
      @search-change="asyncFind"
      placeholder="Type to search"
      label="name"
      track-by="value"
    >
      <template #noResult> не найдено </template>
    </VueMultiselect>

    <div
      class="selection selected-options"
      v-if="!hide_selection && selectedOptions.length"
    >
      <ul class="selected-options" id="select2--container">
        <li
          v-for="item in selectedOptions"
          class="multi-select_selected-item"
          @click="onUnselect(item)"
        >
          <button type="button" class="select2-selection__choice__remove">
            <span aria-hidden="true">×</span>
          </button>
          <span class="select2-selection__choice__display">{{
            getSelectedOptionName(item)
          }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "MultiSelectWithSearchNew",
};
</script>

<script setup>
import VueMultiselect from "vue-multiselect";
import useSort from "~/composables/useSort";

const emit = defineEmits(["change", "update:modelValue", "input", "unselect"]);
const props = defineProps({
  options: {
    required: true,
  },
  label: {
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

const asyncFind = (e) => {
  console.log(e);
};

const hide_selection = props.hide_selection;
const isOpen = ref(false);
const options = ref(props.options);
const { sort } = useSort();
watch(props, (newProps) => {
  options.value = sort(newProps.options, { by: "alpha" });
  // selectedOption.value = options.value.find(item => String(item.value) === String(props.modelValue));

  if (newProps.modelValue) {
    selectedOptions.value = newProps.modelValue;
  }
});

const inputElement = ref();
const selected = ref(props.modelValue ?? []);
const selectedOptions = ref(props.modelValue ?? []);
const disabled = ref(props.disabled ?? false);

function onSelect(e) {
  if (disabled.value) return true;

  if (e.target.classList.contains("option")) {
    const tempSelectedOptions = selectedOptions.value;
    isOpen.value = false;
    const selectedOptionValue = e.target.dataset.value;
    const selectedOptionItem = options.value.find(
      (item) => String(item.value) === String(selectedOptionValue)
    );
    if (selectedOptionItem) {
      if (!tempSelectedOptions.includes(String(selectedOptionItem.value))) {
        tempSelectedOptions.push(String(selectedOptionItem.value));
        selectedOptions.value = tempSelectedOptions;
      }
      // exclude from all options
      options.value = props.options.filter(
        (item) => !tempSelectedOptions.includes(String(item.value))
      );
      emit("change", selectedOptionItem);
    }
    emit("update:modelValue", Array.from(tempSelectedOptions));
  }
}

function onUnselect(deleteId) {
  if (disabled.value) return true;

  let tempOptions = props.options;
  let tempSelectedOptions = selectedOptions.value;
  const selectedOptionItemIndex = props.options.findIndex(
    (item) => String(item.value) === String(deleteId)
  );
  if (selectedOptionItemIndex !== -1) {
    selectedOptions.value = tempSelectedOptions.filter(
      (item) => String(item) !== String(deleteId)
    );
    options.value = tempOptions.filter(
      (item) => !selectedOptions.value.includes(String(item.value))
    );
    emit("unselect", deleteId);
  }
  emit("update:modelValue", selectedOptions.value);
}
function onClick(e) {
  if (disabled.value) return true;

  if (
    e.target.classList.contains("current") ||
    e.target.classList.contains("nice-select")
  ) {
    isOpen.value = !isOpen.value;
  }
  if (isOpen.value) {
    if (inputElement.value) {
      // setting cursor position to end
      nextTick(() => {
        if (
          inputElement.value.type !== "textarea" &&
          inputElement.value.getAttribute("contenteditable") === "true"
        ) {
          inputElement.value.focus();
          window.getSelection().selectAllChildren(inputElement.value);
          window.getSelection().collapseToEnd();
        } else {
          // Place cursor at the end of text areas and input elements
          inputElement.value.focus();
          inputElement.value.select();
          window.getSelection().collapseToEnd();
        }
      });
    }
  }
}

const searchInput = ref("");
const labelOrSearchInput = computed(() => {
  return isOpen.value ? searchInput.value : props.label;
});
const onChangeHandler = (e) => {
  searchInput.value = e.target.textContent;
  isOpen.value = true;
  const typedName = e.target.textContent.toLowerCase();
  emit("input", typedName);
};

function getSelectedOptionName(value) {
  const selectedOptionItem = props.options.find(
    (item) => String(item.value) === String(value)
  );
  if (selectedOptionItem) return selectedOptionItem.name;
  else return "Not found";
}
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
.current {
  margin-top: 0.8rem;
  color: #0a2540;
  width: 100%;
  height: unset !important;
  display: block;
}
.selection {
  /*border: 1px solid;*/
  border-radius: 4px;
  /*padding: 0 16px;*/
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
  padding: 2px;
  color: #5375fd;
}
.multi-select_selected-item span {
  color: #5375fd;
}
</style>

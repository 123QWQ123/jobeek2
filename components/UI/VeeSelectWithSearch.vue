<template>
  <div>
    <div
      class="nice-select n-select d-select"
      :class="{ open: isOpen }"
      v-click-outside="close"
      tabindex="0"
    >
      <input
        class="current"
        ref="inputRef"
        v-model="searchInput"
        @input="onInput"
        role="spinbutton"
        autocomplete="off"
        autofill="off"
        @focusin="onFocus"
        :class="{ placeholder: placeholderClass }"
      />
      <span class="select_arrow" @click="toggle"></span>
      <ul class="list" :style="props.listStyles" v-if="isOpen">
        <li
          v-for="item in filteredOptions"
          :key="item.value"
          :data-value="item.value"
          class="option"
          @click="onSelect(item.value)"
          :style="props.listItemStyles"
        >
          {{ item.name }}
        </li>
        <li v-if="filteredOptions.length === 0">
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

<script setup>
import { ref, computed, watch, nextTick } from "vue";
import { useField } from "vee-validate";

// Props and events
const emit = defineEmits(["change", "update:modelValue", "input"]);
const props = defineProps({
  options: { type: Array, required: true },
  label: String,
  name: String,
  placeholder: String,
  listStyles: Object,
  listItemStyles: Object,
  selected: [String, Number, Object],
  not_found: { type: String, default: "Не найдено" },
  error: { type: String, default: "" },
  value: [String, Number, Object],
});

// Component state
const inputRef = ref();
const isOpen = ref(false);
const searchInput = ref("");

// vee-validate
const { value, errorMessage } = useField(() => props.name);

// Find the selected item
const selectedOption = computed(() =>
  props.options.find((item) => String(item.value) === String(value.value)),
);

// Show placeholder if there is no selected item
const placeholderClass = computed(() => !selectedOption.value);

// Filtered list of options
const filteredOptions = computed(() => {
  if (!searchInput.value) return props.options;
  const q = searchInput.value.toLowerCase();
  return props.options.filter((item) =>
    String(item.name).toLowerCase().includes(q),
  );
});

// On value change -> update the input field (searchInput)
watch(
  () => value.value,
  (val) => {
    const found = props.options.find(
      (item) => String(item.value) === String(val),
    );
    searchInput.value = found ? found.name : "";
  },
  { immediate: true },
);

// On options change — reset selected value if not actual anymore
watch(
  () => props.options,
  (options) => {
    if (!options.find((opt) => String(opt.value) === String(value.value))) {
      value.value = "";
      searchInput.value = "";
    }
  },
);

// Open/close select
function toggle() {
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    nextTick(() => inputRef.value?.focus());
  }
}

function close() {
  isOpen.value = false;
}

// Handle selection
function onSelect(val) {
  const found = props.options.find(
    (item) => String(item.value) === String(val),
  );
  if (found) {
    value.value = found.value;
    searchInput.value = found.name;
    emit("update:modelValue", found.value);
    emit("change", found.value);
    close();
  }
}

// When typing in the field
function onInput(e) {
  isOpen.value = true;
  emit("input", searchInput.value);
}

// On field focus (clear placeholder if needed)
function onFocus() {
  if (props.placeholder && searchInput.value === props.placeholder) {
    searchInput.value = "";
  }
  isOpen.value = true;
  emit("input", searchInput.value);
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

<template>
  <div
    v-click-outside="close"
    onfocusout="close"
    class="nice-select n-select d-select"
    :style="props.style"
    :class="{ open: isOpen }"
    @click="onClick"
    tabindex="0"
  >
    <span class="current">{{ label }}</span>
    <transition>
      <ul class="list" :style="listStyles" v-if="isOpen">
        <li
          v-for="item in options"
          :key="item.value"
          class="option"
          @click="onSelect(item.value)"
        >
          {{ item.name }}
        </li>
      </ul>
    </transition>
  </div>

  <div class="text-danger d-block">
    {{ errorMessage }}
  </div>
</template>

<script>
export default {
  name: "CustomSelect",
};
</script>

<script setup>
const props = defineProps([
  "options",
  "modelValue",
  "label",
  "name",
  "vacancy",
  "listStyles",
  "class",
]);
const emit = defineEmits(["change", "update:modelValue"]);
const isOpen = ref(false);
const options = computed(() => props.options);

const label = computed(() => {
  if (selectedOption.value) {
    return selectedOption.value.name;
  }
  return props.label;
});

// The `name` is returned in a function because we want to make sure it stays reactive
// If the name changes you want `useField` to be able to pick it up
const { value, errorMessage } = useField(() => props.name);

const selectedOption = ref(null);

const reApply = (newValue) => {
  const selectedItem = props.options.find(
    (item) => String(value.value) === String(item.value),
  );
  if (selectedItem) {
    selectedOption.value = selectedItem;
  }
};

watch(() => value.value, reApply);
watch(() => props.options, reApply);

onMounted(() => {
  reApply();
});

function onSelect(id) {
  console.log(id);
  const selectedOptionItem = options.value.find(
    (item) => String(item.value) === String(id),
  );
  if (selectedOptionItem) {
    selectedOption.value = selectedOptionItem;
    value.value = id;
    isOpen.value = false;
  }
}

function onClick(e) {
  if (
    e.target.classList.contains("current") ||
    e.target.classList.contains("nice-select")
  ) {
    isOpen.value = !isOpen.value;
  }
  // if (e.target.classList.contains("option")) {
  //   isOpen.value = false;
  //   value.value = e.target.dataset.value ?? null;
  // }
}

function close() {
  isOpen.value = false;
}
</script>

<style scoped>
.current {
  color: #0a2540;
}

.d-select {
  /*background: none;*/
  padding-right: 3.125rem;
  width: auto;
}
</style>

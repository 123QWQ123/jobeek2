<template>
  <div
    class="filter-tree-selector-item filter-tree-selector-item_has-children-has-action"
  >
    <div class="filter-form-item">
      <div class="filter-tree-selector-content">
        {{ checked }} - {{ props.item.id }}
        <hr />
        {{ isHalfChecked }} - {{ anyChecked }}
        <div class="check-block">
          <svg
            @click="toggle"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-caret-right cursor-pointer"
            :class="{ expanded: props.isOpen }"
            viewBox="0 0 16 16"
          >
            <path
              d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z"
            />
          </svg>
          <div
            class="checkbox ms-1"
            @click="selectToggle"
            :title="item.checked + '-' + isHalfChecked"
          >
            <input
              type="checkbox"
              :id="item.id"
              :checked="checked"
              :class="{ is_half_checked: isHalfChecked }"
            />
            <div class="checkbox-mask">
              <img
                src="~/assets/img/svg/dash.svg"
                alt="#"
                v-if="isHalfChecked"
              />
              <img src="~/assets/img/svg/check.svg" alt="#" v-else />
            </div>
          </div>
          <label :for="item.id">{{ item.title }}</label>
        </div>
      </div>
    </div>
    <div class="filter-tree-selector__items" v-if="isOpen">
      <div
        class="filter-tree-selector-item filter-tree-selector-item_no-children"
        v-for="sub_item in items"
        :key="sub_item.id"
      >
        <VacanciesFiltersIndustrySubItem
          @toggle="toggleSubItem"
          :id="sub_item.id"
          :parent_id="item.id"
          :checked="sub_item.checked"
          :label="sub_item.title"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["toggleItem", "toggleSubItem"]);
const props = defineProps({
  item: {
    required: true,
    default: {},
  },
  isOpen: {
    required: false,
    default: false,
  },
  checked: {
    required: false,
    default: false,
  },
});

const item = ref(props.item ?? {});
const items = ref(props.item.items ?? []);
watch(
  () => props.item.items,
  () => {
    items.value = props.item.items;
  },
);
const isOpen = ref(props.isOpen);
const { checked } = toRefs(props);

// const selected_ids = props.items.value
//   .filter((item) => item.is_checked)
//   .map((item) => item.id);
// const isHalfChecked = ref(
//   selected_ids.length > 0 && selected_ids.length !== props.items.value.length,
// );
// if (
//   selected_ids.length !== 0 &&
//   selected_ids.length === props.items.value.length
// ) {
//   item.value.is_checked = true;
// }
// const selectedSubItems = ref(selected_ids);
//
// watchEffect(() => (item.value = props.item));
// watchEffect(() => (items.value = props.items));
//
// watch(
//   () => selectedSubItems.value,
//   (newValue, oldValue) => {
//     emit("update", props.item.id, newValue);
//   },
// );

const selectToggle = () => {
  emit("toggleItem", item.value.id);
};

const toggleSubItem = (id) => {
  console.log(id);
  emit("toggleSubItem", id);
};

const toggle = () => (isOpen.value = !isOpen.value);

const anyChecked = computed(() => {
  return props.item.items.some((item) => item.checked === true);
});
const isHalfChecked = computed(() => {
  return items.value.some((item) => item.checked === false) && anyChecked.value;
});
// const selectToggle = () => {
//   let is_checked = !item.value.is_checked;
//   console.log(is_checked);
//   if (is_checked) {
//     selectedSubItems.value = props.items.value.map((spec) => spec.id);
//   } else {
//     selectedSubItems.value = [];
//     isHalfChecked.value = false;
//   }
//   const sub_items = props.items.value.map((sub_item) => {
//     sub_item.is_checked = is_checked;
//     return sub_item;
//   });
//
//   let is_any_not_checked = sub_items.some(
//     (sub_item) => sub_item.is_checked === false,
//   );
//   console.log(is_any_not_checked);
//   props.items.value = sub_items;
//   item.value = { ...item.value, is_checked: is_checked };
// };
//
// const selectSubToggle = (sub_id) => {
//   const dynSelectedItems = [...selectedSubItems.value];
//   const sub_items = props.items.value.map((sub_item) => {
//     const dyn_sub_item = { ...sub_item };
//     if (dyn_sub_item.id === sub_id) {
//       dyn_sub_item.is_checked = !dyn_sub_item.is_checked;
//       if (dyn_sub_item.is_checked) {
//         dynSelectedItems.push(dyn_sub_item.id);
//       } else {
//         const findIndex = dynSelectedItems.findIndex(
//           (id) => id === dyn_sub_item.id,
//         );
//         if (findIndex !== -1) dynSelectedItems.splice(findIndex, 1);
//       }
//     }
//     return dyn_sub_item;
//   });
//   selectedSubItems.value = sub_items.map((item) => {
//     if (item.is_checked) return item.id;
//   });
//   let is_any_checked = sub_items.some(
//     (sub_item) => sub_item.is_checked === true,
//   );
//   let is_all_checked = !sub_items.some(
//     (sub_item) => sub_item.is_checked === false,
//   );
//
//   if (!is_all_checked && is_any_checked) {
//     isHalfChecked.value = true;
//   } else {
//     isHalfChecked.value = false;
//   }
//   if (is_all_checked) {
//     isHalfChecked.value = false;
//   }
//   item.value = { ...item.value, is_checked: is_all_checked };
//   items.value = sub_items;
// };
</script>

<style scoped>
.check-block .expanded {
  transform: rotateZ(90deg);
}

.filter-tree-selector-item,
.filter-tree-selector-item_has-children-has-action,
.filter-tree-selector-item_no-children {
  border-width: 0;
}

.filter-tree-selector-item_has-children-has-action {
  margin-left: 2px;
}

.filter-form-item {
  margin: 10px 0;
}

.filter-tree-selector-content {
  display: table;
}

.check-block {
}

.check-block .expanded {
  transform: rotateZ(90deg);
}

@media (min-width: 1020px) {
  .filter-form-item {
    margin-top: 0;
  }
}

.filter-tree-selector__items {
  padding-left: 25px;
}

.filter-tree-selector-item_has-children-has-action
  > .filter-tree-selector__items
  > .filter-tree-selector-item_no-children {
  margin-left: 27px;
}

.filter-tree-selector-item,
.filter-tree-selector-item_has-children-has-action,
.filter-tree-selector-item_no-children {
  border-width: 0;
}

.check-block .checkbox input.is_half_checked ~ .checkbox-mask {
  background: #5375fd;
}

.check-block .checkbox input.is_half_checked ~ .checkbox-mask img {
  opacity: 1;
}
</style>

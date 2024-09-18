<template>
  <div
    class="filter-tree-selector-item filter-tree-selector-item_has-children-has-action"
  >
    <div class="filter-form-item">
      <div class="filter-tree-selector-content">
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
            :title="props.item.checked + '-' + isHalfChecked"
          >
            <input
              type="checkbox"
              :checked="checked"
              :class="{ is_half_checked: isHalfChecked }"
              :id="`industry_${props.item.id}`"
              @change="selectToggle($event)"
            />
            <div class="checkbox-mask">
              <img v-if="allChecked" src="~/assets/img/svg/check.svg" alt="#" />
              <img src="~/assets/img/svg/dash.svg" alt="#" v-else />
            </div>
          </div>
          <label :for="`industry_${props.item.id}`">{{ props.item.title }}</label>
        </div>
      </div>
    </div>
    <div class="filter-tree-selector__items" v-if="isOpen">
      <div
        class="filter-tree-selector-item filter-tree-selector-item_no-children"
        v-for="sub_item in props.item.items"
        :key="sub_item.id"
      >
        <VacanciesFiltersIndustrySubItem
          @toggle="toggleSubItem"
          :id="sub_item.id"
          :checked="sub_item.checked"
          :label="sub_item.title"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["remove", "add", "toggleSubItem"]);
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

const isOpen = ref(props.isOpen);
const { checked } = toRefs(props);

const selectToggle = (event) => {
  props.item.checked = event.target.checked;
  const selected_ids = props.item.items.map((item) => item.id);
  let temp_industries = [];

  selected_ids.push(props.item.id);
  if (event.target.checked) {
    temp_industries = props.item.items.map((item) => {
      item.checked = true;
      return item;
    });
    emit("add", selected_ids);
  } else {
    temp_industries = props.item.items.map((item) => {
      item.checked = false;
      return item;
    });

    emit("remove", selected_ids);
  }

  props.item.items = temp_industries;
};

const toggleSubItem = (id, checked) => {
  props.item.items = props.item.items.map((item) => {
    if (item.id === id) {
      item.checked = checked;
    }
    return item;
  });

  if (checked) {
    if (allChecked) {
      props.item.checked = true;
    }
    emit("add", [id]);
  } else {
    if (!anyChecked.value) {
      props.item.checked = false;
    }
    emit("remove", [id, props.item.id]);
  }
};

const toggle = () => (isOpen.value = !isOpen.value);

const anyChecked = computed(() => {
  return props.item.items.some((item) => item?.checked === true);
});
const anyUnchecked = computed(() => {
  return props.item.items.some((item) => item?.checked === false);
});
const isHalfChecked = computed(() => {
  return anyChecked.value && anyUnchecked.value;
});
const allChecked = computed(() => {
  return !anyUnchecked.value;
});
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

<template>
  <div
    class="filter-modal-overlay filter-modal-overlay_visible"
    :class="{ hidden: !props.isOpen }"
  >
    <div class="filter-modal-container filter-modal-container_visible">
      <div class="filter-modal" v-click-outside="onClickOutside">
        <div class="filter-modal-header">
          <span class="filter-modal-title">{{ title }} </span>
          <br />
          <div class="filter-tree-selector-popup-search">
            <fieldset class="input-wrapper">
              <input
                placeholder="Быстрый поиск"
                type="search"
                class="filter-input-text"
                v-model="searchInput"
                @input="onSearch"
              />
            </fieldset>
          </div>
        </div>
        <div class="filter-tree-selector-popup">
          <div class="filter-tree-selector-popup-content" v-if="!isLoading">
            <VacanciesFiltersIndustryItem
              v-for="item in items"
              :item="item"
              :key="item.id"
              @add="addIds"
              @remove="removeIds"
              :checked="item.checked"
              :is-open="isSearching"
            />
          </div>
          <div class="filter-tree-selector-popup-content" v-else>
            <div class="ms-2 spinner-grow spinner-grow-sm" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
        <div class="filter-modal-error filter-modal-error_hidden"></div>
        <div class="filter-modal-footer mt-3">
          <div class="filter-tree-selector-popup-footer">
            <div class="filter-form-spacer">
              <button
                @click="close"
                class="btn button-xs sign-in-btn"
                type="button"
              >
                <span>Отменить</span>
              </button>
            </div>
            <div class="filter-form-spacer">
              <button
                class="btn button-accent"
                type="button"
                @click.prevent="apply"
              >
                <span>Выбрать</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="filter-modal-close-button" @click="close">
        <button type="button" class="btn-close btn-close-white"></button>
      </div>
    </div>
  </div>
</template>

<script setup>
import useFilter from "~/composables/useFilter.js";
import useQueryParams from "~/composables/useQueryParams.js";

const props = defineProps({
  items: {
    required: true,
  },
  title: {
    required: true,
  },
  isOpen: {
    required: false,
  },
  modelValue: {
    required: false,
  },
  name: {
    required: true,
  },
});

const { items: industries, title } = props;

const emit = defineEmits({
  close: {
    required: true,
  },
  "update:modelValue": {
    required: false,
  },
});

const { updateQueryParam, getQueryParam } = useQueryParams();
// получить данные с урл стейта
const industry_ids = ref(getQueryParam("industries") ?? []);
// временное выбранное + данные из урл стейта
const selectedSpecs = ref(industry_ids.value ?? []);
// данные после обработки
const items = ref([]);
const isLoading = ref(false);
const apply = () => {
  const ids = [...selectedSpecs.value].filter((item) => item);
  updateQueryParam("industries", JSON.stringify(Array.from(new Set(ids))));
  close();
};
const addIds = (new_ids) => {
  let ids = [...selectedSpecs.value];
  ids = new_ids.concat(ids);
  selectedSpecs.value = ids;
  prepare(props.items, false);
};
const removeIds = (old_ids) => {
  let ids = [...selectedSpecs.value];
  ids = ids.filter((id) => !old_ids.includes(id));
  selectedSpecs.value = ids;
  prepare(props.items, false);
};
const searchInput = ref("");

const isSearching = computed(() => {
  return searchInput.value !== "";
});

const onSearch = (event) => {
  const q = event.target.value;

  if (!q) {
    items.value = props.items;
  }

  items.value = props.items
    .map((item) => {
      let temp = { ...item };
      temp.items = temp.items.filter((sub_item) => {
        return sub_item.title.toLowerCase().includes(q.toLowerCase());
      });
      return temp;
    })
    .filter((item) => item.items.length > 0);
};
const prepare = (newValues) => {
  let dynamicItems = [...newValues];
  if (isSearching.value) {
    dynamicItems = [
      ...newValues.map((item) => {
        let temp = {...item}
        temp.items = item.items.filter((sub_item) =>
          sub_item.title
            .toLowerCase()
            .includes(searchInput.value.toLowerCase()),
        );
        return temp;
      }),
    ];
  } else {
    dynamicItems = [...newValues];
  }

  dynamicItems = dynamicItems.map((item) => {
    if (selectedSpecs.value.includes(item.id)) {
      item.checked = true;
      item.items = item.items.map((sub_item) => {
        sub_item.checked = true;
        return sub_item;
      });
    } else {
      if (item.items.length > 0) {
        item.items = item.items.map((sub_item) => {
          if (selectedSpecs.value.includes(sub_item.id)) {
            sub_item.checked = true;
          }
          return sub_item;
        });
      }
    }
    return item;
  });
  items.value = dynamicItems;
};

watch(
  () => selectedSpecs.value,
  () => {
    prepare(props.items);
  },
);

onMounted(() => {
  prepare(props.items);
});

const onClickOutside = (e) => {
  if (e.target.classList.contains("filter-modal-container")) {
    close();
  }
};
const close = () => emit("close");
</script>

<style scoped>
.check-block label {
  white-space: pre-wrap;
}

.filter-modal-overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1041;
  background-color: initial;
  visibility: hidden;
  opacity: 0;
  transition-property: background-color, visibility, opacity;
  transition-duration: 0.15s;
  transition-timing-function: linear;
}

.filter-modal-overlay_visible {
  background-color: rgba(48, 50, 51, 0.9);
  visibility: visible;
  opacity: 1;
}

.filter-modal-overlay_visible.hidden {
  display: none;
}

.filter-modal-container_visible {
  opacity: 1;
}

.filter-modal-container {
  padding: 20px;
}

.filter-modal-container {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  min-height: 100%;
  box-sizing: border-box;
  z-index: 1041;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  transition: opacity 0.15s linear;
  opacity: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.filter-modal {
  display: flex;
  flex-direction: column;
  /* max-height: 100%; */
  /* max-width: 100%; */
  z-index: 1042;
  -webkit-user-select: text;
  user-select: text;
  background-color: #fff;
  box-sizing: border-box;
  box-shadow: 0 10px 15px 0 rgba(48, 50, 51, 0.4);
  margin: auto;
  padding: 30px;
  overflow: auto;
}

.filter-modal {
  border-radius: 4px;
}

.filter-modal-header {
  width: 0;
  min-width: 100%;
  margin-bottom: 20px;
  flex-shrink: 0;
  overflow-wrap: break-word;
  word-wrap: break-word;
}

.filter-modal-title {
  margin: 0;
  padding: 0;
  font-size: 24px;
  line-height: 1.16;
  font-weight: 700;
}

.filter-tree-selector-popup-search {
  margin-top: 10px;
}

.filter-form-spacer {
  margin: 0.2rem 0.5rem;
}

.filter-input-text {
  line-height: 1.43;
  font-size: 14px;
  display: inline-block;
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  padding: 0 12px;
  margin: 0;
  border-radius: 4px;
  color: #303233;
  -webkit-appearance: none;
  -moz-appearance: none;
  -webkit-tap-highlight-color: transparent;
  background-color: #fff;
  border: 1px solid #babdbf;
}

.filter-tree-selector-popup {
  width: 620px;
  height: 423px;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  flex-grow: 1;
  margin-top: -10px;
  padding-left: 10px;
  margin-left: -10px;
}

.filter-tree-selector-popup-content {
  box-sizing: border-box;
  padding-right: 15px;
  padding-top: 10px;
}

.check-block {
}

@media (min-width: 1020px) {
}

.filter-modal-error {
  height: auto;
  overflow: hidden;
  color: #fff;
  background: #eb6b6b;
  padding: 7px 30px;
  margin: 25px -30px 0;
  transition: padding 0.25s ease;
  flex-shrink: 0;
}

.filter-modal-error_hidden {
  height: 0;
  overflow: hidden;
  margin-top: 0;
  padding: 0 30px;
}

.filter-modal-close-button {
  position: fixed;
  top: 40px;
  right: 40px;
  z-index: 1042;
  cursor: pointer;
}

.filter-tree-selector-popup-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>

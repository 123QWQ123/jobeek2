<template>
  <div class="card m-1" style="max-width: 640px">
    <div class="row jusifiy-content-between">
      <div class="col-md-4">
        <img class="w-100" :src="photo" alt="POst title" />
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">
            <router-link :to="{ name: 'coaches-id', params: { id: id } }">
              {{ name }}
            </router-link>
          </h5>
          <p class="card-text">{{ description }}</p>
          <p class="card-text">
            <span class="badge bg-info text-dark">{{ field }} </span>
          </p>
          <div v-if="selectedTag">
            <small class="text-muted">level({{ selectedTag.value }}%)</small>
            <div class="progress">
              <div
                class="progress-bar"
                role="progressbar"
                :style="{ width: selectedTag.value + '%' }"
                aria-valuenow="70"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
        </div>
        <div class="card-footer border-0 ml-2">
          <div class="badges">
            <span
              class="badge bg-secondary mx-1 cursor-pointer"
              style="cursor: pointer"
              v-for="item in tags"
              @click="setSelectedTag(item.name)"
              :key="item.id"
            >
              {{ item.name }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    // required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  field: {
    type: String,
    required: true,
  },
  tags: {
    type: Array,
    required: true,
  },
});
const state = reactive(props);

const selectedTag = ref(null);
function setSelectedTag(newName) {
  if (newName && state.tags) {
    selectedTag.value = state.tags?.find((item) => item.name === newName);
  }
}
if (state.tags && state.tags.length > 0) {
  setSelectedTag(state.tags[0].name);
} else {
  setSelectedTag(null);
}

const name = computed(() => {
  return state.first_name + " " + state.last_name;
});
</script>
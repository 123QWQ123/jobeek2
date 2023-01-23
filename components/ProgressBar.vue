<template>
  <div class="progress-text">
    <div class="row">
      <div class="col-6 fw-bold">{{ name }}</div>
      <div class="col-6 text-end">{{ value }}%</div>
    </div>
  </div>
  <div class="custom-progress progress rounded-3" @click="onClick">
    <div
      class="animated custom-bar progress-bar bg-secondary slideInLeft"
      :style="{ width: value + '%', 'pointer-events': 'none' }"
      aria-valuemax="100"
      aria-valuemin="0"
      :aria-valuenow="value"
      role="progressbar"
    ></div>
  </div>
</template>

<script>
export default {
  emits: ['setValue'],
  props: ['value', 'name'],
  methods: {
    onClick(e) {
      let position;
      if (e.target.classList.contains('progress-bar')) {
        position = e.target.getBoundingClientRect();
      } else {
        position = e.target.parentElement.getBoundingClientRect();
      }
      const full_width = position.width;
      const selected_width = e.clientX - position.x;
      const size_per_percentage = full_width / 100;
      const percentage = (selected_width / size_per_percentage).toFixed(0);
      this.$emit('setValue', percentage);
    },
  },
};
</script>
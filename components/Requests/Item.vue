<template>
  <div class="card">
    <div class="card-header">{{ props.name }}</div>
    <div class="card-body">
      <h5 class="card-title">{{ props.title }}</h5>
      <p class="card-text">{{ props.description }}</p>
      <a :href="'mailto:' + props.email" class="btn btn-primary">{{
        props.email
      }}</a>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["name", "description", "title", "email"]);
</script>
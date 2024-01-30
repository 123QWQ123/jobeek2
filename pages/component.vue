<template>
  <div class="component">
    {{ phone }}
    <VuePhoneInput v-model="phone" />
  </div>
</template>
<script setup>
const phone = ref("+77777777778");
</script>

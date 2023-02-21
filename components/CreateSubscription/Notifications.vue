<template>
  <div class="input-row input-row--checkboxes">
    <label>Куда получать уведомления</label>
    <div class="checkboxes-row">
      <div class="check-block">
        <div class="checkbox">
          <input type="checkbox" id="push-notifications">
          <div class="checkbox-mask"><img src="~/assets/img/svg/check.svg" alt="#"></div>
        </div>
        <label for="push-notifications">Push-уведомления</label>
      </div>
      <div class="check-block">
        <div class="checkbox">
          <input type="checkbox" id="email-notofocations">
          <div class="checkbox-mask"><img src="~/assets/img/svg/check.svg" alt="#"></div>
        </div>
        <label for="email-notofocations">E-mail уведомления</label>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>

</style>
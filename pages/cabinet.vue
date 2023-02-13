<script setup>
definePageMeta({
  layout: 'cabinet',
  middleware: ["auth"]
})
</script>
<template>
  <main class="main cabinet" role="main">
    <div class="bg-wrapper">
      <PersonalCabinetSearchMobile/>
      <PersonalCabinetCards/>
      <HomeWorkSection/>
    </div>
    <HomeSearchSection/>
  </main>

</template>
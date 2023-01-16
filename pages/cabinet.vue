<script setup>
definePageMeta({
  layout: 'cabinet'
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
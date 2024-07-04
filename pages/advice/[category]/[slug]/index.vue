<script setup>
import Advice from "../../../../layouts/advice";

definePageMeta({
  layout: "advice-post",
});
const route = useRoute();

</script>
<template>
  <main class="main cabinet advice-single-page bg-wrapper" role="main">
    <div class="has-sidebar wrapper wrapper-1290">
      <div class="content">
        <AdviceCategoryPostContent></AdviceCategoryPostContent>
      </div>
      <aside class="sidebar">
        <AdviceCategoryPostLatestList></AdviceCategoryPostLatestList>

      </aside>
    </div>
  </main>
</template>
<script setup>
definePageMeta({
  layout: "cabinet",
});
</script>
<template>
  <main class="main cabinet " role="main">
    <div class="bg-wrapper course-page pt">
      <PersonalCabinetSearchMobile />
      <div class="accent-section">
        <CoursesHeader></CoursesHeader>
      </div>
      <div class="wrapper wrapper-1290">
        <div class="course-grid">
          <CoursesContent></CoursesContent>
          <CoursesSidebar></CoursesSidebar>
        </div>
      </div>
    </div>
  </main>
</template>
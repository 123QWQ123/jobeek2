<template>
  <div class="layout">
    <HeaderTheGuestCabinetHeader />
    <div>
      <NuxtPage />
    </div>
    <!--       <template #error="{ error }">-->
    <!--        <div>-->
    <!--          <p>-->
    <!--            Oh no, something broke when loading the lesson!-->
    <!--            <code>{{ error }}</code>-->
    <!--          </p>-->
    <!--          <p>-->
    <!--            <NuxtLink class="hover:cursor-pointer" to="/"> Go to / </NuxtLink>-->
    <!--          </p>-->
    <!--        </div>-->
    <!--      </template>-->
    <the-footer />
  </div>
</template>
<script setup lang="ts"></script>

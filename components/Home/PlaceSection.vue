<template>
  <div class="place-section section wrapper">
    <div class="place-card place-card--vacancy">
      <h4 class="place-card-title">Работа</h4>
      <p class="place-card-descr"><strong>Jobeek</strong> — это лучшие предложения высокооплачиваемой
        работы от российских и  зарубежных компаний.</p>
      <NuxtLink :to="{name: 'create-resume'}" class="btn button-accent button-accent--ts-bigger">Разместить резюме</NuxtLink>
    </div>
      <div class="place-card place-card--resume">
      <h4 class="place-card-title">Сотрудники</h4>
      <p class="place-card-descr"><strong>Jobeek</strong> — самая большая и качественная база резюме
        лучших специалистов в России.</p>
      <NuxtLink :to="{name: 'create-vacancy'}" class="btn button-accent button-accent--ts-bigger">Разместить вакансию </NuxtLink>
    </div>
  </div>
</template>
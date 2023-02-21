<script setup>
definePageMeta({
  layout: "cabinet",
});

const myChangeEvent = (event) => {
  console.log("myChangeEvent: ", event);
}
const mySelectEvent = (e) => {
  console.log("mySelectEvent: ", event);
}
const myOptions = [
  {id: 1, text: 'apple'},
  {id: 2, text: 'berry'},
  {id: 3, text: 'cherry'},
]
const myOptions2 = [
  {id: 1, text: 'apple'},
  {id: 2, text: 'berry'},
  {id: 3, text: 'cherry'},
]
const myValue = ref();
const myValue2 = ref();

</script>
<template>
  <main class="main cabinet create-subscribe-page bg-wrapper" role="main">
    <div class="bg-wrapper pt">
      <PersonalCabinetSearchMobile />
      <div class="wrapper wrapper-1290">
        <form class="create-subscribe" action="" name="create-subscribe ">
          <div class="w-box w-box--main w-box-subscribe">
            <div class="w-box-head">
              <h1 class="title">Создание подписки</h1>
              <div class="descr">Получайте уведомления о новых вакансиях по созданному запросу</div>
            </div>
            <div class="w-box-body">
              <CreateSubscriptionProvidersAndKeywords></CreateSubscriptionProvidersAndKeywords>
              <div class="sep"> </div>
              <CreateSubscriptionFieldsAndAreas></CreateSubscriptionFieldsAndAreas>
              <div class="sep"> </div>
              <CreateSubscriptionVaccination></CreateSubscriptionVaccination>
              <div class="sep"></div>
              <CreateSubscriptionJobSalaryAndCompany></CreateSubscriptionJobSalaryAndCompany>
              <div class="sep"></div>
              <CreateSubscriptionJobEmploymentAndLicense></CreateSubscriptionJobEmploymentAndLicense>
              <div class="sep"> </div>
              <CreateSubscriptionForeignLanguages></CreateSubscriptionForeignLanguages>
              <div class="sep"> </div>
              <CreateSubscriptionNotifications></CreateSubscriptionNotifications>
            </div>
          </div>
          <div class="form-submit-container">
            <p>Найдено 2 012 вакансий</p>
            <button class="button-accent" type="submit">Сохранить</button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<style>

</style>
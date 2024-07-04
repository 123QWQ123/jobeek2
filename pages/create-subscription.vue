<script setup>
import { z } from "~/hooks/ru-zod.js";
import { useAuthStore } from "~/store/auth.js";
import { toTypedSchema } from "@vee-validate/zod";

useHead({
  title: "Создание подписку",
});
const getFields = (newObject) => {
  if (!newObject) return {};
  return {
    first_name: newObject.first_name,
    last_name: newObject.last_name,
    email: newObject.email,
    email_to_verify: newObject.email_to_verify,
    birth_date: newObject.birth_date,
    city_id: newObject.city_id ?? undefined,
    city_name: newObject.city_name,
    photo: newObject.photo ?? null,
    photo_url: newObject.photo_url ?? null,
    country_id: newObject.country_id ?? 1,
    phone: authStore.user?.phone,
  };
};
const schema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  birth_date: z.string(),
  email: z.string().email(),
  city_id: z.number().safe("Выберити город из списка"),
  country_id: z.number().safe("Выберити страну из списка"),
});

const authStore = useAuthStore();
watch(
  () => authStore.seeker,
  (newValues) => {
    // resetForm({ values: newValues, touched: false });
  },
);

const initialValues = getFields(authStore.seeker);

const { values, errors, meta, setErrors, resetForm, validate } = useForm({
  initialValues,
  initialTouched: true,
  validationSchema: toTypedSchema(schema),
});
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
              <div class="descr">
                Получайте уведомления о новых вакансиях по созданному запросу
              </div>
            </div>
            <div class="w-box-body">
              <div class="input-row input-row--checkboxes">
                <label>Подключенные сервисы</label>
                <div class="input-wrapper input-wrapper--flex">
                  <div class="custom-check-wrap">
                    <div class="theme-checker theme-checker--blue">
                      <input type="checkbox" id="hh" />
                      <div class="theme-checker-ui">
                        <div class="circle"></div>
                      </div>
                    </div>
                    <label for="hh"
                      ><img src="~/assets/img/logos/hhmini.svg" alt="#" /><span
                        >Hh.ru</span
                      ></label
                    >
                  </div>
                  <div class="custom-check-wrap">
                    <div class="theme-checker theme-checker--blue">
                      <input type="checkbox" id="sj" checked />
                      <div class="theme-checker-ui">
                        <div class="circle"></div>
                      </div>
                    </div>
                    <label for="sj"
                      ><img src="~/assets/img/logos/sj.svg" alt="#" /><span
                        >Superjob.ru
                      </span></label
                    >
                  </div>
                </div>
              </div>
              <div class="input-row">
                <label for="search-words">Что искать</label>
                <div class="input-wrapper">
                  <input type="text" id="search-words" />
                  <div class="prompt">
                    Слова через запятую: найдутся вакансии, где встречается хотя
                    бы одно из указанных слов. Слова через пробел: найдутся
                    вакансии, где встречаются все указанные слова.
                  </div>
                  <div class="check-block">
                    <div class="checkbox">
                      <input type="checkbox" id="do-not-show-date" checked />
                      <div class="checkbox-mask">
                        <img src="~/assets/img/svg/check.svg" alt="#" />
                      </div>
                    </div>
                    <label for="do-not-show-date"
                      >Только в названии вакансий</label
                    >
                  </div>
                </div>
              </div>
              <div class="input-row">
                <label for="exclude-words"
                  >Исключать из названия вакансии</label
                >
                <div class="input-wrapper">
                  <input type="text" id="exclude-words" />
                </div>
              </div>
              <!--              <CreateSubscriptionProvidersAndKeywords></CreateSubscriptionProvidersAndKeywords>-->
              <div class="sep"></div>
              <CreateSubscriptionFieldsAndAreas></CreateSubscriptionFieldsAndAreas>
              <div class="sep"></div>
              <CreateSubscriptionVaccination></CreateSubscriptionVaccination>
              <div class="sep"></div>
              <CreateSubscriptionJobSalaryAndCompany></CreateSubscriptionJobSalaryAndCompany>
              <div class="sep"></div>
              <CreateSubscriptionJobEmploymentAndLicense></CreateSubscriptionJobEmploymentAndLicense>
              <div class="sep"></div>
              <CreateSubscriptionForeignLanguages></CreateSubscriptionForeignLanguages>
              <div class="sep"></div>
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

<style></style>

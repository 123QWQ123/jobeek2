<script setup>
import { zod } from "~/hooks/ru-zod.js";
import { useAuthStore } from "~/store/auth.js";
import { toTypedSchema } from "@vee-validate/zod";
import useApi from "~/hooks/useApi.js";
import { useDictionaryStore } from "~/store/dictionary.js";
import { useProfileStore } from "~/store/profile.js";

useHead({
  title: "Jobeek - Создание подписки",
});
const providers = ref([]);

const dictionaryStore = useDictionaryStore();
const profileStore = useProfileStore();
// Грузим справочники SSR-совместимо
useAsyncData(
  "dictionaries",
  async () => await dictionaryStore.getDictionaries(["work_type"]),
);
await useAsyncData("profileStore ", async () => await profileStore.getCities());
const getFields = (newObject) => {
  if (!newObject) return {};
  return {
    text: "",
    providers: [],
    work_types: [], //
    push_notification: false,
    email_notification: false,
    search_fields: [],
    cities: [],
    regions: [],
    countries: [],
    metros: [],
    professional_roles: [],
    salary: {
      from: 0,
      to: 0,
    },
  };
};
const schema = zod
  .object({
    text: zod.string(),
    providers: zod.array(zod.string()).nonempty("Выберите провайдера"),
    work_types: zod.array(zod.number()).nonempty(),
    push_notification: zod.boolean().optional(),
    email_notification: zod.boolean().optional(),
    cities: zod.array(zod.number()).optional(),
    regions: zod.array(zod.number()).optional(),
    countries: zod.array(zod.number()).optional(),
    metros: zod.array(zod.number()).optional(),
    professional_roles: zod.array(zod.number()).optional(),
    salary: zod
      .object({
        from: zod.number().int().nullish(),
        to: zod.number().int().nullish(),
      })
      .optional(),
  })
  .superRefine((value, ctx) => {
    if (!(value.push_notification || value.email_notification)) {
      ctx.addIssue({
        code: zod.ZodIssueCode.custom,
        message: "Обязательно выбрать один из типов уведомления!",
      });
    }
    return value.push_notification || value.email_notification;
  });

const authStore = useAuthStore();
const initialValues = getFields(authStore.seeker);

const { values, meta } = useForm({
  initialValues,
  validationSchema: toTypedSchema(schema),
});
const save = async () => {
  if (meta.value.dirty && meta.value.valid) {
    const data = await useApi("seeker/subscription", {
      method: "POST",
      payload: values,
    });

    if (data.status === "success") {
      navigateTo({ name: "subscriptions" });
    }
  }
};
</script>
<template>
  <main class="main cabinet create-subscribe-page bg-wrapper" role="main">
    <div class="bg-wrapper pt">
      <PersonalCabinetSearchMobile />
      <div class="wrapper wrapper-1290">
        <form
          class="create-subscribe"
          name="create-subscribe"
          @submit.prevent="save"
        >
          <div class="w-box w-box--main w-box-subscribe">
            <div class="w-box-head">
              <h1 class="title">Создание подписки</h1>
              <div class="descr">
                Получайте уведомления о новых вакансиях по созданному запросу
              </div>
            </div>
            <div class="w-box-body">
              <CreateSubscriptionProvidersAndKeywords :providers="providers" />
              <div class="sep"></div>
              <CreateSubscriptionFieldsAndAreas />
              <!--          <div class="sep"></div>-->
              <!--          <CreateSubscriptionVaccination></CreateSubscriptionVaccination>-->
              <div class="sep"></div>
              <CreateSubscriptionJobSalaryAndCompany />
              <div class="sep"></div>
              <CreateSubscriptionJobEmploymentAndLicense />
              <!--              <div class="sep"></div>-->
              <!--              <CreateSubscriptionForeignLanguages></CreateSubscriptionForeignLanguages>-->
              <div class="sep"></div>
              <CreateSubscriptionNotifications />
            </div>
          </div>
          <div class="form-submit-container">
            <button class="button-accent">Сохранить</button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<style></style>

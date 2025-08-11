<script setup>
import { zod } from "~/hooks/ru-zod.js";
import { useAuthStore } from "~/store/auth.js";
import { toTypedSchema } from "@vee-validate/zod";
import useApi from "~/hooks/useApi.js";
import { useAsyncData } from "#app";
import { useProfileStore } from "~/store/profile.js";
import { useDictionaryStore } from "~/store/dictionary.js";

useHead({
  title: "Jobeek - Редактирование подписки",
});

const profileStore = useProfileStore();
const { getCities, searchProfessionalRoles } = profileStore;
const { getWorkTypes, work_types_formatted } = useDictionaryStore();

const subscribeId = useRoute().params.id;
const providers = ref(null);
const authStore = useAuthStore();

if (profileStore.cities.length === 0) {
  useAsyncData("getCities", () => getCities());
}
if (profileStore.professional_roles.length === 0) {
  useAsyncData("searchProfessionalRoles", () => searchProfessionalRoles());
}

if (work_types_formatted.length === 0) {
  useAsyncData("getWorkTypes", () => getWorkTypes());
}

const {
  data: {
    value: {
      data: { data, status },
    },
  },
} = await useAsyncData(`subscription_${subscribeId}`, async () => {
  return useApi(`seeker/subscription/${subscribeId}`, {
    method: "get",
  });
});

const getFields = (newObject) => {
  if (!newObject) return {};
  return {
    text: "",
    providers: [],
    work_types: [], //
    push_notification: false,
    email_notification: false,
    cities: [],
    professional_roles: [],
    salary: {
      from: 0,
      to: 0,
    },
  };
};
const initialValues = getFields(authStore.seeker);

const schema = zod
  .object({
    text: zod.string().nullish(),
    providers: zod.array(zod.string()).nonempty(),
    work_types: zod.array(zod.number()).nonempty(),
    push_notification: zod.boolean().optional(),
    email_notification: zod.boolean().optional(),
    cities: zod.array(zod.number()).optional(),
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

const { values, meta, setValues, errors } = useForm({
  initialValues,
  initialTouched: true,
  validationSchema: toTypedSchema(schema),
});

if (status === "success") {
  providers.value = data.providers;
  setValues({
    text: data.params?.text,
    providers: data.providers,
    work_types: data.params?.work_types?.map((item) => parseInt(item)), //
    push_notification: data.push_notification,
    email_notification: data.email_notification,
    cities: data.params?.cities?.map((item) => parseInt(item)),
    professional_roles: data.params?.professional_roles?.map((item) =>
      parseInt(item),
    ),
    salary: {
      from: parseInt(data.params?.salary.from),
      to: parseInt(data.params?.salary.to),
    },
  });
}

const save = async () => {
  if (meta.value.dirty && meta.value.valid) {
    await useApi("seeker/subscription/" + subscribeId, {
      method: "PUT",
      payload: values,
    });
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
              <h1 class="title">Редактирование подписки</h1>
              <div class="descr">
                Получайте уведомления о новых вакансиях по созданному запросу
              </div>
            </div>
            <div class="w-box-body">
              <CreateSubscriptionProvidersAndKeywords :providers="providers" />
              <div class="sep" />
              <CreateSubscriptionFieldsAndAreas />
              <div class="sep" />
              <CreateSubscriptionJobSalaryAndCompany />
              <div class="sep" />
              <CreateSubscriptionJobEmploymentAndLicense />
              <div class="sep" />
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

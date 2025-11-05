<template>
  <div class="w-box w-box--main w-box-resume pb-4">
    <div class="w-box-head">
      <h1 class="title">{{ formTitle }}</h1>
      <div class="descr">
        Получайте уведомления о новых по созданному запросу
      </div>
    </div>

    <div class="w-box-body" :class="{ disabled: isLoading }">
      <div v-if="errors.message || errorMessage" class="text-danger mb-3">
        {{ errors.message || errorMessage }}
      </div>

      <CreateVacancyProvidersInput name="providers" />

      <div class="input-row">
        <label for="name">Название вакансии<b>*</b></label>
        <div class="input-wrapper">
          <CreateVacancyTextInput name="name" placeholder="Введите" />
        </div>
      </div>

      <div class="input-row">
        <label>Список городов:<b>*</b></label>
        <div class="input-wrapper mt-2">
          <CreateVacancyCities name="cities" />
        </div>
      </div>

      <div class="input-row">
        <label>Специализация:<b>*</b></label>
        <div class="input-wrapper mt-2">
          <CreateVacancyProfessionalRoles name="professional_roles" />
        </div>
      </div>

      <div class="input-row">
        <label for="description">Описание:</label>
        <div class="input-wrapper">
          <VeeTipTapRichEditor name="description" />
        </div>
      </div>

      <!-- Секция зарплаты -->
      <div class="input-row">
        <label>Зарплата:</label>
        <div class="row-container">
          <div class="row mb-2">
            <div class="col-6">
              <div class="input-wrapper w-100">
                <CreateVacancyTextInput
                  type="number"
                  name="salary.from"
                  placeholder="От"
                />
              </div>
            </div>
            <div class="col-6">
              <div class="input-wrapper w-100">
                <CreateVacancyTextInput
                  type="number"
                  name="salary.to"
                  placeholder="До"
                />
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-6">
              <VeeCustomSelect
                label="Период"
                :options="dictionaryStore.payment_period_formatted"
                name="salary.period"
              />
            </div>
            <div class="col-6">
              <VeeCustomSelect
                label="Валюта"
                :options="currencyOptions"
                name="salary.currency"
              />
            </div>
          </div>

          <div class="row mt-2">
            <CreateVacancyCheckboxInput
              name="salary.gross"
              label="до вычета налогов"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useDictionaryStore } from "~/store/dictionary";
import { useVacancyStore } from "~/store/vacancy.js";
import useFormValidation from "~/composables/useFormValidation";
import useProviders from "~/composables/useProviders.js";
import { zod } from "~/hooks/ru-zod.js";
import { toTypedSchema } from "@vee-validate/zod";
import { useCurrencyOptions } from "~/composables/useCurrencyOptions.js";
import { toast } from "vue3-toastify";

// Определение пропсов и состояний
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});

// Константы и хуки
const route = useRoute();
const dictionaryStore = useDictionaryStore();
const vacancyStore = useVacancyStore();
const { providers } = useProviders();
const { createDraft } = vacancyStore;

// Вычисляемые свойства
const formTitle = computed(() => props.title);
const currencyOptions = ref(useCurrencyOptions());

// Состояния компонента
const isLoading = ref(false);
const errorMessage = ref(null);

// Схема валидации формы
const validationSchema = zod.object({
  providers: zod.array(zod.string()).nonempty("Обязательное поле"),
  name: zod.string(),
  cities: zod.array(zod.number()).nonempty("Обязательное поле"),
  description: zod
    .string()
    .min(200, "Количество символов должно быть не меньше 200"),
  professional_roles: zod.array(zod.number()).nonempty("Обязательное поле"),
  salary: zod.object({
    currency: zod.string(),
    from: zod.number(),
    to: zod.number(),
    gross: zod.boolean(),
    period: zod.number(),
  }),
});

// Инициализация формы
const { values, errors, meta, setErrors, validate } = useForm({
  initialValues: {
    providers: [],
    name: null,
    cities: [],
    professional_roles: [],
    salary: {
      currency: "RUB",
      from: null,
      to: null,
      gross: false,
      period: null,
    },
  },
  initialTouched: true,
  validationSchema: toTypedSchema(validationSchema),
});

// Загрузка периодов оплаты
onMounted(async () => {
  if (!dictionaryStore.payment_period_formatted.length) {
    await dictionaryStore.getPaymentPeriodOptions();
  }
});

// Обработка ошибок с сервера
const { errors: serverErrors } = useFormValidation();
watch(
  () => serverErrors.value,
  (newErrors) => {
    if (newErrors && Object.keys(newErrors).length > 0) {
      const backendErrors = {};
      Object.keys(newErrors).forEach((key) => {
        backendErrors[key] = newErrors[key];
      });
      setErrors(backendErrors);
    }
  },
);

// Функция сохранения черновика
const save = async (is_from_parent = false) => {
  await validate();

  if (!meta.value.valid) {
    errorMessage.value = "Пожалуйста, заполните все обязательные поля";
    window.scrollTo({ top: 0, behavior: "smooth" });
    return false;
  }

  try {
    setErrors({});
    errorMessage.value = "";
    isLoading.value = true;

    const resData = await createDraft(unref(values), (result) => {
      if (result.status === "failed") {
        setErrors(result.errors);
      } else {
        toast.info(result.message);
      }
    });

    if (resData.status !== "success") {
      errorMessage.value = resData.message;
      return false;
    }

    if (is_from_parent) {
      return true;
    }

    const vacancy_id = resData.data.data.id;
    navigateTo({
      name: "my-vacancy-id",
      params: { id: vacancy_id },
      query: { type: "draft" },
    });
    return true;
  } catch (error) {
    errorMessage.value = "Произошла ошибка при сохранении";
    console.error("Ошибка сохранения:", error);
    return false;
  } finally {
    isLoading.value = false;
  }
};

// Экспорт API компонента
defineExpose({ save });
</script>

<style>
.w-box-body.disabled {
  position: relative;
}

.w-box-body.disabled:before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  pointer-events: all;
}
</style>

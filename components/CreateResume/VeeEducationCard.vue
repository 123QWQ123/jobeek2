<template>
  <div class="w-box" v-click-outside="save">
    <div class="w-box-head">
      <h3 class="title">Образование</h3>
      <span
        class="arrow"
        :class="{ up: isCollapsed, 'is-completed': isCompleted }"
        @click="isCollapsed = !isCollapsed"
      ></span>
    </div>

    <div class="text-danger d-block">
      {{ errorMessage }}
    </div>
    <transition>
      <div
        class="w-box-body"
        :class="{ collapse: isCollapsed }"
        @click="isFocused = true"
      >
        <div class="" v-if="isShown">
          <div class="row">
            <div class="input-row">
              <label for="position">Уровен образование 1<b>*</b></label>
              <div class="input-wrapper">
                <VeeCustomSelect
                  :options="educationLevelOptions"
                  :label="'Выберите'"
                  name="education_level_id"
                />
              </div>
            </div>

            <div class="mt-3">
              <LazyCreateResumeVeeEducationForm
                ref="educationElement"
                name="educations"
                :parent_type_id="state.education_level_id.val"
              />
            </div>
          </div>
        </div>
        <div class="empty-area" v-else>
          <span>Здесь вы можете указать</span>
          <button class="add" type="button" @click="isShown = !isShown">
            Добавить
          </button>
        </div>

        <!--        <transition>-->
        <!--          <span-->
        <!--            v-if="isSaved"-->
        <!--            class="p-3 d-inline-flex justify-content-center align-items-center"-->
        <!--            style="color: #0c0"-->
        <!--          >-->
        <!--            <svg-->
        <!--              xmlns="http://www.w3.org/2000/svg"-->
        <!--              width="24"-->
        <!--              height="24"-->
        <!--              viewBox="0 0 24 24"-->
        <!--              class="me-2"-->
        <!--            >-->
        <!--              <path-->
        <!--                fill="#0c0"-->
        <!--                d="M10.041 17l-4.5-4.319 1.395-1.435 3.08 2.937 7.021-7.183 1.422 1.409-8.418 8.591zm5.959 7v-2h-8v2h8zm0-24v2h-8v-2h8zm2 0h1c2.762 0 5 2.239 5 5v1h-2v-1c0-1.654-1.346-3-3-3h-1v-2zm6 16h-2v-8h2v8zm-18 8h-1c-2.762 0-5-2.239-5-5v-1h2v1c0 1.654 1.346 3 3 3h1v2zm18-6v1c0 2.761-2.238 5-5 5h-1v-2h1c1.654 0 3-1.346 3-3v-1h2zm-24-12v-1c0-2.761 2.238-5 5-5h1v2h-1c-1.654 0-3 1.346-3 3v1h-2zm0 2h2v8h-2v-8z"-->
        <!--              />-->
        <!--            </svg>-->
        <!--            Сохранен-->
        <!--          </span>-->
        <!--        </transition>-->
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, reactive, watch, onMounted } from "vue";
import { useResumeStore } from "~/store/resume";
import { useDictionaryStore } from "~/store/dictionary";
import { useForm, useFieldArray } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import useProviders from "~/composables/useProviders.js";
import useProviderFields from "~/composables/useProviderFields";
import { zod } from "~/hooks/ru-zod.js";

// Сторы
const resumeStore = useResumeStore();
const dictionaryStore = useDictionaryStore();
const { providers } = useProviders();
const { my_resume } = storeToRefs(resumeStore);
const { updateResume } = resumeStore;

// Обращения к роутам
const route = useRoute();
const resumeID = computed(() => route.params.id);

// Состояния компонентов интерфейса
const isShown = ref(true);
const isCollapsed = ref(false);
const isFocused = ref(false);
const errorMessage = ref(null);
const educationElement = ref(false);

// Options для selects
const educationLevelOptions = computed(() =>
  dictionaryStore.resume_educations.map((item) => ({
    name: item.name,
    value: item.id,
  })),
);

// Cхема валидации
const schema = computed(() => {
  const baseScheme = {
    education_level_id: zod.number().nullable(),
    educations: zod.array().optional(),
  };

  const getAdditionalScheme = (isHH, isSuperjob) => {
    const commonFields = {
      type_id: isHH ? zod.number().nullable().optional() : zod.number(),
      profession: zod.string().nullable().optional(),
      institute: isSuperjob ? zod.string().nullish().optional() : zod.string(),
      faculty: zod.string().nullish().optional(),
      form_id: zod.number().nullable().optional(),
      end_year: isHH ? zod.number() : zod.number().nullish().optional(),
    };

    return zod.object(commonFields);
  };

  const educationScheme = getAdditionalScheme(
    providers.value.hh,
    providers.value.superjob,
  );
  baseScheme.educations = zod.array(educationScheme).optional();

  return zod.object(baseScheme);
});

// Начальные значения формы
const initialValues = ref({
  education_level_id: my_resume.value?.educations?.education_level?.id,
  educations: my_resume.value?.educations.primary.map((item) => ({
    faculty: item.faculty,
    institute: item.institute,
    profession: item.profession,
    end_year: item.end_year,
    type_id: item.type?.id,
    form_id: item.form?.id,
  })),
});

// Управление формой Vee-Validate
const { values, errors, meta, resetForm, setErrors, validate } = useForm({
  initialValues,
  initialTouched: true,
  validationSchema: toTypedSchema(schema.value),
});

// Состояние полей по провайдерам
const fields = ref({
  hh: {
    education_level_id: true,
    educations: null,
  },
  superjob: {
    education_level_id: null,
    educations: null,
  },
});

// Реактивное состояние видимости полей
const state = reactive({
  education_level_id: {
    is_hidden: false,
  },
  educations: {
    is_hidden: false,
  },
});

// Инициализация логики отображения полей по провайдерам
const { walkThroughFields } = useProviderFields(state, fields);
watch(
  () => providers.value,
  () => walkThroughFields(providers.value),
);
walkThroughFields(providers.value);

// Логика сохранения формы
const save = async () => {
  await validate();

  if (!meta.value.dirty || !meta.value.valid) return;

  const resData = await updateResume(resumeID.value, {
    form_data: "EDUCATION_DATA",
    educations: {
      primary: values.educations,
      education_level_id: values.education_level_id,
    },
  });

  if (resData.status !== "success") {
    errorMessage.value = resData.message;
    if (resData.errors) setErrors(resData.errors);
    return;
  }

  resetForm({ values });
};

// Вычисляемые свойства
const isCompleted = computed(
  () => my_resume.value?.educations.primary?.length > 0,
);

// Открываем метод для использования при необходимости
defineExpose({ save });
</script>

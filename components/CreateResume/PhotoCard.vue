<template>
  <div v-if="isHidden" class="w-box" v-click-outside="save">
    <div class="w-box-head">
      <h3 class="title">Фотографии</h3>
      <span
        class="arrow"
        :class="{ up: isCollapsed, 'is-completed': isCompleted }"
        @click="isCollapsed = !isCollapsed"
      ></span>
    </div>

    <div class="text-danger d-block p-4" v-if="errors.message">
      {{ errors.message }}
    </div>
    <transition>
      <div
        class="w-box-body"
        :class="{ collapse: isCollapsed }"
        @click="isFocused = true"
      >
        <div class="input-row">
          <label for="photo">Фото({{ state.photo_id.val }})</label>
          <div class="dwld-photo">
            <CreateResumePhotoInput
              v-model="state.photo_id.val"
              :errors="errors"
            />

            <div class="mt-4">
              <button
                class="btn btn-primary"
                @click.prevent="isPhotosShown = !isPhotosShown"
              >
                {{ toggleButtonText }}
              </button>
              <div class="row mt-2" v-if="isPhotosShown">
                <div
                  v-if="artifacts.length > 0"
                  class="col-sm-4 mb-2 cursor-pointer"
                  v-for="item in artifacts"
                >
                  <div
                    class="photo position-relative"
                    @click="onSelect(item.id)"
                  >
                    <img :src="item.url" alt="#" />
                    <div class="photo-actions">
                      <button
                        class="photo-action delete"
                        @click.prevent="onDeleteArtifact(item.id)"
                        type="button"
                      >
                        <svg
                          width="28"
                          height="28"
                          viewBox="0 0 28 28"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M14.0007 2.04175C14.9691 2.04168 15.901 2.41223 16.6049 3.07737C17.3089 3.7425 17.7317 4.65181 17.7865 5.61875L17.7923 5.83342H23.9173C24.139 5.83348 24.3524 5.9177 24.5144 6.06905C24.6764 6.2204 24.7749 6.4276 24.79 6.64878C24.8051 6.86995 24.7357 7.08862 24.5958 7.2606C24.4559 7.43257 24.2559 7.54503 24.0363 7.57525L23.9173 7.58342H22.9887L21.4953 22.7734C21.4205 23.5307 21.0789 24.2367 20.5316 24.7655C19.9843 25.2942 19.2669 25.6111 18.5075 25.6597L18.3022 25.6667H9.69915C8.93786 25.6667 8.20138 25.396 7.62132 24.9029C7.04127 24.4099 6.65546 23.7266 6.53282 22.9753L6.50598 22.7722L5.01148 7.58342H4.08398C3.87254 7.58341 3.66825 7.50683 3.5089 7.36785C3.34955 7.22887 3.24591 7.03689 3.21715 6.82742L3.20898 6.70842C3.20899 6.49697 3.28557 6.29268 3.42455 6.13333C3.56352 5.97398 3.75551 5.87034 3.96498 5.84158L4.08398 5.83342H10.209C10.209 4.8278 10.6085 3.86338 11.3195 3.1523C12.0306 2.44123 12.995 2.04175 14.0007 2.04175ZM21.2305 7.58342H6.76965L8.24782 22.6007C8.28055 22.9358 8.42821 23.2493 8.66575 23.4879C8.90328 23.7265 9.21605 23.8755 9.55098 23.9097L9.69915 23.9167H18.3022C19.0022 23.9167 19.596 23.4209 19.7313 22.7477L19.7547 22.6007L21.2293 7.58342H21.2305ZM16.0423 10.7917C16.2538 10.7918 16.4581 10.8683 16.6174 11.0073C16.7768 11.1463 16.8804 11.3383 16.9092 11.5477L16.9173 11.6667V19.8334C16.9173 20.0551 16.833 20.2685 16.6817 20.4305C16.5303 20.5925 16.3231 20.691 16.102 20.7061C15.8808 20.7212 15.6621 20.6518 15.4901 20.5119C15.3182 20.372 15.2057 20.172 15.1755 19.9524L15.1673 19.8334V11.6667C15.1673 11.4347 15.2595 11.2121 15.4236 11.048C15.5877 10.8839 15.8103 10.7917 16.0423 10.7917ZM11.959 10.7917C12.1704 10.7918 12.3747 10.8683 12.5341 11.0073C12.6934 11.1463 12.7971 11.3383 12.8258 11.5477L12.834 11.6667V19.8334C12.8339 20.0551 12.7497 20.2685 12.5983 20.4305C12.447 20.5925 12.2398 20.691 12.0186 20.7061C11.7974 20.7212 11.5788 20.6518 11.4068 20.5119C11.2348 20.372 11.1224 20.172 11.0922 19.9524L11.084 19.8334V11.6667C11.084 11.4347 11.1762 11.2121 11.3403 11.048C11.5044 10.8839 11.7269 10.7917 11.959 10.7917ZM14.0007 3.79175C13.4883 3.79177 12.9946 3.98445 12.6177 4.33154C12.2408 4.67864 12.0081 5.15476 11.966 5.66541L11.959 5.83342H16.0423C16.0423 5.29193 15.8272 4.77263 15.4443 4.38974C15.0614 4.00685 14.5421 3.79175 14.0007 3.79175Z"
                            fill="#D2D2D2"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="col mb-2" v-else>
                  загруженные фотографии не найдены
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
const props = defineProps(["title", "providers"]);

import { useProfileStore } from "~/store/profile";
import { useFormData } from "~/composables/useFormData";
import { useRuntimeConfig } from "#app";
import useFormValidation from "~/composables/useFormValidation";
import { useWatchStateValues } from "~/composables/useWatchStateValues";
import { useDiff } from "~/composables/useDiff";
import { useDictionaryStore } from "~/store/dictionary";
import { useResumeStore } from "~/store/resume";

const resumeStore = useResumeStore();
const profileStore = useProfileStore();
const CONFIG = useRuntimeConfig();
const route = useRoute();

const resumeID = computed(() => route.params.id);
const { updateResume, getMyResume } = resumeStore;

const { employer } = profileStore;
const { getArtifacts } = profileStore;
await getArtifacts({ type: 1 });
const artifacts = computed(() => profileStore.artifacts);
const isPhotosShown = ref(false);
const toggleButtonText = computed(() => {
  if (isPhotosShown.value) {
    return "Скрыть";
  } else {
    return "Выбрать из загруженных";
  }
});

const my_resume = computed(() => resumeStore.my_resume);

const isSaved = ref(false);
const isChanged = ref(false);
const isFirst = ref(true);
const isCollapsed = ref(false);
const isUpdated = ref(false);

const providers = computed(() => props.providers);
const isHidden = ref(props.providers.hh ?? false);
watch(
  () => props.providers,
  (newProviders) => {
    isHidden.value = newProviders.hh;
  },
);

const state = reactive({
  photo_id: {
    val: null,
    isValid: true,
  },
  isFormValid: true,
  isNew: true,
  isLoading: false,
  error: null,
  success: null,
});

watch(
  () => useWatchStateValues(state, true, true),
  (newState, oldState) => {
    if (!isFirst.value) {
      isChanged.value = true;
    } else {
      isFirst.value = false;
    }
  },
);

const sectionData = ref({});
watch(
  () => sectionData.value,
  (newData, oldData) => {
    const diffData = useDiff(newData, oldData);
    if (Object.keys(diffData).length) {
      state.photo_id.val = newData.photo_id;
    }
  },
);
watch(
  () => resumeStore.my_resume,
  (newData) => {
    if (isUpdated.value) {
      isUpdated.value = false;
      return;
    }
    if (newData) {
      sectionData.value = {
        photo_id: newData.photo?.id,
      };
    }
  },
);

const dictionaryStore = useDictionaryStore();

const { errors, handleErrorResponse } = useFormValidation();
const isFocused = ref(false);

const { deleteArtifact } = profileStore;
const onDeleteArtifact = async (id) => {
  console.log(id);
  const resData = await deleteArtifact(id);
  if (resData.status === "success") {
    await getArtifacts({ type: 1 });
    getMyResume(resumeID.value);
  }
};
const onSelect = async (id) => {
  state.photo_id.val = id;
  setTimeout(() => {
    save();
  });
};
const save = async (is_from_parent = false) => {
  if (is_from_parent === true) {
    isFocused.value = true;
  }
  if (!isFocused.value) {
    return true;
  }

  if (isChanged.value) {
    state.isLoading = true;
    // validate();
    errors.value = {};
    state.errorMessage = "";
    let resData = {};
    const jsonData = useFormData(state);
    jsonData.form_data = "UPDATE_PHOTO_DATA";
    resData = await updateResume(resumeID.value, jsonData);
    isUpdated.value = true;
    if (resData.status !== "success") {
      return handleErrorResponse(resData.data);
    }

    isChanged.value = false;
    isSaved.value = false;
    isUpdated.value = false;
    isFocused.value = false;
    if (is_from_parent) {
      return new Promise((resolve, reject) => {
        resolve(true);
      });
    }
  } else {
    return true;
  }
};

const isCompleted = computed(() => {
  const newData = my_resume.value;
  if (newData && !isCollapsed.value) {
    return newData.type && newData.type.id;
  }
  return false;
});

defineExpose({
  save,
});
</script>

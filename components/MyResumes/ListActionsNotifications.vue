<template>
  <div class="d-inline-flex ms-0 ms-lg-auto">
    <div class="d-inline-flex flex-column flex-lg-row mt-4 mt-lg-0 ms-sm-4">
      <div class="check-block mb-2 mb-md-1 mb-lg-0 me-lg-3">
        <MyResumesCheckbox
          name="all"
          label="Подключить все уведомления"
          @change="onChange"
        />
      </div>
      <div class="check-block mb-2 mb-md-1 mb-lg-0 me-lg-3">
        <MyResumesCheckbox
          name="notifications.push_notification"
          label="Push"
        />
      </div>
      <div class="check-block">
        <MyResumesCheckbox
          name="notifications.email_notification"
          label="E-mail"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useField, useForm } from "vee-validate";
import { useResumeStore } from "~/store/resume.js";

const props = defineProps(["name"]);

const resumeStore = useResumeStore();

const { values, setValues, resetForm } = useForm({
  initialValues: {
    all: false,
    notifications: {
      push_notification: false,
      email_notification: false,
    },
  },
});
const { value: all, setValue } = useField("all");
const onChange = (newValue) => {
  if (all.value) {
    setValues({
      all: true,
      notifications: { push_notification: true, email_notification: true },
    });
  } else {
    setValues({
      all: false,
      notifications: { push_notification: false, email_notification: false },
    });
  }
};
const { modifyNotifications, getMyResumes } = useResumeStore();
const isFirst = ref(true);

watch(
  () => ({ ...values.notifications }),
  async (newValue, oldValue) => {
    if (!isFirst.value) {
      const resData = await modifyNotifications(newValue);
      if (resData.status !== "success") {
        setValues({ ...values, notifications: oldValue });
        return;
      }
      setValues({
        all: newValue.push_notification && newValue.email_notification,
        notifications: newValue,
      });
      await getMyResumes();
      return;
    } else {
      setValues({
        all: newValue.push_notification && newValue.email_notification,
        notifications: newValue,
      });
      isFirst.value = false;
    }
  },
);

const reformat = () => {
  if (resumeStore.my_resumes.length < 1) {
    resetForm({
      values: {
        all: false,
        notifications: {
          push_notification: false,
          email_notification: false,
        },
      },
    });
    return;
  }
  const is_all_email = resumeStore.my_resumes.every(
    (item) => item.email_notification === true,
  );
  const is_all_push = resumeStore.my_resumes.every(
    (item) => item.push_notification === true,
  );

  resetForm({
    values: {
      all: is_all_email && is_all_push,
      notifications: {
        push_notification: is_all_push,
        email_notification: is_all_email,
      },
    },
  });
};
watch(
  () => resumeStore.my_resumes,
  () => {
    reformat();
  },
);
onMounted(() => {
  if (resumeStore.my_resumes.length > 0) {
    reformat();
  }
});
</script>

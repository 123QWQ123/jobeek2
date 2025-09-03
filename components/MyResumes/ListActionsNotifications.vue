<template>
  <div class="d-inline-flex ms-0 ms-lg-auto">
    <div class="d-inline-flex flex-column flex-lg-row mt-4 mt-lg-0 ms-sm-4">
      <div class="check-block mb-2 mb-md-1 mb-lg-0 me-lg-3">
        <MyResumesCheckbox
          name="all"
          label="Подключить все уведомления"
          @change="handleNotificationChange"
        />
      </div>
      <div class="check-block mb-2 mb-md-1 mb-lg-0 me-lg-3">
        <MyResumesCheckbox
          name="notifications.push_notification"
          label="Push"
          @change="handleNotificationChange"
        />
      </div>
      <div class="check-block">
        <MyResumesCheckbox
          name="notifications.email_notification"
          label="E-mail"
          @change="handleNotificationChange"
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
const { modifyNotifications, getMyResumes, recomputeNotificationForm } =
  resumeStore;
const isFirst = ref(true);

const { values, setValues, resetForm } = useForm({
  initialValues: recomputeNotificationForm(),
});
const { value: all, setValue } = useField("all");
// Объект для обработки изменений
const handleNotificationChange = async (event) => {
  const type = event.target.name.split(".").pop();
  const checked = event.target.checked;
  let notifications = { ...values.notifications };
  const recalculated = recomputeNotificationForm();

  if (type === "all") {
    notifications = {
      push_notification: checked,
      email_notification: checked,
    };
  } else {
    notifications[type] = checked;
  }

  const resData = await modifyNotifications(notifications);
  if (resData.status === "success") {
    resumeStore.my_resumes.forEach((item) => {
      item.push_notification = notifications.push_notification;
      item.email_notification = notifications.email_notification;
    });
  }
  setValues({
    all: recalculated.all,
    notifications: recalculated.notifications,
  });
};
watch(
  () => resumeStore.my_resumes,
  () => {
    const recalculated = resumeStore.recomputeNotificationForm
      ? resumeStore.recomputeNotificationForm()
      : null;

    if (recalculated) {
      setValues({
        all: recalculated.all,
        notifications: recalculated.notifications,
      });
    }
  },
  { deep: true },
);
</script>

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
// Объект для обработки изменений
const handleNotificationChange = async (event) => {
  const type = event.target.name.split(".").pop();
  const checked = event.target.checked;
  let notifications = { ...values.notifications };
  console.log(type, notifications);
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
    setValues({
      all: notifications.push_notification && notifications.email_notification,
      notifications,
    });
  } else {
    if (type === "all") {
      setValues({
        all: !checked,
        notifications: {
          push_notification: !checked,
          email_notification: !checked,
        },
      });
    } else {
      notifications[type] = !checked;
      setValues({
        all:
          notifications.push_notification && notifications.email_notification,
        notifications,
      });
    }
  }
};
const { modifyNotifications, getMyResumes } = useResumeStore();
const isFirst = ref(true);

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

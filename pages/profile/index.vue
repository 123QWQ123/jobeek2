<script setup>
import { useAuthStore } from "~/store/auth";

definePageMeta({
  layout: "cabinet",
});
const authStore = useAuthStore();

if (!authStore.isEmployer) {
  navigateTo({ name: "profile-seeker" });
} else {
  navigateTo({ name: "profile-employer" });
}

// onMounted(() => {
//   setTimeout(() => {
//     if (authStore.isEmployer) {
//     } else {
//       navigateTo({ name: "profile-seeker" });
//     }
//   }, 100);
// });
</script>

<script setup>
import { useAuthStore } from "~/store/auth";

definePageMeta({
  layout: "cabinet",
});
const authStore = useAuthStore();

if (process.server) {
  navigateTo({ name: "profile-seeker" });
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

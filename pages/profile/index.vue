<script setup>
import { useAuthStore } from "~/store/auth";

const authStore = useAuthStore();

if (!authStore.isEmployer) {
  navigateTo({ name: "profile-seeker" });
} else {
  navigateTo({ name: "profile-employer" });
}
</script>

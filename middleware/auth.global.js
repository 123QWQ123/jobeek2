import { useAuthStore } from "~/store/auth";
import { protected_routes, public_routes } from "~/config";

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (!process.server) {
    const authStore = useAuthStore();
    let employer = computed(() => authStore.employer);
    let seeker = computed(() => authStore.seeker);
    let isAuthed = computed(() => authStore.isAuthed);

    if (public_routes.includes(to.name)) {
      return true;
    }

    if (to.name === "profile") {
      if (!authStore.isEmployerMode) {
        navigateTo({ name: "profile-seeker" });
      } else {
        navigateTo({ name: "profile-employer" });
      }
    }

    if (!isAuthed.value) {
      return navigateTo({
        path: "/sign-in",
        query: {
          message: "Пожалуйста, зайдите в профиль",
          redirect: to.name,
        },
      });
    }

    if (employer.value !== null) {
      if (
        protected_routes.includes(to.name) &&
        employer.value &&
        employer.value.is_completed === false
      ) {
        return navigateTo({
          path: "/profile/employer",
        });
      }
      return;
    } else {
      if (
        protected_routes.includes(to.name) &&
        seeker.value &&
        seeker.value.is_completed === false
      ) {
        return navigateTo({
          path: "/profile/seeker",
        });
      }
      return;
    }
  }
});

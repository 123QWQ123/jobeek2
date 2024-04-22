import { useAuthStore } from "~/store/auth";
import { protected_routes, public_routes } from "~/config";
import { useProfileStore } from "~/store/profile";

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (!process.server) {
    const authStore = useAuthStore();
    const profileStore = useProfileStore();
    const { getEmployer, getSeeker } = profileStore;
    let employer = computed(() => authStore.employer);
    let seeker = computed(() => authStore.seeker);
    let isAuthed = computed(() => authStore.isAuthenticated);

    const isEmployer =
      localStorage.getItem("isEmployer") !== "true" ? false : true;
    const { tryLogin, logout } = authStore;
    if (authStore.isAuthed === null) {
      const isAuthed = await tryLogin();
    }

    if (public_routes.includes(to.name)) {
      return true;
    }

    if (isAuthed.value !== true) {
      return navigateTo({
        path: "/sign-in",
        query: {
          message: "Пожалуйста, зайдите в профиль",
        },
      });
    }

    if (isEmployer) {
      // await getEmployer("employer/profile");
      if (
        protected_routes.includes(to.name) &&
        employer.value &&
        employer.value.is_completed == false
      ) {
        return navigateTo({
          path: "/profile/employer",
        });
      }
      return;
    } else {
      // await getSeeker("seeker/profile");
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

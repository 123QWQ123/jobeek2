import { useAuthStore } from "~/store/auth";
import { protected_routes, public_routes } from "~/config";

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (!process.server) {
    const authStore = useAuthStore();
    let employer = computed(() => authStore.employer);
    let seeker = computed(() => authStore.seeker);
    let isAuthed = computed(() => authStore.isAuthenticated);

    const isEmployer =
      localStorage.getItem("isEmployer") !== "true" ? false : true;
    const {
      tryLogin,
      setSeeker,
      setEmployer,
      setUser,
      refreshSeeker,
      refreshEmployer,
    } = authStore;
    const token = localStorage.getItem("token");
    if (!token) {
      if (authStore.isAuthed === null) {
        const isAuthed = await tryLogin();
      }
    } else {
      if (!localStorage.getItem("seeker")) {
        // const seeker = await refreshSeeker();
      }
      if (!localStorage.getItem("employer")) {
        // const employer = await refreshEmployer();
      }
      const seeker = JSON.parse(localStorage.getItem("seeker"));
      const employer = JSON.parse(localStorage.getItem("employer"));
      setSeeker(seeker);
      setEmployer(employer);
      if (isEmployer && employer) {
        setUser(employer);
      } else {
        if (seeker) {
          setUser(seeker);
        }
      }
    }

    if (public_routes.includes(to.name)) {
      return true;
    }

    if (to.name === "profile") {
      if (!authStore.isEmployer) {
        navigateTo({ name: "profile-seeker" });
      } else {
        navigateTo({ name: "profile-employer" });
      }
    }

    if (isAuthed.value !== true) {
      return navigateTo({
        path: "/sign-in",
        query: {
          message: "Пожалуйста, зайдите в профиль",
          redirect: to.name,
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

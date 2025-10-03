import { useAuthStore } from "~/store/auth";
import { protected_routes, public_routes } from "~/config";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore();
  const { value: employer } = computed(() => authStore.employer);
  const { value: seeker } = computed(() => authStore.seeker);
  const { value: isAuthed } = computed(() => authStore.isAuthed);
  const { value: isEmployerMode } = computed(() => authStore.isEmployerMode);

  if (to.name === "index" && isAuthed) {
    if (!from.redirectedFrom) {
      return navigateTo({
        name: authStore.isEmployerMode ? "profile-employer" : "profile-seeker",
      });
    }
    return false;
  }

  // Allow access if the route is public
  if (!isAuthed && public_routes.includes(to.name)) {
    return true;
  }

  // Check if the user is authenticated
  if (!isAuthed) {
    return navigateTo({
      path: "/sign-in",
      query: {
        redirect: to.name,
      },
    });
  }

  // Handle profile routes
  if (to.name === "profile") {
    return navigateTo({
      name: authStore.isEmployerMode ? "profile-employer" : "profile-seeker",
    });
  }

  const isIncompleteProfile = (user) => user && !user.is_completed;

  // Check if employer profile is incomplete
  if (
    isEmployerMode &&
    employer &&
    isIncompleteProfile(employer) &&
    protected_routes.includes(to.name)
  ) {
    return navigateTo({ path: "/profile/employer" });
  }

  // Check if seeker profile is incomplete
  if (
    !isEmployerMode &&
    seeker &&
    isIncompleteProfile(seeker) &&
    protected_routes.includes(to.name)
  ) {
    return navigateTo({ path: "/profile/seeker" });
  }
});

import { useAuthStore } from "~/store/auth";
import { protected_routes, public_routes } from "~/config";

export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore();
  const { value: employer } = computed(() => authStore.employer);
  const { value: seeker } = computed(() => authStore.seeker);
  const { value: isAuthed } = computed(() => authStore.isAuthed);

  // Allow access if the route is public
  if (public_routes.includes(to.name)) {
    return true;
  }

  // Handle profile routes
  if (to.name === "profile") {
    return navigateTo({
      name: authStore.isEmployerMode ? "profile-employer" : "profile-seeker",
    });
  }

  // Check if the user is authenticated
  if (!isAuthed) {
    return navigateTo({
      path: "/sign-in",
      query: {
        message: "Please log in to access your profile",
        redirect: to.name,
      },
    });
  }

  const isIncompleteProfile = (user) => user && !user.is_completed;

  // Check if employer profile is incomplete
  if (
    employer &&
    isIncompleteProfile(employer) &&
    protected_routes.includes(to.name)
  ) {
    return navigateTo({ path: "/profile/employer" });
  }

  // Check if seeker profile is incomplete
  if (
    seeker &&
    isIncompleteProfile(seeker) &&
    protected_routes.includes(to.name)
  ) {
    return navigateTo({ path: "/profile/seeker" });
  }

  // Server-side authorization check
  if (
    process.server &&
    !isAuthed &&
    !["/sign-in", "/", "/sign-up"].includes(to.fullPath)
  ) {
    return navigateTo("/sign-in");
  }
});

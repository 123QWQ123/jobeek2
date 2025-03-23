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

  // Check if the user is authenticated
  if (!isAuthed) {
    console.log(
      "Redirecting to sign-in page because user is not authenticated",
    );
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
});

export default defineNuxtRouteMiddleware((to, from) => {
  if (
    to.name === "sign-in" ||
    to.name === "sign-up" ||
    to.name === "forgot-password"
  ) {
    setPageLayout("guest");
  } else {
    setPageLayout("auth");
  }
});

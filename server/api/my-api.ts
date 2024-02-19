export default defineEventHandler(async (event) => {
  const sentry = event.context.$sentry;
  if (sentry) {
    // Do something with Sentry if exists
    // e.g.
    sentry.setUser({
      /*...*/
    });
  }
});

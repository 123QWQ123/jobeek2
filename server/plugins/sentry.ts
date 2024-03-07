export default defineNitroPlugin((nitroApp) => {
  const {
    public: { sentry },
  } = useRuntimeConfig();

  // If no sentry DSN set, ignore and warn in the console
  if (!sentry.dsn) {
    console.warn("Sentry DSN not set, skipping Sentry initialization");
    return;
  }

  // Initialize Sentry
  // Sentry.init({
  //   dsn: sentry.dsn,
  //   environment: sentry.environment,
  //   enabled: sentry.environment === "production",
  //   integrations: [new ProfilingIntegration()],
  //   // Performance Monitoring
  //   tracesSampleRate: 1.0, // Change in production!
  //   // Set sampling rate for profiling - this is relative to tracesSampleRate
  //   profilesSampleRate: 1.0, // Change in production!
  // });
  //
  // // Here comes the hooks
  // // Inside the plugin, after initializing sentry
  // nitroApp.hooks.hook("error", (error, errorContext) => {
  //   // Do not handle 404s and 422s
  //   if (error instanceof H3Error) {
  //     if (error.statusCode === 404 || error.statusCode === 422) {
  //       return;
  //     }
  //   }
  //
  //   const headers = errorContext.event?._headers;
  //   console.log(headers);
  //
  //   Sentry.captureException(error);
  //   Sentry.setContext("server_error", { error, content: errorContext });
  // });
  //
  // nitroApp.hooks.hook("request", (event) => {
  //   event.context.$sentry = Sentry;
  // });
  //
  // nitroApp.hooks.hookOnce("close", async () => {
  //   await Sentry.close(2000);
  // });
});

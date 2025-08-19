import { PiniaSharedState } from "pinia-shared-state";

export default defineNuxtPlugin((nuxtApp) => {
  // Safely obtain Pinia instance if it's available yet
  const pinia = (nuxtApp as any).$pinia ?? null;
  if (!pinia) {
    // Pinia is not registered yet; skip hydration for now
    return;
  }

  // Apply shared state plugin with existing configuration
  pinia.use(
    PiniaSharedState({
      enable: true,
      initialize: true,
      type: "native",
    }),
  );
});

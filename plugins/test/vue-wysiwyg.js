// This plugin is used for state persistence in Pinia stores.
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

export const install = ({ isClient, app, router }) => {
  // Create a new Pinia instance.
  const pinia = createPinia();

  pinia.use(({ store }) => {
    // The 'router' instance is marked as raw using 'markRaw'.
    // This prevents Vue from observing and tracking it in the reactivity system.
    store.router = markRaw(router);
  });

  if (isClient) {
    //Very important to only do this client-side, to avoid localStorage being undefined during ssg-build.
    // Use the 'piniaPluginPersistedstate' for state persistence in Pinia stores.
    pinia.use(piniaPluginPersistedstate);
  }
  app.use(pinia);
};

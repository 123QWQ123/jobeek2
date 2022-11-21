import Vuex from "vuex";
import createPersistedState from "vuex-persist";

import user from "./modules/user/user";

export default new Vuex.Store({
  modules: {
    user,
  },
  plugins: [
    (new createPersistedState({
      key: "jobeek-app",
      storage: window.localStorage,
    })).plugin,
  ],
});

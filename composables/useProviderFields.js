export default function useProviderFields(state = null, fields = null) {
  const walkThroughFields = (newProviders) => {
    if (newProviders.hh && newProviders.superjob) {
      Object.keys(fields.value.hh).map((item) => {
        if (state[item]) {
          state[item].is_hidden = false;
        }
      });
      Object.keys(fields.value.superjob).map((item) => {
        if (state[item]) {
          state[item].is_hidden = false;
        }
      });
      return;
    }
    if (!newProviders.hh && !newProviders.superjob) {
      Object.keys(fields.value.hh).map((item) => {
        if (state[item]) {
          state[item].is_hidden = true;
        }
      });
      Object.keys(fields.value.superjob).map((item) => {
        if (state[item]) {
          state[item].is_hidden = true;
        }
      });
      return;
    }
    if (newProviders.hh && !newProviders.superjob) {
      Object.keys(fields.value.hh).map((item) => {
        if (state[item]) {
          state[item].is_hidden = false;
        }
      });
      Object.keys(fields.value.superjob).map((item) => {
        if (state[item]) {
          state[item].is_hidden = true;
        }
      });
      return;
    }
    if (!newProviders.hh && newProviders.superjob) {
      Object.keys(fields.value.superjob).map((item) => {
        if (state[item]) {
          state[item].is_hidden = false;
        }
      });
      Object.keys(fields.value.hh).map((item) => {
        if (state[item]) {
          state[item].is_hidden = true;
        }
      });
      return;
    }
  };

  return { state, walkThroughFields };
}

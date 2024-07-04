import { ref } from "vue";

export default function useFormValidation(state = null) {
  const errors = ref({});
  state = state ?? ref({});

  const clearInputError = (inputName) => {
    if (state.value) {
      state.value[inputName] = null;
      return;
    }
    state[inputName] = null;
  };
  const handleErrorResponse = (response, vee = false) => {
    // console.log(response);
    if (
      response &&
      (response.status === "failed" || response.status === "error")
    ) {
      if (response.message) {
        errors.value.message = response.message;
      }
      const newErrors = {};

      if (response.errors) {
        if (vee) {
          const resErrors = { ...response.errors };
          Object.keys(response.errors).map((item) => {
            newErrors[item.replace(/^\w+\./, "")] = resErrors[item];
          });
        } else {
          Object.keys(response.errors).map((item) => {
            if (/\.(\d+)\./g.test(item)) {
              // dynamic|array field errors from backend
              const itemMatches = [
                ...item.matchAll(/([a-z\n_]+)\.(\d+)\.([a-z\n_]+)/g),
              ][0];
              if (itemMatches.length === 4) {
                if (!newErrors[itemMatches[1]]) {
                  newErrors[itemMatches[1]] = [];
                }
                if (!newErrors[itemMatches[1]][itemMatches[2]]) {
                  newErrors[itemMatches[1]][itemMatches[2]] = {};
                }
                newErrors[itemMatches[1]][itemMatches[2]][itemMatches[3]] =
                  response.errors[item][0];
              }
            } else if (/^([a-z0-9_]+)\.([a-z0-9_]+$)/g.test(item)) {
              // dot seperated errors from backend
              const itemMatch = item.match(/([a-z0-9_]+)\.([a-z0-9_]+)/g);
              const keys = itemMatch[0].split(".");
              if (!newErrors[keys[0]]) newErrors[keys[0]] = {};
              newErrors[keys[0]][keys[1]] = response.errors[item][0];
            } else if (
              /^([a-z0-9_]+)\.([a-z0-9_]+).([a-z0-9_]+$)/g.test(item)
            ) {
              // dot seperated errors from backend
              const itemMatch = item.match(
                /^([a-z0-9_]+)\.([a-z0-9_]+).([a-z0-9_]+$)/g,
              );
              const keys = itemMatch[0].split(".");
              if (!newErrors[keys[0]]) newErrors[keys[0]] = {};
              if ((!newErrors[keys[0]]) instanceof Object)
                newErrors[keys[0]] = {};
              if (!newErrors[keys[0]][keys[1]])
                newErrors[keys[0]][keys[1]] = {};

              if ((!newErrors[keys[0]][keys[1]]) instanceof Object)
                newErrors[keys[0]][keys[1]] = {};
              newErrors[keys[0]][keys[1]][keys[2]] = response.errors[item][0];
            } else {
              newErrors[item] = response.errors[item][0];
            }
            if (state.value && item in state.value) {
              state.value[item].isValid = false;
            }
            if (item in state) {
              state[item].isValid = false;
            }
          });
        }

        if (errors.value) {
          errors.value = { ...newErrors, message: response.message };
        } else {
          Object.assign(errors, { ...newErrors, message: response.message });
        }
      }
    } else {
      errors.value = { message: response.message };
    }
  };

  return { errors, handleErrorResponse, clearInputError };
}

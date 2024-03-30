import { useForm } from "vee-validate";

export default function useVacancySearchParams(initialValues = {}) {
  const { values, setValues, errors } = useForm({
    initialValues,
  });

  const setParams = (new_values) => {
    setValues(new_values);
  };
  const parseParams = (route) => {
    const params = { ...route.query };
    if (params.hasOwnProperty("countries")) {
      if (typeof params.countries === "string") {
        params.countries = JSON.parse(params.countries);
      }
    }
    if (params.hasOwnProperty("regions")) {
      if (typeof params.regions === "string") {
        params.regions = JSON.parse(params.regions);
      }
    }
    if (params.hasOwnProperty("cities")) {
      if (typeof params.cities === "string") {
        params.cities = JSON.parse(params.cities);
      }
    }
    if (params.hasOwnProperty("metros")) {
      if (typeof params.metros === "string") {
        params.metros = JSON.parse(params.metros);
      }
    }
    if (params.hasOwnProperty("industries")) {
      if (typeof params.industries === "string") {
        params.industries = JSON.parse(params.industries);
      }
    }
    if (params.hasOwnProperty("experiences")) {
      if (typeof params.experiences === "string") {
        params.experiences = JSON.parse(params.experiences);
      }
    }
    for (let prop in params) {
      if (typeof params[prop] === "object") {
        if (params[prop].length === 0) {
          delete params[prop];
        } else {
          params[prop] = params[prop];
        }
      }
    }

    setValues(params);
  };
  const toFrond = (newParams) => {
    const params = { ...newParams };
    for (let prop in params) {
      if (typeof params[prop] === "object") {
        if (params[prop].length === 0) {
          delete params[prop];
        } else {
          params[prop] = JSON.stringify(params[prop]);
        }
      }
    }
    return params;
  };
  return { values, setParams, toFrond, parseParams };
}

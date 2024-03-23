import { useForm } from "vee-validate";

export default function useVacancySearchParams(initialValues = {}) {
  const { values, setValues, errors } = useForm({
    initialValues,
  });

  const setParams = (new_values) => {
    setValues(new_values);
  };
  const parseParams = (route) => {
    console.log(route.query);
    const params = { ...route.query };
    if (route.query.hasOwnProperty("industries")) {
      params.industries = JSON.parse(params.industries);
    }
    if (route.query.hasOwnProperty("experiences")) {
      params.experiences = JSON.parse(params.experiences);
    }

    setValues(params);
  };
  const toFrond = (newParams) => {
    console.log(newParams);
    const params = { ...newParams };
    if (values.hasOwnProperty("industries")) {
      params.industries = JSON.stringify(params.industries);
    }
    if (values.hasOwnProperty("experiences")) {
      params.experiences = JSON.stringify(params.experiences);
    }

    console.log(params);
    return params;
  };
  return { values, setParams, toFrond, parseParams };
}

export default function useVacancySearchParams(
  name = "vacancy_search_params",
  initialValues = null,
) {
  const values = useState(name, () => initialValues);

  // if (initialValues) {
  //   const { values, setValues, errors } = useForm({
  //     initialValues,
  //   });
  //   form.state = values;
  //   form.setValues = setValues;
  //   console.log(1);
  // }
  const setParams = (new_values) => {
    const keys = Object.keys(new_values);
    for (let key in keys) {
      values[key] = new_values[key];
    }
  };
  const parseParams = (route) => {
    const params = { ...route.query };
    // if (params.hasOwnProperty("countries")) {
    //   if (typeof params.countries === "string") {
    //     params.countries = JSON.parse(params.countries);
    //   }
    // }
    // if (params.hasOwnProperty("regions")) {
    //   if (typeof params.regions === "string") {
    //     params.regions = JSON.parse(params.regions);
    //   }
    // }
    // if (params.hasOwnProperty("cities")) {
    //   if (typeof params.cities === "string") {
    //     params.cities = JSON.parse(params.cities);
    //   }
    // }
    // if (params.hasOwnProperty("metros")) {
    //   if (typeof params.metros === "string") {
    //     params.metros = JSON.parse(params.metros);
    //   }
    // }
    // if (params.hasOwnProperty("industries")) {
    //   if (typeof params.industries === "string") {
    //     params.industries = JSON.parse(params.industries);
    //   }
    // }
    // if (params.hasOwnProperty("experiences")) {
    //   if (typeof params.experiences === "string") {
    //     params.experiences = JSON.parse(params.experiences);
    //   }
    // }
    for (const key in params) {
      try {
        params[key] = JSON.parse(params[key]);
      } catch (error) {
        // Ignore error, it means it's not a JSON string
      }
    }
    // for (let prop in params) {
    //   if (typeof params[prop] === "object") {
    //     if (params[prop].length === 0) {
    //       delete params[prop];
    //     } else {
    //       params[prop] = params[prop];
    //     }
    //   }
    // }
    setParams(params);
    return params;
  };
  const toFrond = (newParams) => {
    const params = { ...newParams };
    for (let prop in params) {
      if (Array.isArray(params[prop]) || typeof params[prop] === "object") {
        if (Array.isArray(params[prop]) && params[prop].length === 0) {
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

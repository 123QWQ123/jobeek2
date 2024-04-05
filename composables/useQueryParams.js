import { useRouter } from "vue-router";

export default function useQueryParams(initialValues) {
  const router = useRouter();

  const values = useState("search_vacancy_params", () => ({ countries: [1] }));

  function updateQueryParam(key, value) {
    const currentQuery = { ...router.currentRoute.value.query };
    if (Array.isArray(value) || typeof value === "object") {
      value = JSON.stringify(value);
    }
    currentQuery[key] = value;
    router.push({ path: router.currentRoute.value.path, query: currentQuery });
  }

  function removeQueryParam(key) {
    const currentQuery = { ...router.currentRoute.value.query };
    delete currentQuery[key];
    router.push({ path: router.currentRoute.value.path, query: currentQuery });
  }

  function getQueryParam(key) {
    const currentQuery = { ...router.currentRoute.value.query };
    try {
      return JSON.parse(currentQuery[key]);
    } catch (error) {
      return currentQuery[key];
      // Ignore error, it means it's not a JSON string
    }
  }

  function getCurrentQueryParams(to_ = "back") {
    const query = { ...router.currentRoute.value.query };
    for (const key in query) {
      try {
        query[key] = JSON.parse(query[key]);
      } catch (error) {
        query[key] = query[key];
        console.log(error);
        // Ignore error, it means it's not a JSON string
      }
    }

    return { ...initialValues, ...query };
  }

  return {
    updateQueryParam,
    removeQueryParam,
    getCurrentQueryParams,
    getQueryParam,
  };
}

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
        // Ignore error, it means it's not a JSON string
      }
    }

    return { ...initialValues, ...query };
  }

  // Универсальная утилита для удаления одного или нескольких ключей из query.
  // - query: объект query (по умолчанию текущий route.query)
  // - keysToRemove: строка или массив строк ключей для удаления
  // Возвращает новый объект с распарсенными значениями.
  function stripQuery(
    query = router.currentRoute.value.query,
    keysToRemove = [],
  ) {
    const keys = Array.isArray(keysToRemove) ? keysToRemove : [keysToRemove];
    const src = { ...(query || {}) };
    for (const k of keys) {
      delete src[k];
    }
    const parsed = {};
    for (const [k, v] of Object.entries(src)) {
      try {
        parsed[k] = JSON.parse(v);
      } catch (e) {
        parsed[k] = v;
      }
    }
    return parsed;
  }

  return {
    updateQueryParam,
    removeQueryParam,
    getCurrentQueryParams,
    getQueryParam,
    stripQuery,
  };
}

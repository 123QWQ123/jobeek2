export default function useProviders(
  initial_values = { hh: false, superjob: false },
) {
  const providers = useState("providers", () => initial_values);
  const setProviders = (new_values) => {
    providers.value = new_values;
  };
  const getProviderAsArray = (new_values) => {
    if (providers.value.hh === true && providers.value.superjob !== true)
      return ["hh"];
    if (providers.value.hh !== true && providers.value.superjob === true)
      return ["superjob"];
    return [];
  };
  return { providers, setProviders, getProviderAsArray };
}

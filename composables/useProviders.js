export default function useProviders(
  initial_values = { hh: false, superjob: false },
) {
  const providers = useState("providers", () => initial_values);
  const setProviders = (new_values) => {
    providers.value = new_values;
  };
  return { providers, setProviders };
}

export function useCurrencyOptions(symbol_as_name = false) {
  if (symbol_as_name) {
    return [
      { value: "RUB", name: "₽", symbol: "₽" },
      { value: "USD", name: "$", symbol: "$" },
      { value: "EUR", name: "€", symbol: "€" },
    ];
  }
  return [
    { value: "RUB", name: "₽ - RUB", symbol: "₽" },
    { value: "USD", name: "$ - USD", symbol: "$" },
    { value: "EUR", name: "€ - EUR", symbol: "€" },
  ];
}

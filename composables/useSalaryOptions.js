export function useSalaryOptions() {
  return [
    { value: undefined, name: "Все" },
    { value: 1, name: "10.000 - 30.000 ₽", min: 10000, max: 30000 },
    { value: 2, name: "30.000 - 50.000 ₽", min: 30000, max: 50000 },
    { value: 3, name: "50.000 - 100.000 ₽", min: 50000, max: 100000 },
    { value: 4, name: "100.000 - 200.000 ₽", min: 100000, max: 200000 },
    { value: 5, name: "200.000 - 300.000 ₽", min: 200000, max: 300000 },
    { value: 6, name: "300.000 - 400.000 ₽", min: 300000, max: 400000 },
    { value: 7, name: "400.000 - 500.000 ₽", min: 400000, max: 500000 },
    { value: 8, name: "500.000+ ₽", min: 500000 },
  ];
}

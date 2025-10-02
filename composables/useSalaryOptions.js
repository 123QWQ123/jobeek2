export function useSalaryOptions() {
  return [
    { value: undefined, name: "Все" },
    { value: 1, name: "10.000 - 30.000 ₽", from: 10000, to: 30000 },
    { value: 2, name: "30.000 - 50.000 ₽", from: 30000, to: 50000 },
    { value: 3, name: "50.000 - 100.000 ₽", from: 50000, to: 100000 },
    { value: 4, name: "100.000 - 200.000 ₽", from: 100000, to: 200000 },
    { value: 5, name: "200.000 - 300.000 ₽", from: 200000, to: 300000 },
    { value: 6, name: "300.000 - 400.000 ₽", from: 300000, to: 400000 },
    { value: 7, name: "400.000 - 500.000 ₽", from: 400000, to: 500000 },
    { value: 8, name: "500.000+ ₽", from: 500000 },
  ];
}

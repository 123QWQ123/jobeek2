export function useSalaryOptions() {
  return [
    { value: undefined, name: "Все" },
    { value: 1, name: "10K-30K", min: 10000, max: 30000 },
    { value: 2, name: "30K-50K", min: 30000, max: 50000 },
    { value: 3, name: "50K-100K", min: 50000, max: 100000 },
    { value: 4, name: "100K-200K", min: 100000, max: 200000 },
    { value: 5, name: "200K-300K", min: 200000, max: 300000 },
    { value: 6, name: "300K-400K", min: 300000, max: 400000 },
    { value: 7, name: "400K-500K", min: 400000, max: 500000 },
    { value: 8, name: "500K+", min: 500000 },
  ];
}

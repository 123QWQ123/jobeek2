export default function useSort(defaultOptions = null) {
  const items = [];
  const sort = (items = [], options = null) => {
    if (options && items && items.length !== 0) {
      const { by } = options;
      if (by === "alpha") {
        return items.sort(function (a, b) {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
      }
    }
  };

  const groupByFirstChar = (arr, field) => {
    const arrSort = arr.sort((a, b) => {
      if (a[field] < b[field]) {
        return -1;
      }
      if (a[field] > b[field]) {
        return 1;
      }
      return 0;
    });

    const groupNames = Array.from(
      new Set(arrSort.map((k) => k[field].charAt(0))),
    );
    let groups = {};

    groupNames.forEach((k) => {
      groups[k] = [];
    });

    arrSort.forEach((k) => {
      const char = k[field].charAt(0);
      groups[char].push(k);
    });
    return groups;
  };

  return { items, sort, groupByFirstChar };
}

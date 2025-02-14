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
  const sortBubbleBySearch = (items, queryString) => {
    return items.sort((a, b) => {
      const aName = a.name.toLowerCase();
      const bName = b.name.toLowerCase();
      const sName = queryString.toLowerCase();

      const aStartsWith = aName.startsWith(sName);
      const bStartsWith = bName.startsWith(sName);

      if (aStartsWith && !bStartsWith) return -1;
      if (!aStartsWith && bStartsWith) return 1;

      // Если оба или ни один не начинаются с sName, сортируем по алфавиту
      return aName.localeCompare(bName);
    });
  };

  return { items, sort, groupByFirstChar, sortBubbleBySearch };
}

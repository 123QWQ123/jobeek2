export default function useFilter(defaultOptions = null) {
  const items = [];
  const filterBy = (items = [], options = null) => {
    if (options) {
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

  function uniq(array, field = null) {
    const unique_field_list = [];

    if (array.length === 0) return array;

    const first_item = array[0];
    if (first_item instanceof Object && field) {
      const items = array.filter((item) => {
        if (!unique_field_list.includes(item[field])) {
          unique_field_list.push(item[field]);
          return true;
        }
      });
    }
    if (!(first_item instanceof Object)) {
      const items = Array.from(new Set(array));
    }

    return items;
  }

  return { items, uniq };
}

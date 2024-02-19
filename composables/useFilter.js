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

  function uniq(array, field) {
    const unique_field_list = [];

    const items = array.filter((item) => {
      if (!unique_field_list.includes(item[field])) {
        unique_field_list.push(item[field]);
        return true;
      }
    });
    return items;
  }

  return { items, uniq };
}

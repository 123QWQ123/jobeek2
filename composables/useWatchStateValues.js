export function useWatchStateValues(
  propData,
  as_array = true,
  only_keys = false,
  except_keys = []
) {
  const as_object = {};
  const keys = [];
  const mapped = Object.keys(propData).map((item) => {
    if (propData[item] instanceof Object && "val" in propData[item]) {
      if (as_array) {
        if (only_keys) {
          if (!except_keys.includes(item)) {
            keys.push(item);
          }
        }
        return propData[item].val;
      } else {
        as_object[item] = propData[item].val;
        if (only_keys) {
          if (!except_keys.includes(item)) {
            keys.push(item);
          }
        }
        return { item: propData[item].val };
      }
    }
  });

  if (as_array && only_keys) {
    return keys;
  }
  if (as_array) {
    return mapped;
  }

  return as_object;
}

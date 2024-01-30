export default function useResumeHooks() {
  const getCityName = (item) => {
    if (item.city_name) {
      return item.city_name + ", " + item.r_name + ", " + item.c_name;
    } else if (item.r_name) {
      return item.r_name + ", " + item.c_name;
    } else {
      return item.c_name;
    }
  };

  const getCityNameFromArea = (item) => {
    if (item.city_name) {
      return (
        item.city_name + ", " + item.region_name + ", " + item.country_name
      );
    } else if (item.region_name) {
      return item.region_name + ", " + item.country_name;
    } else {
      return item.country_name;
    }
  };
  const getCityNameFromArea2 = (item) => {
    if (item.name) {
      return item.name;
    }
  };
  const formatSeconds = (seconds) => {
    if (seconds >= 60) {
      const mins = seconds / 60;
      if (mins >= 60) {
        const hours = mins;
        return hours + "ч";
      }
      return parseInt(mins) + "м";
    } else {
      return parseInt(mins) + "s";
    }
  };

  const getSelectedProviders = (providers) => {
    if (providers.hh && providers.superjob) {
      return ["hh", "superjob"];
    }
    if (providers.hh) {
      return ["hh"];
    }
    if (providers.superjob) {
      return ["superjob"];
    }
    return [];
  };
  const convertSecondsToHoursAndMinutes = (seconds) => {
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds % 3600) / 60);
    let remainingSeconds = Math.floor(seconds % 60);

    // Add leading zeros if needed
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    remainingSeconds =
      remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;

    return hours + ":" + minutes + ":" + remainingSeconds;
  };
  return {
    getCityName,
    getSelectedProviders,
    getCityNameFromArea,
    getCityNameFromArea2,
    formatSeconds,
    convertSecondsToHoursAndMinutes,
  };
}

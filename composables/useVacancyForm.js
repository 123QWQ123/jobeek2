import { useRoute } from "nuxt/app";
import { useFindSalary } from "~/composables/useFindSalary";

export function useVacancyForm(data = null, to_ = "front") {
  // data is form_data by default or null if this is first of calling
  // to_ = front|backend
  const removeNull = (obj) => {
    Object.keys(obj).forEach(
      (k) =>
        (obj[k] && typeof obj[k] === "object" && removeNull(obj[k])) ||
        (!obj[k] && obj[k] !== undefined && delete obj[k]),
    );
    return obj;
  };

  const route = useRoute();

  const params = route.query;

  let selectedSalary = null;
  let city = null;

  let metros = [];
  let regions = [];
  let countries = [1];
  let cities = [];
  let city_name = null;
  let work_types = [];
  let schedules = [];
  let experiences = [];
  let part_times = [];
  let professional_roles = [];
  let industries = [];

  if (to_ === "reset") {
    return {
      name: "",
      countries: countries,
      metros: metros,
      regions: regions,
      cities: cities,
      city_name: null,
      work_types: work_types,
      schedules: schedules,
      experiences: experiences,
      part_times: part_times,
      professional_roles: professional_roles,
      industries: industries,
      currency: "RUB",
      salary: useFindSalary(params?.salary, false),
      order_by: null,
    };
  }
  console.log(data);
  if (!data) {
    if (params.metros) {
      if (params.metros instanceof Array) {
        metros = params.metros.map((item) => parseInt(item));
      } else {
        metros = [parseInt(params.metros)];
      }
    }

    if (params.countries) {
      if (params.countries instanceof Array) {
        countries = params.countries.map((item) => parseInt(item));
      } else {
        countries = [parseInt(params.countries)];
      }
    }
    if (params.regions) {
      if (params.regions instanceof Array) {
        regions = params.regions.map((item) => parseInt(item));
      } else {
        regions = [parseInt(params.regions)];
      }
    }

    if (params.cities) {
      if (params.cities instanceof Array) {
        cities = params.cities.map((item) => parseInt(item));
      } else {
        cities = [parseInt(params.cities)];
      }
    }
    if (params.city_name) {
      if (params.city_name instanceof String) {
        city_name = params.city_name;
      }
    }
    if (params.work_types) {
      if (params.work_types instanceof Array) {
        work_types = params.work_types.map((item) => parseInt(item));
      } else {
        work_types = [parseInt(params.work_types)];
      }
    }
    if (params.schedules) {
      if (params.schedules instanceof Array) {
        schedules = params.schedules.map((item) => parseInt(item));
      } else {
        schedules = [parseInt(params.schedules)];
      }
    }
    if (params.experiences) {
      let item = JSON.parse(params.experiences);
      if (item instanceof Array) {
        console.log(item);
        experiences = item.map((item) => parseInt(item));
      } else {
        experiences = [item];
      }
    }
    if (params.part_times) {
      if (params.part_times instanceof Array) {
        part_times = params.part_times.map((item) => parseInt(item));
      } else {
        part_times = [parseInt(params.part_time)];
      }
    }
    if (params.professional_roles) {
      if (params.professional_roles instanceof Array) {
        professional_roles = params.professional_roles.map((item) =>
          parseInt(item),
        );
      } else {
        professional_roles = [parseInt(params.professional_roles)];
      }
    }
    if (params.industries) {
      let item = JSON.parse(params.industries);
      if (item instanceof Array) {
        console.log(item);
        industries = item.map((item) => parseInt(item));
      } else {
        industries = [item];
      }
    }
  }
  if (data) {
    selectedSalary = data.salary;
    city_name = data.city_name;
    metros = Array.from(data.metros);
    countries = Array.from(data.countries);
    regions = Array.from(data.regions);
    if (regions.length === 1) {
      cities = Array.from(data.cities);
    }
    work_types = Array.from(data.work_types);
    schedules = Array.from(data.schedules);
    experiences = Array.from(data.experiences);
    part_times = Array.from(data.part_times);
    professional_roles = Array.from(data.professional_roles);
    industries = Array.from(data.industries);
  } else {
    selectedSalary = useFindSalary(params?.salary, true);
  }

  const form_data = {
    name: data?.name ?? params?.name,
    countries: countries,
    metros: metros,
    regions: regions,
    cities: cities,
    work_types: work_types,
    schedules: schedules,
    experiences: experiences,
    part_times: part_times,
    professional_roles: professional_roles,
    industries: industries,
    currency: data?.currency ?? params.currency ?? "RUB",
    salary: selectedSalary,
    city_name: city_name,
    order_by: data?.order_by ?? params.order_by ?? null,
  };

  if (data === null) {
    return form_data;
  }

  const back_params = {
    name: data.name ?? null,
    countries: data.countries ?? null,
    regions: data.regions ?? null,
    metros: data.metros ?? null,
    cities: data.cities ?? null,
    currency: "RUB",
    city_name: "",
    order_by: null,
    salary: {
      from: null,
      to: null,
    },
  };
  //
  const front_params = {
    name: null,
    country: null,
    city: null,
    city_name: null,
    regions: null,
    metros: null,
    cities: null,
    currency: null,
    salary: null,
    order_by: null,
  };

  if (to_ === "front") {
    if (data.name) {
      front_params.name = data.name;
    }
    if (data.name !== "") front_params.name = data.name;
    if (data.order_by !== "") front_params.order_by = data.order_by;
    if (data.currency !== "") front_params.currency = data.currency;
    if (data.countries instanceof Array) {
      front_params.countries = Array.from(data.countries);
    }
    if (data.regions instanceof Array) {
      front_params.regions = Array.from(data.regions);
    }
    if (data.cities instanceof Array) {
      front_params.cities = Array.from(data.cities);
    }
    if (data.city_name instanceof String) {
      front_params.city_name = city_name;
    }
    if (data.metros instanceof Array) {
      front_params.metros = Array.from(data.metros);
    }
    if (front_params.regions.length === 1 && data.cities instanceof Array) {
      front_params.cities = Array.from(data.cities);
    }
    if (data.work_types instanceof Array) {
      front_params.work_types = Array.from(data.work_types);
    }
    if (data.schedules instanceof Array) {
      front_params.schedules = Array.from(data.schedules);
    }
    if (data.experiences instanceof Array && data.experiences.length > 0) {
      front_params.experiences = JSON.stringify(Array.from(data.experiences));
    }
    if (data.part_times instanceof Array) {
      front_params.part_times = Array.from(data.part_times);
    }
    if (data.professional_roles instanceof Array) {
      front_params.professional_roles = Array.from(data.professional_roles);
    }
    if (data.industries instanceof Array && data.industries.length > 0) {
      front_params.industries = JSON.stringify(Array.from(data.industries));
    }

    if (data.city !== "") front_params.city = data.city;
    if (data.city_name !== "") front_params.city_name = data.city_name;

    if (data.salary.from || data.salary.to) {
      front_params.salary = data.salary.from + "-" + data.salary.to;
    }
    if (data.salary.id === null || data.salary.id === 0)
      delete front_params.salary;

    return removeNull(front_params);
  }
  if (to_ === "backend") {
    if (data.name) {
      back_params.name = data.name;
    }
    if (data.country) {
      back_params.countries = data.country;
    }
    if (data.metros instanceof Array) {
      back_params.metro = Array.from(data.metros);
    }
    if (data.regions instanceof Array) {
      back_params.regions = Array.from(data.regions);
    }
    if (data.cities instanceof Array) {
      back_params.cities = Array.from(data.cities);
    }
    if (data.city_name instanceof String) {
      back_params.city_name = data.city_name;
    }
    if (data.work_types instanceof Array) {
      back_params.work_types = Array.from(data.work_types);
    }
    if (data.schedules instanceof Array) {
      back_params.schedules = Array.from(data.schedules);
    }
    if (data.experiences instanceof Array) {
      back_params.experiences = Array.from(data.experiences);
    }
    if (data.part_times instanceof Array) {
      back_params.part_time = Array.from(data.part_times);
    }
    if (data.professional_roles instanceof Array) {
      back_params.professional_roles = Array.from(data.professional_roles);
    }
    if (data.industries instanceof Array) {
      back_params.industries = Array.from(data.industries);
    }
    if (data.city) {
      back_params.city = data.city;
    }
    if (data.currency) {
      back_params.currency = data.currency;
    }
    if (data.order_by) {
      back_params.order_by = data.order_by;
    }

    if (data.salary.from) {
      back_params.salary.from = data.salary.from;
    }
    if (data.salary.to) {
      back_params.salary.to = data.salary.to;
    }
    return removeNull(back_params);
  }
}

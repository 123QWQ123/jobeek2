<template>
  <form
    class="search-form search-form--widget"
    action="#"
    role="form"
    autocomplete="off"
  >
    <div class="search-row">
      <div class="input-wrap has-icon has-label">
        <img class="icon" src="@/assets/img/svg/search.svg" alt="#" />
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Какую вакансию вы ищете?"
          autocomplete="off"
        />
      </div>
      <div class="input-wrap has-label">
        <select
          class="n-select"
          name="salary"
          id="salary"
          style="display: none"
        >
          <option data-display="Выберите зарплату">Nothing</option>
          <option value="1">Some option</option>
          <option value="2">Another option</option>
          <option value="3" disabled="">A disabled option</option>
          <option value="4">Potato</option>
        </select>
        <div class="nice-select n-select" tabindex="0">
          <span class="current">Выберите зарплату</span>
          <ul class="list">
            <li
              data-value="Nothing"
              data-display="Выберите зарплату"
              class="option selected"
            >
              Nothing
            </li>
            <li data-value="1" class="option">Some option</li>
            <li data-value="2" class="option">Another option</li>
            <li data-value="3" class="option disabled">A disabled option</li>
            <li data-value="4" class="option">Potato</li>
          </ul>
        </div>
      </div>
      <div class="input-wrap has-icon">
        <img class="icon" src="@/assets/img/svg/location.svg" alt="#" />
        <input type="text" name="city" placeholder="Город" autocomplete="off" />
      </div>
      <div class="input-wrap has-icon">
        <img class="icon" src="@/assets/img/svg/location.svg" alt="#" />
        <input
          type="text"
          name="country"
          placeholder="Страна"
          autocomplete="off"
        />
      </div>
      <button class="button-xl submit-search-form" type="submit">Поиск</button>
    </div>
  </form>
</template>

<script>
export default {
  name: "search",
};
</script>

<style scoped></style>

<template>
  <div class="input-row">
    <label for="lenguage">Владение иностранными языками</label>
    <div class="c2">
      <div class="input-wrapper"><select class="d-select" name="lenguage" id="lenguage">
        <option data-display="Язык">Язык</option>
        <option value="1">Статус привитого</option>
        <option value="2">Another option</option>
        <option value="3" disabled>A disabled option</option>
        <option value="4">Potato</option>
      </select>
      </div>
      <div class="input-wrapper"><select class="d-select" name="lenguage-level"
                                         id="lenguage-level">
        <option data-display="Уровень владения">Уровень владения</option>
        <option value="1">Статус привитого</option>
        <option value="2">Another option</option>
        <option value="3" disabled>A disabled option</option>
        <option value="4">Potato</option>
      </select>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>

</style>
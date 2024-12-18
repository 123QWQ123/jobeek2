<template>
  <div class="content">
    <div>
      <!--- END skeleton place section-->
      <ul class="favorites-list">
        <li v-for="item in 10" :key="item">
          <div class="favorites-card">
            <div class="favorites-card-head">
              <div class="company">
                <div class="company-logo">
                  <span class="pu-skeleton">‌</span>
                </div>
                <div class="company-name">
                  <span class="count"><span class="pu-skeleton">‌</span></span>
                </div>
              </div>
              <div class="salary"><span class="pu-skeleton">‌</span></div>
            </div>
            <div class="favorites-card-body">
              <span class="pu-skeleton">‌</span>
            </div>
            <div class="favorites-card-footer">
              <div class="favorites-card-footer-row">
                <span class="pu-skeleton">‌</span>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <button id="load_more_button" class="create-button show-more">
        Показать еще
        <div class="ms-2 spinner-grow spinner-grow-sm" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <img src="~/assets/img/svg/Arrow-Down2.svg" alt="#" />
      </button>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.skeleton-hover.favorites-list .company-logo .pu-skeleton {
  height: 100% !important;
}
.skeleton-hover.favorites-list .company-name {
  width: 200px !important;
  max-width: 227px !important;
}
.skeleton-hover.favorites-list .salary {
  min-width: 20% !important;
}
</style>

<template>
  <li>
    <div class="favorites-card skeleton-card">
      <div class="favorites-card-head">
        <div class="company">
          <div class="company-logo ">
            <img class="img " />
          </div>
          <div class="company-name">
            <span class="count" />
          </div>
        </div>
        <div class="salary" />
      </div>
      <div class="favorites-card-body">
        <div class="time-location">
          <span />
          <strong />
        </div>
        <p />
      </div>
      <div class="favorites-card-footer">
        <div class="favorites-card-footer-row">
          <div class="group">
            <button class="group-action btn button-md" />
          </div>
          <div class="group">
            <button
                class="group-action ic-btn fav-btn"
            >
              <svg
                  width="23"
                  height="21"
                  viewBox="0 0 23 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
              >
                <path
                    d="M11.0641 0.796788C11.2552 0.45665 11.7448 0.456649 11.9359 0.796789L14.7993 5.89364C15.0135 6.27499 15.3835 6.54383 15.8124 6.62973L21.5446 7.77794C21.9272 7.85457 22.0785 8.32027 21.8141 8.60711L17.8515 12.9053C17.555 13.2269 17.4137 13.6619 17.4645 14.0964L18.1439 19.9029C18.1892 20.2903 17.793 20.5782 17.4385 20.4153L12.1262 17.9749C11.7287 17.7923 11.2713 17.7923 10.8738 17.9749L5.56148 20.4153C5.20696 20.5782 4.81081 20.2903 4.85614 19.9029L5.53549 14.0964C5.58632 13.6619 5.44498 13.2269 5.1485 12.9053L1.18593 8.60711C0.921493 8.32027 1.07281 7.85457 1.45535 7.77794L7.18757 6.62973C7.61645 6.54383 7.98648 6.27499 8.20072 5.89364L11.0641 0.796788Z"
                    stroke="#C8C8C8"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: "SkeletonCard",
}
</script>

<script setup>
</script>

<style scoped>
.skeleton-card .img {
  width: 10%;
  padding-top: 10%;
  border-radius: 50%;
  background-color: #ddd;
}

.skeleton-card span {
  min-width: 100px;
  height: 16px;
  display: inline-block;
  background-color: #ddd;
}

.skeleton-card h3 {
  content: ' ';
  width: 250px;
  height: 24px;
  background-color: #ddd;
  margin: 10px 0;
}

.skeleton-card p {
  width: 80%;
  background-color: #ddd;
  height: 16px;
  line-height: 140%;
}
</style>
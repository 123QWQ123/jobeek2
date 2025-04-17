<template>
  <li>
    <div class="subs-card">
      <div class="subs-card-body">
        <div class="subs-card-name">
          <strong class="title">{{
            notification.name || "Empty title"
          }}</strong>
          <!--          <span class="location">Омск</span>-->
        </div>
        <div class="subs-card-actions">
          <nuxt-link
            :to="{
              name: 'subscriptions-edit-id',
              params: { id: notification.id },
            }"
          >
            <button class="card-action">
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.02539 23.9749H23.9754"
                  stroke="#5375FD"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M14.2462 7.15927L19.7324 12.6455M14.2462 7.15927L17.3806 4.0249L22.8668 9.51115L19.7324 12.6455L14.2462 7.15927ZM14.2462 7.15927L8.03177 13.3737C7.82391 13.5815 7.70709 13.8634 7.70703 14.1573V19.1847H12.7344C13.0284 19.1846 13.3102 19.0678 13.518 18.8599L19.7324 12.6455L14.2462 7.15927Z"
                  stroke="#5375FD"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </nuxt-link>
          <button @click="remove" class="card-action">
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.4216 2.32397C13.2394 2.32392 14.0263 2.63682 14.6207 3.1985C15.2152 3.76017 15.5722 4.52803 15.6185 5.34455L15.6234 5.52583H20.7956C20.9828 5.52588 21.163 5.597 21.2998 5.72481C21.4366 5.85261 21.5198 6.02758 21.5326 6.21435C21.5453 6.40113 21.4867 6.58578 21.3686 6.731C21.2504 6.87623 21.0816 6.97119 20.8961 6.99671L20.7956 7.00361H20.0114L18.7504 19.8307C18.6872 20.4702 18.3988 21.0664 17.9366 21.5129C17.4744 21.9594 16.8686 22.227 16.2273 22.2681L16.0539 22.274H8.78918C8.14631 22.274 7.52439 22.0453 7.03457 21.629C6.54475 21.2126 6.21895 20.6356 6.11539 20.0012L6.09273 19.8297L4.83071 7.00361H4.04748C3.86893 7.0036 3.69642 6.93893 3.56185 6.82158C3.42729 6.70422 3.33977 6.5421 3.31549 6.36521L3.30859 6.26472C3.3086 6.08616 3.37326 5.91365 3.49062 5.77909C3.60798 5.64452 3.7701 5.55701 3.94699 5.53272L4.04748 5.52583H9.21971C9.21971 4.67664 9.55704 3.86224 10.1575 3.26178C10.758 2.66131 11.5724 2.32397 12.4216 2.32397ZM18.5268 7.00361H6.31538L7.56361 19.6849C7.59125 19.9679 7.71594 20.2325 7.91653 20.434C8.11711 20.6355 8.38123 20.7614 8.66406 20.7903L8.78918 20.7962H16.0539C16.645 20.7962 17.1465 20.3775 17.2608 19.809L17.2805 19.6849L18.5258 7.00361H18.5268ZM14.1456 9.71286C14.3242 9.71287 14.4967 9.77753 14.6313 9.89489C14.7658 10.0123 14.8533 10.1744 14.8776 10.3513L14.8845 10.4518V17.3481C14.8845 17.5353 14.8133 17.7155 14.6855 17.8523C14.5577 17.9891 14.3828 18.0722 14.196 18.085C14.0092 18.0978 13.8246 18.0391 13.6793 17.921C13.5341 17.8029 13.4392 17.634 13.4136 17.4485L13.4067 17.3481V10.4518C13.4067 10.2558 13.4846 10.0678 13.6232 9.92928C13.7617 9.79071 13.9497 9.71286 14.1456 9.71286ZM10.6975 9.71286C10.876 9.71287 11.0485 9.77753 11.1831 9.89489C11.3177 10.0123 11.4052 10.1744 11.4295 10.3513L11.4364 10.4518V17.3481C11.4363 17.5353 11.3652 17.7155 11.2374 17.8523C11.1096 17.9891 10.9346 18.0722 10.7478 18.085C10.5611 18.0978 10.3764 18.0391 10.2312 17.921C10.086 17.8029 9.99101 17.634 9.96549 17.4485L9.95859 17.3481V10.4518C9.95859 10.2558 10.0364 10.0678 10.175 9.92928C10.3136 9.79071 10.5015 9.71286 10.6975 9.71286ZM12.4216 3.80175C11.9889 3.80177 11.572 3.96448 11.2537 4.25758C10.9354 4.55068 10.739 4.95274 10.7034 5.38396L10.6975 5.52583H14.1456C14.1456 5.06857 13.964 4.63005 13.6407 4.30672C13.3173 3.9834 12.8788 3.80175 12.4216 3.80175Z"
                fill="#5375FD"
              />
            </svg>
          </button>
        </div>
      </div>
      <div class="subs-card-options">
        <div class="option-group">
          <div class="option">
            <div class="custom-check-wrap">
              <div class="theme-checker theme-checker--blue">
                <input
                  disabled
                  type="checkbox"
                  value="hh"
                  id="hh"
                  v-model="notification.providers"
                />
                <div class="theme-checker-ui">
                  <div class="circle"></div>
                </div>
              </div>
              <label for="hh"
                ><img src="~/assets/img/logos/hhmini.svg" alt="#" /><span
                  >Hh.ru</span
                ></label
              >
            </div>
          </div>
          <div class="option">
            <div class="custom-check-wrap">
              <div class="theme-checker theme-checker--blue">
                <input
                  disabled
                  type="checkbox"
                  value="sj"
                  id="sj"
                  v-model="notification.providers"
                />
                <div class="theme-checker-ui">
                  <div class="circle"></div>
                </div>
              </div>
              <label for="sj"
                ><img src="~/assets/img/logos/sj.svg" alt="#" /><span
                  >Superjob.ru
                </span></label
              >
            </div>
          </div>
        </div>
        <div class="option-group">
          <div class="option">
            <div class="check-block">
              <div class="checkbox">
                <input
                  type="checkbox"
                  id="enable-push"
                  :checked="notification.push_notification"
                  disabled
                />
                <div class="checkbox-mask">
                  <img src="~/assets/img/svg/check.svg" alt="#" />
                </div>
              </div>
              <label for="enable-push">Подключить Push-уведомления </label>
            </div>
          </div>
          <div class="option">
            <div class="check-block">
              <div class="checkbox">
                <input
                  type="checkbox"
                  disabled
                  :checked="notification.email_notification"
                  id="enable-email-notofication"
                />
                <div class="checkbox-mask">
                  <img src="~/assets/img/svg/check.svg" alt="#" />
                </div>
              </div>
              <label for="enable-email-notofication"
                >Подключить E-mail уведомления</label
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </li>
</template>

<script setup>
const { notification } = defineProps({
  notification: {
    required: true,
  },
});
const emit = defineEmits(["remove"]);
const remove = async () => {
  emit("remove", notification.id);
};
</script>

<style scoped></style>

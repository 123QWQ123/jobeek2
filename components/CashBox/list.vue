<template>
  <div class="message-box">
    <div class="message-box-head">
      <h1 class="title">Внутреняя почта</h1>
      <div class="input-wrapper position-relative">
        <input
          type="text"
          id="email"
          name="email"
          placeholder="Oleg222@yandex.ru"
        />
        <button class="button-accent" type="submit">Изменить почту</button>
      </div>
    </div>
    <div class="message-box-body">
      <ul class="messages-list">
        <li
          class="message-list-item"
          :class="{
            error: !receipt.valid,
            active: activeReceipts.includes(idx),
          }"
          v-for="(receipt, idx) in receipts"
          :key="idx"
          @click.prevent="toggleActive(idx)"
        >
          <div class="message-item">
            <div class="col col-ic">
              <svg
                width="28"
                height="22"
                viewBox="0 0 28 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 4C0 3.07174 0.368749 2.1815 1.02513 1.52513C1.6815 0.868749 2.57174 0.5 3.5 0.5H24.5C25.4283 0.5 26.3185 0.868749 26.9749 1.52513C27.6313 2.1815 28 3.07174 28 4V18C28 18.9283 27.6313 19.8185 26.9749 20.4749C26.3185 21.1313 25.4283 21.5 24.5 21.5H3.5C2.57174 21.5 1.6815 21.1313 1.02513 20.4749C0.368749 19.8185 0 18.9283 0 18V4ZM3.5 2.25C3.03587 2.25 2.59075 2.43437 2.26256 2.76256C1.93437 3.09075 1.75 3.53587 1.75 4V4.37975L14 11.7297L26.25 4.37975V4C26.25 3.53587 26.0656 3.09075 25.7374 2.76256C25.4092 2.43437 24.9641 2.25 24.5 2.25H3.5ZM26.25 6.42025L18.011 11.364L26.25 16.4337V6.42025ZM26.1905 18.4532L16.3205 12.379L14 13.7703L11.6795 12.379L1.8095 18.4515C1.90894 18.8239 2.12855 19.153 2.43423 19.3878C2.73991 19.6226 3.11455 19.7499 3.5 19.75H24.5C24.8852 19.75 25.2597 19.623 25.5653 19.3885C25.871 19.1541 26.0907 18.8253 26.1905 18.4532ZM1.75 16.4337L9.989 11.364L1.75 6.42025V16.4337Z"
                  fill="#5375FD"
                ></path>
              </svg>
            </div>
            <div class="col-wrap">
              <div class="col col-body">
                <h3 class="title">Кассовый чек от {{ receipt.date }}</h3>
                <span
                  class="message-arrow"
                  @click.stop="toggleActive(idx, 'arrow')"
                ></span>
              </div>
            </div>
          </div>

          <div class="message-content">
            <div class="message-txt">
              <div v-if="receipt.valid" class="message-txt-item">
                <div class="message-txt-item__content">
                  <strong>Оплата прошла успешно</strong>
                  <p>
                    Уважаемый клиент, оплата Премиум доступа прошла успешно, чек
                    об оплате вы можете получить по ссылке:
                    <a :href="receipt.receipt">Получить чек оплаты</a>
                  </p>
                </div>
                <button
                  @click.prevent="openCheck(receipt.receipt)"
                  class="button-accent"
                >
                  Посмотреть чек
                </button>
              </div>
              <div v-else class="message-txt-item">
                <div class="message-txt-item__content">
                  <strong>Ошибка! Оплата не прошла.</strong>
                  <p>Уважаемый клиент, оплата Премиум доступа не прошла.</p>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCashBoxStore } from "~/store/cashbox";
import { useAuthStore } from "~/store/auth";

const { isEmployer, employer, seeker } = storeToRefs(useAuthStore());
const phone = computed(() => {
  return isEmployer.value ? employer.value.phone : seeker.value.phone;
});
const { getReceipts } = useCashBoxStore();
const { receipts } = storeToRefs(useCashBoxStore());
const activeReceipts = ref([]); // Массив для хранения индексов выбранных элементов

useAsyncData("getReceipts", async () => {
  // testData
  return await getReceipts("79293088886", "checkyour.name");
});

const toggleActive = (index: number, type: string = "") => {
  const pos = activeReceipts.value.indexOf(index);
  if (pos === -1) {
    // Элемент ещё не активен, добавляем
    activeReceipts.value.push(index);
  } else {
    // Элемент уже активен, удаляем
    if (type === "arrow") {
      activeReceipts.value.splice(pos, 1);
    }
  }
};

const openCheck = (url: string) => {
  window.open(url, "_blank");
};
</script>

<style scoped></style>

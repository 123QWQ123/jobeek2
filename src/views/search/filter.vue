<template>
  <aside class="aside">
    <button class="close-aside">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        version="1.1"
        id="Layer_1"
        x="0px"
        y="0px"
        width="20"
        height="20"
        viewBox="0 0 122.878 122.88"
        enable-background="new 0 0 122.878 122.88"
        xml:space="preserve"
      >
        <g>
          <path
            d="M1.426,8.313c-1.901-1.901-1.901-4.984,0-6.886c1.901-1.902,4.984-1.902,6.886,0l53.127,53.127l53.127-53.127 c1.901-1.902,4.984-1.902,6.887,0c1.901,1.901,1.901,4.985,0,6.886L68.324,61.439l53.128,53.128c1.901,1.901,1.901,4.984,0,6.886 c-1.902,1.902-4.985,1.902-6.887,0L61.438,68.326L8.312,121.453c-1.901,1.902-4.984,1.902-6.886,0 c-1.901-1.901-1.901-4.984,0-6.886l53.127-53.128L1.426,8.313L1.426,8.313z"
          ></path>
        </g>
      </svg>
    </button>
    <div class="filter-container">
      <div class="filter-head">
        <strong>Фильтры</strong>
        <button class="clear-all">Очистить все</button>
      </div>
      <div class="filter-box open">
        <div class="filter-box-handle">
          <strong>Регион</strong
          ><img src="@/assets/img/svg/Arrow-Down.svg" alt="#" />
        </div>
        <div class="filter-box-body">
          <div class="check-block-list">
            <div class="check-block">
              <div class="checkbox">
                <input type="checkbox" id="m" checked="" />
                <div class="checkbox-mask">
                  <img src="@/assets/img/svg/check.svg" alt="#" />
                </div>
              </div>
              <div class="l-wrap">
                <label for="m">Москва</label><span class="count">1 200</span>
              </div>
            </div>
            <div class="check-block">
              <div class="checkbox">
                <input type="checkbox" id="spb" />
                <div class="checkbox-mask">
                  <img src="@/assets/img/svg/check.svg" alt="#" />
                </div>
              </div>
              <div class="l-wrap">
                <label for="spb">Питер</label><span class="count">200</span>
              </div>
            </div>
            <div class="check-block">
              <div class="checkbox">
                <input type="checkbox" id="k" />
                <div class="checkbox-mask">
                  <img src="@/assets/img/svg/check.svg" alt="#" />
                </div>
              </div>
              <div class="l-wrap">
                <label for="k">Кемерово</label><span class="count">123</span>
              </div>
            </div>
            <div class="check-block">
              <div class="checkbox">
                <input type="checkbox" id="v" checked="" />
                <div class="checkbox-mask">
                  <img src="@/assets/img/svg/check.svg" alt="#" />
                </div>
              </div>
              <div class="l-wrap">
                <label for="v">Владикавказ</label
                ><span class="count">1 200</span>
              </div>
            </div>
            <div class="check-block">
              <div class="checkbox">
                <input type="checkbox" id="o" />
                <div class="checkbox-mask">
                  <img src="@/assets/img/svg/check.svg" alt="#" />
                </div>
              </div>
              <div class="l-wrap">
                <label for="o">Онега</label><span class="count">123</span>
              </div>
            </div>
            <div class="check-block">
              <div class="checkbox">
                <input type="checkbox" id="o2" />
                <div class="checkbox-mask">
                  <img src="@/assets/img/svg/check.svg" alt="#" />
                </div>
              </div>
              <div class="l-wrap">
                <label for="o2">Онега</label><span class="count">123</span>
              </div>
            </div>
          </div>
          <button
            class="more-filters"
            data-default-text="Еще 25"
            data-hide-text="Скрыть"
          >
            Еще 25
          </button>
        </div>
      </div>
      <div class="filter-box open">
        <div class="filter-box-handle">
          <strong>Зарплата</strong
          ><img src="@/assets/img/svg/Arrow-Down.svg" alt="#" />
        </div>
        <div class="filter-box-body">
          <div class="check-block-list">
            <div class="check-block">
              <div class="checkbox">
                <input type="radio" id="zp" name="salary" checked="" />
                <div class="radio-mask">
                  <img src="@/assets/img/svg/check.svg" alt="#" />
                </div>
              </div>
              <div class="l-wrap">
                <label for="zp">С указанной зп</label
                ><span class="count">1 200</span>
              </div>
            </div>
            <div class="check-block">
              <div class="checkbox">
                <input type="radio" id="21k" name="salary" />
                <div class="radio-mask">
                  <img src="@/assets/img/svg/check.svg" alt="#" />
                </div>
              </div>
              <div class="l-wrap">
                <label for="21k">От 20 000 ₽</label
                ><span class="count">200</span>
              </div>
            </div>
            <div class="check-block">
              <div class="checkbox">
                <input type="radio" id="20k" name="salary" />
                <div class="radio-mask">
                  <img src="@/assets/img/svg/check.svg" alt="#" />
                </div>
              </div>
              <div class="l-wrap">
                <label for="20k">От 20 000 ₽</label
                ><span class="count">200</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="filter-box open">
        <div class="filter-box-handle">
          <strong>Специализации</strong
          ><img src="@/assets/img/svg/Arrow-Down.svg" alt="#" />
        </div>
        <div class="filter-box-body">
          <div class="check-block-list">
            <div class="check-block">
              <div class="checkbox">
                <input type="checkbox" id="s1" checked="" />
                <div class="checkbox-mask">
                  <img src="@/assets/img/svg/check.svg" alt="#" />
                </div>
              </div>
              <div class="l-wrap">
                <label for="s1">Специализация 1</label
                ><span class="count">1 200</span>
              </div>
            </div>
            <div class="check-block">
              <div class="checkbox">
                <input type="checkbox" id="s2" />
                <div class="checkbox-mask">
                  <img src="@/assets/img/svg/check.svg" alt="#" />
                </div>
              </div>
              <div class="l-wrap">
                <label for="s2">Специализация 2</label
                ><span class="count">200</span>
              </div>
            </div>
            <div class="check-block">
              <div class="checkbox">
                <input type="checkbox" id="s3" />
                <div class="checkbox-mask">
                  <img src="@/assets/img/svg/check.svg" alt="#" />
                </div>
              </div>
              <div class="l-wrap">
                <label for="s3">Специализация 3</label
                ><span class="count">123</span>
              </div>
            </div>
            <div class="check-block">
              <div class="checkbox">
                <input type="checkbox" id="s4" checked="" />
                <div class="checkbox-mask">
                  <img src="@/assets/img/svg/check.svg" alt="#" />
                </div>
              </div>
              <div class="l-wrap">
                <label for="s4">Специализация 4</label
                ><span class="count">123</span>
              </div>
            </div>
            <div class="check-block">
              <div class="checkbox">
                <input type="checkbox" id="s5" />
                <div class="checkbox-mask">
                  <img src="@/assets/img/svg/check.svg" alt="#" />
                </div>
              </div>
              <div class="l-wrap">
                <label for="s5">Специализация 5 </label
                ><span class="count">123</span>
              </div>
            </div>
            <div class="check-block">
              <div class="checkbox">
                <input type="checkbox" id="s6" />
                <div class="checkbox-mask">
                  <img src="@/assets/img/svg/check.svg" alt="#" />
                </div>
              </div>
              <div class="l-wrap">
                <label for="s6">Специализация 6 </label
                ><span class="count">123</span>
              </div>
            </div>
            <div class="check-block">
              <div class="checkbox">
                <input type="checkbox" id="s7" />
                <div class="checkbox-mask">
                  <img src="@/assets/img/svg/check.svg" alt="#" />
                </div>
              </div>
              <div class="l-wrap">
                <label for="s7">Специализация 7 </label
                ><span class="count">123</span>
              </div>
            </div>
            <div class="check-block">
              <div class="checkbox">
                <input type="checkbox" id="s8" />
                <div class="checkbox-mask">
                  <img src="@/assets/img/svg/check.svg" alt="#" />
                </div>
              </div>
              <div class="l-wrap">
                <label for="s8">Специализация 8 </label
                ><span class="count">123</span>
              </div>
            </div>
            <div class="check-block">
              <div class="checkbox">
                <input type="checkbox" id="s9" />
                <div class="checkbox-mask">
                  <img src="@/assets/img/svg/check.svg" alt="#" />
                </div>
              </div>
              <div class="l-wrap">
                <label for="s9">Специализация 9 </label
                ><span class="count">123</span>
              </div>
            </div>
            <div class="check-block">
              <div class="checkbox">
                <input type="checkbox" id="s10" />
                <div class="checkbox-mask">
                  <img src="@/assets/img/svg/check.svg" alt="#" />
                </div>
              </div>
              <div class="l-wrap">
                <label for="s10">Специализация 10 </label
                ><span class="count">123</span>
              </div>
            </div>
          </div>
          <button
            class="more-filters"
            data-default-text="Еще 25"
            data-hide-text="Скрыть"
          >
            Еще 25
          </button>
        </div>
      </div>
      <div class="filter-box">
        <div class="filter-box-handle">
          <strong>Тип вакансии</strong
          ><img src="@/assets/img/svg/Arrow-Down.svg" alt="#" />
        </div>
        <div class="filter-box-body">
          <div class="check-block">
            <div class="checkbox">
              <input type="checkbox" id="t1" checked="" />
              <div class="checkbox-mask">
                <img src="@/assets/img/svg/check.svg" alt="#" />
              </div>
            </div>
            <div class="l-wrap">
              <label for="t1">Тип 1</label><span class="count">1 200</span>
            </div>
          </div>
          <div class="check-block">
            <div class="checkbox">
              <input type="checkbox" id="t2" />
              <div class="checkbox-mask">
                <img src="@/assets/img/svg/check.svg" alt="#" />
              </div>
            </div>
            <div class="l-wrap">
              <label for="t2">Тип 2</label><span class="count">200</span>
            </div>
          </div>
        </div>
      </div>
      <div class="filter-box">
        <div class="filter-box-handle">
          <strong>Дополнительные параметры</strong
          ><img src="@/assets/img/svg/Arrow-Down.svg" alt="#" />
        </div>
        <div class="filter-box-body">
          <div class="check-block-list">
            <div class="check-block">
              <div class="checkbox">
                <input type="checkbox" id="t3" checked="" />
                <div class="checkbox-mask">
                  <img src="@/assets/img/svg/check.svg" alt="#" />
                </div>
              </div>
              <div class="l-wrap">
                <label for="t3">Тип 1</label><span class="count">1 200</span>
              </div>
            </div>
            <div class="check-block">
              <div class="checkbox">
                <input type="checkbox" id="t4" />
                <div class="checkbox-mask">
                  <img src="@/assets/img/svg/check.svg" alt="#" />
                </div>
              </div>
              <div class="l-wrap">
                <label for="t4">Тип 2</label><span class="count">200</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  name: "filter",
};
</script>

<style scoped></style>

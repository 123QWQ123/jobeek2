<template>
  <div class="input-row">
    <label for="name">Название</label>
    <div class="input-wrapper">
      <input type="text" id="name" v-model="keywords" @change="onKeywordsChange">
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['set'])
import {useVacancyStore} from "../../store/vacancy";
import CustomSelect from "../UI/CustomSelect";
import SelectWithSearch from "../UI/SelectWithSearch";

const vacancyStore = useVacancyStore();

const {getIndustries, industries, countries, getAreas, cities} = vacancyStore;

const keywords = ref();

const onKeywordsChange = (newValue) => {
  console.log(newValue);
  emit('set', 'name', keywords.value);

}
onMounted(async() => {
  await getIndustries();
});

</script>

<style>

.select2-container {
  width: 100% !important; }

.select2-container--default .select2-selection--multiple {
  min-height: 46px;
  background: #F5F8FA;
  border-radius: 8px;
  border: none; }

.select2-search {
  display: none; }

.select2-container--default.select2-container--focus .select2-selection--multiple {
  padding: 0 7px 0 7px; }

.select2-container .select2-selection--multiple .select2-selection__rendered {
  min-height: 46px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding-bottom: 0;
  padding-left: 7px;
  padding-right: 7px; }

.select2-container--default .select2-selection--multiple {
  padding-bottom: 0;
  padding-left: 7px;
  padding-right: 7px; }

.select2-container--default .select2-selection--multiple .select2-selection__choice {
  height: -webkit-fit-content;
  height: -moz-fit-content;
  height: fit-content; }

.select2-container--default .select2-selection--multiple .select2-selection__choice {
  margin-top: 0;
  margin-bottom: 5px;
  margin-left: 0;
  margin-right: 8px;
  -webkit-transform: translateY(2px);
  -ms-transform: translateY(2px);
  transform: translateY(2px); }

.select2-container--default.select2-container--focus .select2-selection--multiple {
  border: none; }

.select2-container .select2-selection--multiple .select2-selection__rendered {
  padding-left: 0;
  padding-right: 0; }

.select2-container--default .select2-selection--multiple .select2-selection__choice {
  padding-left: 12px;
  padding-right: 38px;
  background: #FFFFFF;
  border: 1px solid #ECECEC;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border-radius: 6px;
  padding-top: 5px;
  padding-bottom: 6px;
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  color: #000000; }

.select2-container--default .select2-selection--multiple .select2-selection__choice__remove {
  left: auto;
  right: 0;
  width: 26px;
  height: 18px;
  border: none;
  padding: 0;
  padding-right: 8px;
  top: 50%;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  background-image: url("~/assets/img/svg/Close-Square.svg");
  background-position: center center;
  background-repeat: no-repeat; }
.select2-container--default .select2-selection--multiple .select2-selection__choice__remove span {
  display: none; }
.select2-container--default .select2-selection--multiple .select2-selection__choice__remove:hover {
  background-color: none; }

.select2-container--default .select2-selection--multiple .select2-selection__choice__remove:hover, .select2-container--default .select2-selection--multiple .select2-selection__choice__remove:focus {
  background-color: transparent !important; }

.select2-dropdown {
  padding: 8px 4px;
  background: #FFFFFF;
  border-radius: 0 !important;
  border: none;
  -webkit-filter: drop-shadow(0px 0px 20px rgba(28, 27, 98, 0.1));
  filter: drop-shadow(0px 0px 20px rgba(28, 27, 98, 0.1)); }

.select2-container {
  margin-top: 4px; }

.select2-container--default .select2-results__option {
  border-radius: 8px;
  padding: 12px 13px;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  color: #0A2540; }

.select2-container--default .select2-results__option--highlighted.select2-results__option--selectable {
  background: #F5F8FA;
  color: #0A2540; }

.select2-container--default .select2-results__option--selected {
  background: #F5F8FA;
  color: #0A2540; }

.select2-container--default .select2-selection--multiple:after {
  border-bottom: 1.5px solid #78757E;
  border-right: 1.5px solid #78757E;
  content: '';
  display: block;
  margin-top: -4px;
  pointer-events: none;
  position: absolute;
  width: 9px;
  height: 9px;
  top: 44%;
  right: 24px;
  -webkit-transform-origin: 66% 66%;
  -ms-transform-origin: 66% 66%;
  transform-origin: 66% 66%;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
  -webkit-transition: all .15s ease-in-out;
  -o-transition: all .15s ease-in-out;
  transition: all .15s ease-in-out; }

.select2-container--default.select2-container--open .select2-selection--multiple:after {
  -webkit-transform: rotate(-135deg);
  -ms-transform: rotate(-135deg);
  transform: rotate(-135deg); }

</style>
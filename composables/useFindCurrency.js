import {useCurrencyOptions} from "~/composables/useCurrencyOptions";

export function useFindCurrency(currency = null, from_query = true) {
    const currencyOptions = useCurrencyOptions();
    const currencyObject = {value: 'RUR', name: 'Рубл', symbol: "₽"};

    // if (!currency) return currencyObject;

    let selectedOptionID = currencyOptions.findIndex(item => item.value === currency);
    if (selectedOptionID === -1){
        return currencyObject;
    }
    let selectedOption = null;
    if (selectedOptionID !== -1){
        selectedOption = currencyOptions[selectedOptionID]
    }

    if (selectedOption){
        return selectedOption;
    }
    return currencyObject.value;
}
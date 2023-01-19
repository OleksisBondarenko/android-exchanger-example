import { values } from "mobx";
import { ICurrency, ISelectValue } from "../types";

export function baseCurrencyNames (currencyData: ICurrency[]): string[] {
  return currencyData.map(data => data.baseCurrency)
}

export function currencyNames (currencyData: ICurrency[]): string[] {
  return currencyData.map(data => data.currency)
}

function allNamesFromCurrencyData (currencyData: ICurrency[]): string[] {
  const baseCurrencies = baseCurrencyNames(currencyData);
  const currencies = currencyNames(currencyData);

  return [...baseCurrencies, ...currencies]
}

export function uniqueStrings (strList: string[]): string[] {
  return strList.filter((value, index, self) => self.indexOf(value) === index)
}


export function getUniqueNamesFromCurrencyData (currencyData: ICurrency[]): string [] {
  const allNames = allNamesFromCurrencyData(currencyData);
  return uniqueStrings(allNames)
}

export function selectValueFromString (value: string, key = value): ISelectValue {
  return {
    key: key, 
    value: value,
  } as ISelectValue
}

export function selectValuesFromStrings (values: string[]): ISelectValue[] {
  return values.map(value => selectValueFromString(value))
}

export function findSelectedCurrency (currencies: ICurrency[], baseCurrencyText: string, currencyText: string ) {
  return currencies.find(currency => {
    return currency.baseCurrency === baseCurrencyText && currency.currency === currencyText
  })
}

export function calculateNewCurrencyPrice (currencies: ICurrency[], baseCurrencyText: string, currencyText: string, baseCurrencyAmount): string {
  const selectedCurrency = findSelectedCurrency(currencies, baseCurrencyText, currencyText)
    const muliplier = selectedCurrency.saleRate;
    return String(muliplier * Number(baseCurrencyAmount));
}
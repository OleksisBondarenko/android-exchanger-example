import { values } from "mobx";
import { IRule, ISelectValue } from "../types";

export function baseCurrencyNames (currencyData: IRule[]): string[] {
  return currencyData.map(data => data.primary)
}

export function currencyNames (currencyData: IRule[]): string[] {
  return currencyData.map(data => data.secondary)
}

function allNamesFromCurrencyData (currencyData: IRule[]): string[] {
  const baseCurrencies = baseCurrencyNames(currencyData);
  const currencies = currencyNames(currencyData);

  return [...baseCurrencies, ...currencies]
}

export function uniqueStrings (strList: string[]): string[] {
  return strList.filter((value, index, self) => self.indexOf(value) === index)
}


export function getUniqueNamesFromCurrencyData (currencyData: IRule[]): string [] {
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

export function findSelectedCurrency (currencies: IRule[], baseCurrencyText: string, currencyText: string ) {
  return currencies.find(currency => {
    return currency.primary === baseCurrencyText && currency.secondary === currencyText
  })
}

export function calculateNewCurrencyPrice (currencies: IRule[], baseCurrencyText: string, currencyText: string, baseCurrencyAmount): string {
  const selectedCurrency = findSelectedCurrency(currencies, baseCurrencyText, currencyText)
    const muliplier = selectedCurrency.primaryAmount;
    return String(muliplier * Number(baseCurrencyAmount));
}

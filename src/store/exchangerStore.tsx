import { makeAutoObservable } from "mobx";
import { mockExchangerData } from "../assets/static";
import {
    baseCurrencyNames,
    calculateNewCurrencyPrice,
    currencyNames,
    uniqueStrings,
} from "../services/exchangerServices";
import { ICurrency } from "../types";


class Exchanger {
    counter: number = 0;
    currencies: ICurrency[] = [];
    dataCurrencyBaseNames: string[] = [];
    dataCurrencyNames: string[] = [];
    dataCurrencies: ICurrency[] = [];
    baseCurrencyValue: string = "";
    baseCurrencyAmount: string = "1";
    currencyValue: string = "";
    currencyAmount: string = "1";

    constructor() {
        makeAutoObservable(this);

        const currencies = mockExchangerData.exchangeRate as ICurrency[];
        const baseNames = uniqueStrings(
            baseCurrencyNames(mockExchangerData.exchangeRate as ICurrency[])
        );
        const names = uniqueStrings(
            currencyNames(mockExchangerData.exchangeRate as ICurrency[])
        );

        this.currencies = currencies;
        this.dataCurrencyBaseNames = baseNames;
        this.dataCurrencyNames = names;
        this.baseCurrencyValue = baseNames[0];
        this.currencyValue = names[0];
    }

    setCurrencyValue(value) {
        this.currencyValue = value;

        this.currencyAmount = calculateNewCurrencyPrice(
            this.currencies,
            this.baseCurrencyValue,
            this.currencyValue,
            this.baseCurrencyAmount
        );
    }

    setCurrencyAmount(amount) {
        this.currencyAmount = amount;

        this.baseCurrencyAmount = calculateNewCurrencyPrice(
            this.currencies,
            this.baseCurrencyValue,
            this.currencyValue,
            this.currencyAmount
        );
    }

    setBaseCurrencyValue(value) {
        this.baseCurrencyValue = value;

        this.currencyAmount = calculateNewCurrencyPrice(
            this.currencies,
            this.baseCurrencyValue,
            this.currencyValue,
            this.baseCurrencyAmount
        );
    }

    setBaseCurrencyAmount(amount) {
        this.baseCurrencyAmount = amount;

        this.currencyAmount = calculateNewCurrencyPrice(
            this.currencies,
            this.baseCurrencyValue,
            this.currencyValue,
            this.baseCurrencyAmount
        );
    }

    setDataCurrencieNames(currencies) {
        this.dataCurrencyNames = currencies;
    }
}

export default new Exchanger();

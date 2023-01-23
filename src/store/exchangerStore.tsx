import { makeAutoObservable } from "mobx";
import { mockExchangerData } from "../assets/static";
import {
    baseCurrencyNames,
    calculateNewCurrencyPrice,
    currencyNames,
    uniqueStrings,
} from "../services/exchangerServices";
import { IRule, INewRule } from "../types";


class Exchanger {
    allRules: object = {};
    selectedRule: string = "";

    rawItems: IRule[] = [];
    primaryValues: string[] = [];
    secondaryValues: string[] = [];

    primaryValue: string = "";
    primaryAmount: string = "1";
    secondaryValue: string = "";
    secondaryAmount: string = "1";

    constructor() {
        makeAutoObservable(this);

        this.allRules = mockExchangerData;
        const defaultRule = Object.keys(this.allRules)[0];

        this.updateVariables(this.allRules, defaultRule)
    }

    updateVariables(allRules, selectedRule) {
        this.selectedRule = selectedRule;

        const values = allRules[this.selectedRule] as IRule[];
        const baseNames = uniqueStrings(
            baseCurrencyNames(allRules[this.selectedRule] as IRule[])
        );
        const names = uniqueStrings(
            currencyNames(allRules[this.selectedRule] as IRule[])
        );

        this.rawItems = values;
        this.primaryValues = baseNames;
        this.secondaryValues = names;
        this.primaryValue = baseNames[0];
        this.secondaryValue = names[0];
    }

    changeRule(ruleName: string) {
        this.updateVariables(this.allRules, ruleName);
    }

    createNewRule(ruleData: INewRule) {
        const newRule = ruleData as IRule;
        this.allRules[ruleData.ruleName] = [...this.allRules[ruleData.ruleName], newRule];

        this.updateVariables(this.allRules, ruleData.ruleName);
    }

    setValue(value) {
        this.secondaryValue = value;
        const isValidCombination = this.rawItems.filter(rule => rule.secondary === this.secondaryValue).filter(rule => rule.primary === this.primaryValue).length > 0;
        console.log("BTW", isValidCombination);
        
        if (isValidCombination) {
            this.secondaryAmount = calculateNewCurrencyPrice(
                this.rawItems,
                this.primaryValue,
                this.secondaryValue,
                this.primaryAmount
            );
        }
    }

    setAmount(amount) {
        this.secondaryAmount = amount;

        this.primaryAmount = calculateNewCurrencyPrice(
            this.rawItems,
            this.primaryValue,
            this.secondaryValue,
            this.secondaryAmount
        );
    }

    setBaseValue(value) {
        this.primaryValue = value;
        const isValidCombination = this.rawItems.filter(rule => rule.primary === this.primaryValue).filter(rule => rule.primary === this.primaryValue).length > 0;
        console.log("BTW", isValidCombination);
        
        if (isValidCombination) {
            this.secondaryAmount = calculateNewCurrencyPrice(
                this.rawItems,
                this.primaryValue,
                this.secondaryValue,
                this.primaryAmount
            );
        }
    }

    setBaseAmount(amount) {
        this.primaryAmount = amount;

        this.secondaryAmount = calculateNewCurrencyPrice(
            this.rawItems,
            this.primaryValue,
            this.secondaryValue,
            this.primaryAmount
        );
    }

    setDataNames(currencies) {
        this.secondaryValues = currencies;
    }
}

export default new Exchanger();

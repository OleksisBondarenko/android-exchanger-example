export interface ISelectValue {
    key: string;
    value: string;
    disabled: boolean;
}

export interface ICurrency {
    baseCurrency: string;
    currency: string;
    saleRateNB: number;
    purchaseRateNB: number;
    saleRate: number;
    purchaseRate: number;
}

export interface ISelectValue {
    key: string;
    value: string;
    disabled: boolean;
}

export interface IRule {
    primary: string;
    secondary: string;
    primaryAmount: number;
    secondaryAmount: number;
}

export interface INewRule extends IRule {
    ruleName: string
}

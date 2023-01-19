import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { SelectList  } from "react-native-dropdown-select-list";
import { selectValuesFromStrings } from "../services/exchangerServices";
import { ISelectValue } from "../types";

interface ExchangeInput {
  currencyNames: string[],
  amount?: string,
  onAmountChange?: Function, 
  onValueChange?: Function,
  defaultOption: string
}

const ExchangeInput = observer(({ currencyNames = [], defaultOption, amount: _amount, onValueChange, onAmountChange }: ExchangeInput) => {
    const [value, setSelected] = useState<string>("");
    const [amount, setInput] = useState<string>(_amount);
    
    const handleAmountChange = (event) => {
      const amount = event.nativeEvent.text;
        if (/^[0-9]*\.?[0-9]*$/.test(amount)) {
          setInput(amount);
          if (typeof onAmountChange === "function") {
            onAmountChange(amount)
          }
        }
    };

    const handleValueChange = (value) => {
      setSelected(value)
      if (typeof onValueChange === "function") {
        onValueChange(value);
      } 
    }

    const getValidList = () => {
      return currencyNames ? selectValuesFromStrings(currencyNames) : []
    }

    return (
        <View>
            <View style={styles.list}>
                <SelectList
                    setSelected={handleValueChange}
                    data={getValidList()}
                    save="value"
                    defaultOption={defaultOption}
                />
            </View>
            <View>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    onChange={handleAmountChange}
                    value={_amount != amount ? _amount : amount}
                ></TextInput>
            </View>
        </View>
    );
})

const styles = StyleSheet.create({
    body: {},
    list: {
        marginBottom: 10,
    },
    input: {
        borderRadius: 10,
        height: 50,
        paddingHorizontal: 20,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "rebeccapurple",
    }
});
export default ExchangeInput;

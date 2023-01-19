import { observer } from "mobx-react-lite";
import { Button, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useEffect, useRef, useState } from "react";
import ExchangeInput from "./ExchangeInput";
import exchangerStore from "../store/exchangerStore";
import { selectValueFromString } from "../services/exchangerServices";
import Loader from "./Loader";

const Main = observer(() => {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    updateData()
  }, [])

  const updateData = () => {
    setIsLoaded(false);
    setTimeout(() => {
      setIsLoaded(true);
    }, 100);
  }

  const handleBaseCurrencyValueChange = (value) => {
    exchangerStore.setBaseCurrencyValue(value);
  };

  const handleBaseCurrencyAmountChange = (amount) => {
    exchangerStore.setBaseCurrencyAmount(amount)
  };

  const handleCurrencyValueChange = (value) => {
    exchangerStore.setCurrencyValue(value);
  };

  const handleCurrencyAmountChange = (amount) => {
    exchangerStore.setCurrencyAmount(amount)
  };

  if (!isLoaded) {
    return <Loader />
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text >Super powerful exchanger</Text>
        <TouchableOpacity style={styles.updateButton} onPress={updateData}><Text style={styles.colorWhite}>Update</Text></TouchableOpacity>
      </View>

      <ExchangeInput
        currencyNames={exchangerStore.dataCurrencyBaseNames}
        amount={exchangerStore.baseCurrencyAmount}
        onValueChange={handleBaseCurrencyValueChange}
        onAmountChange={handleBaseCurrencyAmountChange}
        defaultOption={selectValueFromString(exchangerStore.baseCurrencyValue)} />
      <View style={styles.spacerH}></View>
      <ExchangeInput
        currencyNames={exchangerStore.dataCurrencyNames}
        amount={exchangerStore.currencyAmount}
        onValueChange={handleCurrencyValueChange}
        onAmountChange={handleCurrencyAmountChange}
        defaultOption={selectValueFromString(exchangerStore.currencyValue)} />
      <View>
        {
        exchangerStore.currencies.map(currency => (
        <View style={styles.currencies} key={currency.baseCurrency + currency.currency}> 
          <Text style={styles.currencyName}>{currency.baseCurrency}</Text>
          <Text style={styles.currencyName}>{currency.currency}</Text>
          <Text style={styles.currencyRate}>{currency.saleRate}</Text>
          <Text style={styles.currencyRate}>{currency.purchaseRate}</Text>
        </View>)
        )}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  header: {
    padding: 20,
    paddingLeft: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  updateButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  button: {
    paddingTop: 50,
    borderRadius: 6,
  },
  spacerH: {
    height: 50,
  },
  colorWhite: {
    color: "white"
  },
  currencies: {
    flexDirection: "row", justifyContent: "space-between"
  },
  currencyName: {
    flex: 10
  },
  currencyRate: {
    flex: 35
  }

});
export default Main;

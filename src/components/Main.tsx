import { observer } from "mobx-react-lite";
import { Button, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useEffect, useRef, useState } from "react";
import ExchangeInput from "./ExchangeInput";
import store from "../store/exchangerStore";
import { selectValueFromString, selectValuesFromStrings } from "../services/exchangerServices";
import Loader from "./Loader";
import CreateNewRule from "./CreateNewRule";
import { SelectList } from "react-native-dropdown-select-list";

const Main = observer(() => {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    updateData()
    console.log(store);
    
    
  }, [])

  const updateData = () => {
    setIsLoaded(false);
    setTimeout(() => {
      setIsLoaded(true);
    }, 100);
  }

  const handleBaseValueChange = (value) => {
    store.setBaseValue(value);
  };

  const handleBaseAmountChange = (amount) => {
    store.setBaseAmount(amount)
  };

  const handleValueChange = (value) => {
    store.setValue(value);
  };

  const handleAmountChange = (amount) => {
    store.setAmount(amount)
  };

  const handleRuleChange = (rule) => {
    
  }

  if (!isLoaded) {
    return <Loader />
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* <Text >Super powerful exchanger</Text>
        <TouchableOpacity style={styles.updateButton} onPress={updateData}><Text style={styles.colorWhite}>Update</Text></TouchableOpacity> */}
        {/* <View style={styles.modeButtons}>
          <TouchableOpacity style={styles.updateButton}  ><Text style={styles.colorWhite}>123</Text></TouchableOpacity>
          <TouchableOpacity style={styles.updateButton}  ><Text style={styles.colorWhite}>123</Text></TouchableOpacity>
          <TouchableOpacity style={styles.updateButton}  ><Text style={styles.colorWhite}>123</Text></TouchableOpacity>
          <TouchableOpacity style={styles.updateButton}  ><Text style={styles.colorWhite}>123</Text></TouchableOpacity>
          <TouchableOpacity style={styles.updateButton}  ><Text style={styles.colorWhite}>123</Text></TouchableOpacity>
        </View> */}
        <SelectList setSelected={handleRuleChange} data={selectValuesFromStrings(Object.keys(store.rawItems))}></SelectList>
        <CreateNewRule></CreateNewRule>
      </View>

      <ExchangeInput
        names={store.primaryValues}
        amount={store.primaryAmount}
        onValueChange={handleBaseValueChange}
        onAmountChange={handleBaseAmountChange}
        defaultOption={selectValueFromString(store.primaryValue)} />
      <View style={styles.spacerH}></View>
      <ExchangeInput
        names={store.secondaryValues}
        amount={store.secondaryAmount}
        onValueChange={handleValueChange}
        onAmountChange={handleAmountChange}
        defaultOption={selectValueFromString(store.secondaryValue)} />
      <View>
        {
        store.rawItems.map(currency => (
        <View style={styles.currencies} key={currency.primary + currency.secondary}> 
          <Text style={styles.currencyName}>{currency.primary}</Text>
          <Text style={styles.currencyName}>{currency.secondary}</Text>
          <Text style={styles.currencyRate}>{currency.primaryAmount}</Text>
          <Text style={styles.currencyRate}>{currency.secondaryAmount}</Text>
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
    paddingHorizontal: 5,
    // display: "flex",
    // flexDirection: "row",
    // justifyContent: "space-between"
  },
  modeButtons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 5,
    marginBottom: 10,
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

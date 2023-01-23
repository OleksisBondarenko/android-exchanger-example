import { useRef } from "react"
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import store from "../store/exchangerStore";
import { INewRule, IRule } from "../types";

function CreateNewRule() {
  const ruleName = useRef(null);
  const primary = useRef(null);
  const secondary = useRef(null);
  const primaryAmount = useRef(null);
  const secondaryAmount = useRef(null);

  const handleCreateNewRule = () =>  {
    const newRule = {} as INewRule;
    newRule.ruleName = ruleName.current["_internalFiberInstanceHandleDEV"].memoizedProps.text;
    newRule.primary = primary.current["_internalFiberInstanceHandleDEV"].memoizedProps.text;
    newRule.secondary = secondary.current["_internalFiberInstanceHandleDEV"].memoizedProps.text;
    newRule.primaryAmount = primaryAmount.current["_internalFiberInstanceHandleDEV"].memoizedProps.text;
    newRule.secondaryAmount = secondaryAmount.current["_internalFiberInstanceHandleDEV"].memoizedProps.text;

    console.log(newRule.ruleName)
    store.createNewRule(newRule)
    console.log(store);
    
  }
  return (
    <View style={styles.body}>
      
      <View style={styles.textInputBox}><TextInput defaultValue="currency" ref={ruleName} style={styles.textInput} placeholder="rule name"></TextInput></View>
      <View style={styles.textInputBox}><TextInput defaultValue="EUR" ref={primary} style={styles.textInput} placeholder="from"></TextInput></View>
      <View style={styles.textInputBox}><TextInput defaultValue="UAH" ref={secondary} style={styles.textInput} placeholder="to"></TextInput></View>
      <View style={styles.textInputBox}><TextInput defaultValue="13.4" ref={primaryAmount} style={styles.textInput} placeholder="baseAmount"></TextInput></View>
      <View style={styles.textInputBox}><TextInput defaultValue="1" ref={secondaryAmount} style={styles.textInput} placeholder="secondAmount"></TextInput></View>
      <TouchableOpacity style={styles.button} onPress={handleCreateNewRule}><Text>Create new rule</Text></TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    display: "flex",
  },
  textInputBox: {
    margin: 3,
    borderColor: 'black',
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 6,
  },
  textInput: {
    padding: 5
  },
    button: {
      marginTop: 5,
      borderRadius: 3,
      padding: 10,
      backgroundColor:"#4080ff",
    }
})
export default CreateNewRule
import { StyleSheet, Text, TextInput, View } from "react-native"

function Top() {
  return (
    <View style={styles.main}>
      <View style={styles.input}/>
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    marginTop: 30,
    backgroundColor: 'red'
  },
  input: {
    height: 40,
    backgroundColor: 'gray'
  }
  
})
export default Top
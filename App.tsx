
import { StyleSheet, View } from "react-native";

import Main from "./src/components/Main";
import Top from "./src/components/Top";

export default function App() {
  return (
    <View style={styles.container}>
      <Top />
      <Main />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

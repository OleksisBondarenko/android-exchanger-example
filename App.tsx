
import { ScrollView, StyleSheet, View } from "react-native";

import Main from "./src/components/Main";
import Top from "./src/components/Top";

export default function App() {
  return (
    <View style={styles.container}>
      <Top />
      <ScrollView>
        <Main />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

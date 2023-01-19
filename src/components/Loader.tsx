import { ActivityIndicator, StyleSheet, View } from "react-native";

function Loader() {
    return (
        <View style={styles.loader}>
            <ActivityIndicator size="large" color="red" />
        </View>
    );
}

const styles = StyleSheet.create({
    loader: {
        flex: 1,
        justifyContent: "center",
    },
});
export default Loader;

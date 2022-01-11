import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useTailwind } from "tailwind-rn";

export default function App() {
    const tw = useTailwind();

    return (
        <View style={tw("flex-1 justify-center items-center")}>
            <Text>Open up App.js to start working on your app!</Text>
            <StatusBar style="auto" />
        </View>
    );
}

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./StackNavigator";
import { AuthProvider } from "./hooks/useAuth";
import { LogBox, StyleSheet, Text, View } from "react-native";
LogBox.ignoreAllLogs();
import { useTailwind } from "tailwind-rn";

export default function App() {
    const tw = useTailwind();
    return (
        <NavigationContainer>
            <AuthProvider>
                <StackNavigator />
            </AuthProvider>
        </NavigationContainer>
    );
}

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: "center",
//         justifyContent: "center",
//     },
// });

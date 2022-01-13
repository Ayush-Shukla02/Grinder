import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect } from "react";
import {
    View,
    Text,
    Button,
    ImageBackground,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import useAuth from "../hooks/useAuth";
import { useTailwind } from "tailwind-rn";

const LoginScreen = () => {
    const tw = useTailwind();
    const { signInWithGoogle, loading } = useAuth();
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    return (
        <View style={styles.container}>
            <ImageBackground
                resizeMode="cover"
                style={styles.container}
                source={{ uri: "https://tinder.com/static/tinder.png" }}
            >
                <TouchableOpacity style={styles.touchable}>
                    <Text style={styles.text}>Sign In & get swiping</Text>
                </TouchableOpacity>
            </ImageBackground>
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    touchable: {
        position: "absolute",
        bottom: 40,
        width: 150,
    },
    text: {},
});

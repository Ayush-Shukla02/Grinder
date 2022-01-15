import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect } from "react";
import {
    View,
    Text,
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
                <TouchableOpacity
                    style={styles.touchable}
                    onPress={signInWithGoogle}
                >
                    <Text style={styles.text}>Sign In</Text>
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
        bottom: 120,
        width: 200,
        marginHorizontal: "33%",
    },
    text: {
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "white",
        padding: 8,
        borderRadius: 15,
    },
});

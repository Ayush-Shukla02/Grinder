import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, Button } from "react-native";
import useAuth from "../hooks/useAuth";

const HomeScreen = () => {
    const navigation = useNavigation();
    const { logout } = useAuth();

    return (
        <View>
            <Text>This is the HomeScreen</Text>
            <Button
                title="Go to Chat"
                onPress={() => navigation.navigate("Chat")}
            />
            <Button title="Logout" onPress={logout} />
        </View>
    );
};

export default HomeScreen;

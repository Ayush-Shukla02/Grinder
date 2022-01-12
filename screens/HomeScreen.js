import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, Button } from "react-native";

const HomeScreen = () => {
    const navigation = useNavigation();

    return (
        <View>
            <Text>This is the HomeScreen</Text>
            <Button
                title="Go to Chat"
                onPress={() => navigation.navigate("Chat")}
            />
        </View>
    );
};

export default HomeScreen;

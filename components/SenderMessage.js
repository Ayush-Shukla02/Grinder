import React from "react";
import { StyleSheet, Text, View } from "react-native";

const SenderMessage = ({ message }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.messageContainer}>{message.message}</Text>
        </View>
    );
};

export default SenderMessage;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "rgb(147, 51, 234)",
        borderRadius: 10,
        borderTopRightRadius: 0,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginHorizontal: 10,
        marginVertical: 5,
        alignSelf: "flex-end",
        marginLeft: "auto",
    },
    messageContainer: {
        color: "white",
    },
});

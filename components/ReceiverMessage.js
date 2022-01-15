import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const ReceiverMessage = ({ message }) => {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={{ uri: message.photoURL }} />
            <Text style={styles.messageContainer}>{message.message}</Text>
        </View>
    );
};

export default ReceiverMessage;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F87171",
        borderRadius: 10,
        borderTopLeftRadius: 0,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginHorizontal: 10,
        marginVertical: 5,
        alignSelf: "flex-start",
        marginLeft: 35,
    },
    messageContainer: {
        color: "white",
    },
    image: {
        height: 30,
        width: 30,
        borderRadius: 50,
        position: "absolute",
        marginTop: 0,
        marginLeft: -34,
    },
});

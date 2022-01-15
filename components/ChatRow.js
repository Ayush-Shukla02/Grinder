import { useNavigation } from "@react-navigation/native";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { db } from "../firebase";
import useAuth from "../hooks/useAuth";
import getMatchedUserInfo from "../lib/getMatchedUserInfo";

const ChatRow = ({ matchDetails }) => {
    const navigation = useNavigation();
    const { user } = useAuth();
    const [matchedUserInfo, setMatchedUserInfo] = useState(null);
    const [lastMessage, setLastMessage] = useState("");

    useEffect(() => {
        setMatchedUserInfo(getMatchedUserInfo(matchDetails.users, user.uid));
    }, [matchDetails, user]);

    useEffect(
        () =>
            onSnapshot(
                query(
                    collection(db, "matches", matchDetails.id, "messages"),
                    orderBy("timestamp", "desc")
                ),
                (snapshot) => setLastMessage(snapshot.docs[0]?.data().message)
            ),

        [matchDetails, db]
    );

    return (
        <TouchableOpacity
            style={[styles.touchable, styles.cardShadow]}
            onPress={() => navigation.navigate("Message", { matchDetails })}
        >
            <Image
                style={styles.image}
                source={{ uri: matchedUserInfo?.photoURL }}
            />

            <View>
                <Text style={styles.chatRowText}>
                    {matchedUserInfo?.displayName}
                </Text>
                <Text>{lastMessage || "Say Hi!"}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default ChatRow;

const styles = StyleSheet.create({
    cardShadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    touchable: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: "3.3%",
        backgroundColor: "white",
        marginHorizontal: 10,
        marginVertical: "8%",
        borderRadius: 10,
    },
    image: {
        borderRadius: 50,
        width: 45,
        height: 45,
        marginRight: 20,
        marginLeft: 10,
    },
    chatRowText: {
        fontSize: 17,
        fontWeight: "bold",
    },
});

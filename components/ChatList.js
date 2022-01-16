import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";
import useAuth from "../hooks/useAuth";
import ChatRow from "./ChatRow";

const ChatList = () => {
    const [matches, setMatches] = useState([]);
    const { user } = useAuth();

    useEffect(
        () =>
            onSnapshot(
                query(
                    collection(db, "matches"),
                    where("usersMatched", "array-contains", user.uid)
                ),
                (snapshot) =>
                    setMatches(
                        snapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data(),
                        }))
                    )
            ),
        [user]
    );

    return matches.length > 0 ? (
        <FlatList
            style={{ height: "100%" }}
            data={matches}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ChatRow matchDetails={item} />}
        />
    ) : (
        <View style={{ padding: 5 }}>
            <Text style={styles.noChatText}>No matches at the moment.</Text>
        </View>
    );
};

export default ChatList;

const styles = StyleSheet.create({
    noChatText: {
        textAlign: "center",
        fontSize: 20,
        lineHeight: 30,
    },
});

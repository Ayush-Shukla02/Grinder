import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const MatchScreen = () => {
    const navigation = useNavigation();
    const { params } = useRoute();

    const { loggedInProfile, userSwiped } = params;

    return (
        <View style={styles.container}>
            <View style={styles.matchImageContainer}>
                <Image
                    style={styles.matchImage}
                    source={{ uri: "https://links.papareact.com/mg9" }}
                />
            </View>

            <Text style={styles.matchText}>
                You and {userSwiped.displayName} have liked each other.
            </Text>

            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    source={{ uri: loggedInProfile.photoURL }}
                />
                <Image
                    style={styles.image}
                    source={{ uri: userSwiped.photoURL }}
                />
            </View>

            <TouchableOpacity
                style={styles.touchable}
                onPress={() => {
                    navigation.goBack();
                    navigation.navigate("Chat");
                }}
            >
                <Text style={{ textAlign: "center" }}>Send a Message</Text>
            </TouchableOpacity>
        </View>
    );
};

export default MatchScreen;

const styles = StyleSheet.create({
    container: {
        height: "100%",
        backgroundColor: "rgb(239, 68, 68)",
        paddingTop: 70,
        opacity: 0.89,
    },
    matchImageContainer: {
        justifyContent: "center",
        paddingHorizontal: 30,
        paddingTop: 50,
    },
    matchImage: {
        height: 85,
        width: "100%",
    },
    matchText: {
        color: "white",
        textAlign: "center",
        marginTop: 40,
    },
    imageContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginTop: 60,
    },
    image: {
        height: 110,
        width: 110,
        borderRadius: 50,
    },
    touchable: {
        backgroundColor: "white",
        margin: 100,
        padding: 10,
        borderRadius: 30,
        marginTop: 70,
    },
});

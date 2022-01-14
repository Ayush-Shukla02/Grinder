import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const MatchScreen = () => {
    const navigation = useNavigation();
    const { params } = useRoute();

    const { loggedInProfile, userSwiped } = params;

    return (
        <View style={styles.contianer}>
            <View style={styles.matchImageContainer}>
                <Image source={{ uri: "https://links.papareact.com/mg9" }} />
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
        paddingTop: 50,
        opacity: 0.89,
    },
    matchImageContainer: {
        justifyContent: "center",
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    matchImage: {
        height: 50,
        width: "100%",
    },
    matchText: {
        color: "white",
        textAlign: "center",
        marginTop: 20,
    },
    imageContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginTop: 20,
    },
    image: {
        height: 100,
        width: 100,
        borderRadius: 50,
    },
    touchable: {
        backgroundColor: "white",
        margin: 20,
        paddingHorizontal: 40,
        borderRadius: 50,
        marginTop: 30,
    },
});

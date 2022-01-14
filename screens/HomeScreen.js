import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect } from "react";
import {
    View,
    Text,
    Button,
    SafeAreaView,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
    Image,
} from "react-native";
import useAuth from "../hooks/useAuth";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";

const DUMMY_DATA = [
    {
        firstname: "Ayush",
        lastname: "Shukla",
        job: "Student",
        photoURL: "https://img.wattpad.com/cover/89571494-288-k960879.jpg",
        age: "19",
        id: 123,
    },
    {
        firstname: "Ayush",
        lastname: "Dhoot",
        job: "Student",
        photoURL:
            "https://www.randomanimestuff.com/wp-content/uploads/2020/07/Itachi-Uchiha-Naruto.jpg",
        age: "19",
        id: 456,
    },
    {
        firstname: "Mayank",
        lastname: "Talwar",
        job: "Student",
        photoURL:
            "https://bracketfights.com/images/templates/2019/18399/random-male-anime-character-badass-husbando--18399/74cc22e844154ee6af22bed92034b524jpg.png",
        age: "19",
        id: 789,
    },
];

const HomeScreen = () => {
    const navigation = useNavigation();
    const { user, logout } = useAuth();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.view}>
                <TouchableOpacity onPress={logout}>
                    <Image
                        style={styles.profileImage}
                        source={{
                            uri: user.photoURL,
                        }}
                    />
                </TouchableOpacity>

                <TouchableOpacity>
                    <Image
                        style={styles.logo}
                        source={require("../assets/logo.png")}
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
                    <Ionicons
                        name="chatbubbles-sharp"
                        size={32}
                        color="#FF5864"
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.swiper}>
                <Swiper
                    containerStyle={{ backgroundColor: "transparent" }}
                    cards={DUMMY_DATA}
                    stackSize={5}
                    cardIndex={0}
                    animateCardOpacity
                    verticalSwipe={false}
                    onSwipedLeft={() => {
                        console.log("swiped pass");
                    }}
                    overlayLabels={{
                        left: {
                            title: "NOPE",
                            style: {
                                label: {
                                    textAlign: "right",
                                    color: "red",
                                },
                            },
                        },
                        right: {
                            title: "MATCH",
                            style: {
                                label: {
                                    color: "#4DED30",
                                },
                            },
                        },
                    }}
                    renderCard={(card) => (
                        <View key={card.id} style={styles.card}>
                            <Image
                                style={styles.cardImage}
                                source={{ uri: card.photoURL }}
                            />
                            <View style={styles.cardDetail}>
                                <View>
                                    <Text style={styles.cardName}>
                                        {card.firstname} {card.lastname}
                                    </Text>
                                    <Text>{card.job}</Text>
                                </View>
                                <Text style={styles.cardAge}>{card.age}</Text>
                            </View>
                        </View>
                    )}
                />
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight,
    },
    view: {
        alignItems: "center",
        position: "relative",
        justifyContent: "space-between",
        flexDirection: "row",
        paddingHorizontal: 15,
    },
    profileImage: {
        height: 35,
        width: 35,
        borderRadius: 60,
    },
    logo: {
        height: 47,
        width: 40,
    },
    swiper: {
        flex: 1,
        marginTop: -20,
    },
    card: {
        position: "relative",
        backgroundColor: "white",
        height: 550,
        borderRadius: 25,
    },
    cardImage: {
        position: "absolute",
        top: 0,
        height: "100%",
        width: "100%",
        borderRadius: 25,
    },
    cardDetail: {
        flexDirection: "row",
        position: "absolute",
        justifyContent: "space-between",
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: "white",
        bottom: 0,
        width: "100%",
        height: 65,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    cardName: {
        fontSize: 18,
        fontWeight: "bold",
    },
    cardAge: {
        fontWeight: "bold",
        fontSize: 23,
    },
});

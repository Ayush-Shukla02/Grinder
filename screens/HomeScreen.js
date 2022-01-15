import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
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
import {
    collection,
    doc,
    getDoc,
    getDocs,
    onSnapshot,
    query,
    serverTimestamp,
    setDoc,
    where,
} from "firebase/firestore";
import { db } from "../firebase";
import generateId from "../lib/generateId";

// const DUMMY_DATA = [
//     {
//         firstname: "Ananjan",
//         lastname: "Thakur",
//         job: "Student",
//         photoURL: "https://img.wattpad.com/cover/89571494-288-k960879.jpg",
//         age: "19",
//         id: 123,
//     },
//     {
//         firstname: "Shivral",
//         lastname: "Somani",
//         job: "Student",
//         photoURL:
//             "https://www.randomanimestuff.com/wp-content/uploads/2020/07/Itachi-Uchiha-Naruto.jpg",
//         age: "19",
//         id: 456,
//     },
//     {
//         firstname: "Siddhant",
//         lastname: "Singhania",
//         job: "Student",
//         photoURL:
//             "https://bracketfights.com/images/templates/2019/18399/random-male-anime-character-badass-husbando--18399/74cc22e844154ee6af22bed92034b524jpg.png",
//         age: "19",
//         id: 789,
//     },
// ];

const HomeScreen = () => {
    const navigation = useNavigation();
    const { user, logout } = useAuth();
    const [profiles, setProfiles] = useState([]);
    const swipeRef = useRef(null);

    useLayoutEffect(
        () =>
            onSnapshot(doc(db, "users", user.uid), (snapshot) => {
                if (!snapshot.exists()) {
                    navigation.navigate("Modal");
                }
            }),
        []
    );

    useEffect(() => {
        let unsub;

        const fetchCards = async () => {
            const passes = await getDocs(
                collection(db, "users", user.uid, "passes")
            ).then((snapshot) => snapshot.docs.map((doc) => doc.id));

            const swipes = await getDocs(
                collection(db, "users", user.uid, "swipes")
            ).then((snapshot) => snapshot.docs.map((doc) => doc.id));

            const passedUserIds = passes.length > 0 ? passes : ["test"];
            const swipedUserIds = swipes.length > 0 ? swipes : ["test"];

            unsub = onSnapshot(
                query(
                    collection(db, "users"),
                    where("id", "not-in", [...passedUserIds, ...swipedUserIds])
                ),
                (snapshot) => {
                    setProfiles(
                        snapshot.docs
                            .filter((doc) => doc.id !== user.uid)
                            .map((doc) => ({
                                id: doc.id,
                                ...doc.data(),
                            }))
                    );
                }
            );
        };

        fetchCards();

        return unsub;
    }, [db]);

    const swipeLeft = (cardIndex) => {
        if (!profiles[cardIndex]) return;

        const userSwiped = profiles[cardIndex];

        console.log(`You swiped PASS on ${userSwiped.displayName}`);

        setDoc(doc(db, "users", user.uid, "passes", userSwiped.id), userSwiped);
    };

    const swipeRight = async (cardIndex) => {
        if (!profiles[cardIndex]) return;

        const userSwiped = profiles[cardIndex];
        const loggedInProfile = await (
            await getDoc(doc(db, "users", user.uid))
        ).data();

        getDoc(doc(db, "users", userSwiped.id, "swipes", user.uid)).then(
            (documentSnapshot) => {
                if (documentSnapshot.exists()) {
                    console.log(
                        `HOORAY! You matched with ${userSwiped.displayName}`
                    );

                    setDoc(
                        doc(db, "users", user.uid, "swipes", userSwiped.id),
                        userSwiped
                    );

                    setDoc(
                        doc(db, "matches", generateId(user.uid, userSwiped.id)),
                        {
                            users: {
                                [user.uid]: loggedInProfile,
                                [userSwiped.id]: userSwiped,
                            },
                            usersMatched: [user.uid, userSwiped.id],
                            timestamp: serverTimestamp(),
                        }
                    );

                    navigation.navigate("Match", {
                        loggedInProfile,
                        userSwiped,
                    });
                } else {
                    console.log(`You swiped on ${userSwiped.displayName}`);
                    setDoc(
                        doc(db, "users", user.uid, "swipes", userSwiped.id),
                        userSwiped
                    );
                }
            }
        );

        console.log(
            `You swiped on ${userSwiped.displayName} (${userSwiped.job})`
        );

        setDoc(doc(db, "users", user.uid, "swipes", userSwiped.id), userSwiped);
    };

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

                <TouchableOpacity onPress={() => navigation.navigate("Modal")}>
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
                    ref={swipeRef}
                    containerStyle={{ backgroundColor: "transparent" }}
                    cards={profiles}
                    stackSize={5}
                    cardIndex={0}
                    animateCardOpacity
                    verticalSwipe={false}
                    onSwipedLeft={(cardIndex) => {
                        console.log("Swipe PASS");
                        swipeLeft(cardIndex);
                    }}
                    onSwipedRight={(cardIndex) => {
                        console.log("Swipe MATCH");
                        swipeRight(cardIndex);
                    }}
                    backgroundColor="#4FD0E9"
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
                    renderCard={(card) =>
                        card ? (
                            <View key={card.id} style={styles.card}>
                                <Image
                                    style={styles.cardImage}
                                    source={{ uri: card.photoURL }}
                                />
                                <View style={styles.cardDetail}>
                                    <View>
                                        <Text style={styles.cardName}>
                                            {card.displayName}
                                        </Text>
                                        <Text>{card.job}</Text>
                                    </View>
                                    <Text style={styles.cardAge}>
                                        {card.age}
                                    </Text>
                                </View>
                            </View>
                        ) : (
                            <View style={[styles.card, styles.noCard]}>
                                <Text
                                    style={{
                                        fontWeight: "bold",
                                        paddingBottom: 5,
                                    }}
                                >
                                    No more Profiles
                                </Text>

                                <Image
                                    style={{ height: 70, width: "19%" }}
                                    height={100}
                                    width={100}
                                    source={{
                                        uri: "https://links.papareact.com/6gb",
                                    }}
                                />
                            </View>
                        )
                    }
                />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.buttonCross}
                    onPress={() => swipeRef.current.swipeLeft()}
                >
                    <Entypo name="cross" size={35} color="red" />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.buttonHeart}
                    onPress={() => swipeRef.current.swipeRight()}
                >
                    <AntDesign name="heart" size={35} color="green" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight + 10,
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
        height: "77%",
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
        alignItems: "center",
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
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginBottom: "10%",
    },
    buttonCross: {
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 60,
        height: 65,
        width: 65,
        backgroundColor: "rgb(254, 202, 202)",
    },
    buttonHeart: {
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 60,
        height: 65,
        width: 65,
        backgroundColor: "rgb(187, 247, 208)",
    },
    noCard: {
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
});

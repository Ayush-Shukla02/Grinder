import { useNavigation } from "@react-navigation/native";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import React, { useLayoutEffect, useState } from "react";
import {
    Image,
    StatusBar,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { db } from "../firebase";
import useAuth from "../hooks/useAuth";

const ModalScreen = () => {
    const navigation = useNavigation();
    const { user } = useAuth();
    const [image, setImage] = useState(null);
    const [job, setJob] = useState(null);
    const [age, setAge] = useState(null);

    const incompleteForm = !image || !job || !age;

    const updateUserProfile = () => {
        setDoc(doc(db, "users", user.uid), {
            id: user.uid,
            displayName: user.displayName,
            photoURL: image,
            job: job,
            age: age,
            timestamp: serverTimestamp(),
        })
            .then(() => {
                navigation.navigate("Home");
            })
            .catch((error) => {
                alert(error.message);
            });
    };

    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                resizeMode="contain"
                source={{
                    uri: "https://1000logos.net/wp-content/uploads/2018/07/Tinder-logo.png",
                }}
            />

            <Text style={styles.text}>Welcome {user.displayName}</Text>

            <Text style={styles.step}>Step 1: Profile Picture</Text>
            <TextInput
                value={image}
                onChangeText={setImage}
                style={styles.textInput}
                placeholder="Enter Profile Pic URL"
            />

            <Text style={styles.step}>Step 2: Job</Text>
            <TextInput
                value={job}
                onChangeText={setJob}
                style={styles.textInput}
                placeholder="Enter your Occupation"
            />

            <Text style={styles.step}>Step 3: Age</Text>
            <TextInput
                value={age}
                onChangeText={setAge}
                style={styles.textInput}
                placeholder="Enter your Age"
                keyboardType="numeric"
                maxLength={2}
            />

            <TouchableOpacity
                disabled={incompleteForm}
                style={[
                    styles.touchable,
                    incompleteForm
                        ? { backgroundColor: "rgb(156, 163, 175)" }
                        : { backgroundColor: "rgb(248, 113, 113)" },
                ]}
                onPress={updateUserProfile}
            >
                <Text style={styles.updateButton}>Update Profile</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ModalScreen;

const styles = StyleSheet.create({
    container: {
        marginTop: StatusBar.currentHeight + 20,
        flex: 1,
        alignItems: "center",
    },
    image: {
        height: 100,
        width: "100%",
    },
    text: {
        fontSize: 19,
        fontWeight: "bold",
        color: "rgb(107, 114, 128)",
    },
    step: {
        textAlign: "center",
        padding: 23,
        fontWeight: "bold",
        color: "rgb(248, 113, 113)",
    },
    textInput: {
        textAlign: "center",
        fontSize: 17,
    },
    touchable: {
        backgroundColor: "rgb(248, 113, 113)",
        position: "absolute",
        bottom: 30,
        width: 210,
        padding: 12,
        borderRadius: 20,
    },
    updateButton: {
        textAlign: "center",
        fontSize: 16,
        color: "white",
    },
});

import React from "react";
import {
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Foundation, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Header = ({ title, callEnabled }) => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{ marginRight: 10 }}
                >
                    <Ionicons
                        name="chevron-back-outline"
                        size={28}
                        color="#FF5864"
                    />
                </TouchableOpacity>
                <Text style={styles.headerText}>{title}</Text>
            </View>

            {callEnabled && (
                <TouchableOpacity style={styles.callButton}>
                    <Foundation name="telephone" size={20} color="red" />
                </TouchableOpacity>
            )}
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    container: {
        marginTop: StatusBar.currentHeight + 3,
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    header: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },
    headerText: {
        fontSize: 22,
        fontWeight: "bold",
        paddingLeft: 10,
    },
    callButton: {
        borderRadius: 100,
        marginRight: 20,
        padding: 10,
        backgroundColor: "rgb(254, 202, 202)",
    },
});

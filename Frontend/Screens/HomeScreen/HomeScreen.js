import React from "react";
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
} from "react-native";
import { DrawerActions } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const HomeScreen = ({ navigation }) => {
  const showMenu = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <SafeAreaView style={localStyles.container}>
      {/* Header */}
      <View style={localStyles.headerContainer}>
        <Text style={localStyles.organizationName}>Smart BloodLink Nepal</Text>
      </View>

      <TouchableOpacity style={localStyles.menuButton} onPress={showMenu}>
        <Image
          source={require("../../assets/list.png")}
          style={localStyles.menuIcon}
        />
      </TouchableOpacity>

      {/* Logo */}
      <Image
        source={require("../../assets/logo.png")}
        style={localStyles.homeLogo}
      />

      {/* Text Section */}
      <View style={localStyles.textContainer}>
        <Text style={localStyles.title}>Donate Blood</Text>
        <Text style={localStyles.subtitle}>Save a Life</Text>
        <Text style={localStyles.text}>
          Your Donation Can Make A Difference.
        </Text>
      </View>

      {/* Donate Button */}
      <TouchableOpacity
        style={localStyles.button}
        onPress={() => navigation.navigate("Donate")}
      >
        <Text style={localStyles.buttonText}>Donate Now</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f6f7", // requested background
    alignItems: "center",
    paddingVertical: 30,
    paddingHorizontal:10,
  },
  headerContainer: {
    paddingVertical: 15,
    alignItems: "center",
    backgroundColor: "#e53935", // Red header
    borderRadius: 8,
    marginTop: 10,
    width: "100%",
  },
  organizationName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  menuButton: {
    position: "absolute",
    top: "6%",
    left: 20,
    padding: 8,
  },
  menuIcon: {
    width: 24,
    height: 24,
    tintColor: "#fff",
  },
  homeLogo: {
    width: width * 0.6,
    height: width * 0.6,
    resizeMode: "contain",
    marginVertical: 30,
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#e53935", // Red
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    textAlign: "center",
    color: "#555",
    paddingHorizontal: 20,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#e53935", // Red button
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    width: width * 0.9, // responsive
  },
  buttonText: {
    color: "#fff", // White text
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default HomeScreen;

import React, { useContext, useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import { DrawerActions } from "@react-navigation/native";
import { Context } from "../../Context/Context";

const { width } = Dimensions.get("window");

const ProfileScreen = ({ navigation }) => {
  const { user } = useContext(Context);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [type, setType] = useState("-");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("9800000000");
  const [age, setAge] = useState();
  const [email, setEmail] = useState("");
  const [profileUrl, setProfileUrl] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setAddress(user.address || "Unknown");
      setType(user.bloodType || "-");
      setGender(user.gender || "N/A");
      setPhone(user.phone || "N/A");
      setAge(user.age || "-");
      setEmail(user.email || "N/A");
      setProfileUrl(user.profileUrl || "");
    }
  }, [user]);

  const showMenu = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <SafeAreaView style={localStyles.container}>
      {/* Header */}
      <View style={localStyles.headerContainer}>
        <Text style={localStyles.organizationName}>Smart BloodLink Nepal</Text>
      </View>

      {/* Menu Button */}
      <TouchableOpacity style={localStyles.menuButton} onPress={showMenu}>
        <Image
          source={require("../../assets/list.png")}
          style={localStyles.menuIcon}
        />
      </TouchableOpacity>

      {/* Profile Image */}
      <View style={localStyles.profileImageContainer}>
        <Image
          source={
            profileUrl ? { uri: profileUrl } : require("../../assets/logo.png")
          }
          style={localStyles.profileImage}
        />
      </View>

      {/* User Info Card */}
      <View style={localStyles.infoCard}>
        <Text style={localStyles.infoText}>Name: {name}</Text>
        <Text style={localStyles.infoText}>Phone: {phone}</Text>
        <Text style={localStyles.infoText}>Address: {address}</Text>
        <Text style={localStyles.infoText}>Gender: {gender}</Text>
        <Text style={localStyles.infoText}>Age: {age}</Text>
        <Text style={localStyles.infoText}>Email: {email}</Text>
        <Text style={localStyles.infoText}>Blood Type: {type}</Text>
      </View>

      {/* Edit Button */}
      <TouchableOpacity
        style={localStyles.button}
        onPress={() => {
          navigation.navigate("UpdateProfileScreen");
        }}
      >
        <Text style={localStyles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f6f7", // White background
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 30,
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
  headerContainer: {
    paddingVertical: 15,
    alignItems: "center",
    backgroundColor: "#e53935",
    borderRadius: 8,
    marginTop: 10,
    width: "100%",
  },
  organizationName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  profileImageContainer: {
    marginTop: 30,
    marginBottom: 20,
    alignItems: "center",
  },
  profileImage: {
    width: width * 0.35,
    height: width * 0.35,
    borderRadius: width * 0.175,
    borderWidth: 3,
    borderColor: "#e53935",
    resizeMode: "cover",
  },
  infoCard: {
    backgroundColor: "#fff",
    width: "95%",
    padding: 16,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 14,
    marginVertical: 4,
    color: "#333",
  },
  button: {
    backgroundColor: "#e53935",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    width: width * 0.9,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProfileScreen;

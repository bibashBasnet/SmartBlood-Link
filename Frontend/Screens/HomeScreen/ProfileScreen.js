import React, { useContext, useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { DrawerActions, useRoute } from "@react-navigation/native";
import { styles } from "../../Styles";
import logo from "../../assets/logo.png";
import { Context } from "../../Context/Context";

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
    <SafeAreaView style={styles.container}>
      {/* Menu Button */}
      <TouchableOpacity style={styles.menuButton} onPress={showMenu}>
        <Image
          source={require("../../assets/list.png")}
          style={styles.menuIcon}
        />
      </TouchableOpacity>

      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.organizationName}>Smart BloodLink Nepal</Text>
      </View>

      {/* Profile Image */}
      <View style={styles.profileImageContainer}>
        {/* Placeholder for profile image */}
        <Image
          source={
            profileUrl ? { uri: profileUrl } : require("../../assets/logo.png")
          }
          style={styles.profileImage}
        />
      </View>

      {/* User Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Name: {name}</Text>
        <Text style={styles.infoText}>Phone: {phone}</Text>
        <Text style={styles.infoText}>Address: {address}</Text>
        <Text style={styles.infoText}>Gender: {gender}</Text>
        <Text style={styles.infoText}>Age: {age}</Text>
        <Text style={styles.infoText}>Email: {email}</Text>
        <Text style={styles.infoText}>Blood Type: {type}</Text>
      </View>

      {/* Edit Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("UpdateProfileScreen");
        }}
      >
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ProfileScreen;

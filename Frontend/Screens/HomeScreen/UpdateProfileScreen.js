import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
  SafeAreaView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { DrawerActions } from "@react-navigation/native";
import Constants from "expo-constants";
import axios from "axios";
import { Context } from "../../Context/Context";
import { moderateScale, scale, verticalScale } from "../../utils/responsive";

const RED = "#e53935";
const BG = "#f7f6f7";
const CARD = "#ffffff";

const UpdateProfileScreen = ({ navigation }) => {
  const API_URL = Constants.expoConfig.extra.apiUrl;
  const { user, setUser } = useContext(Context);

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [bloodGroup, setBloodGroup] = useState(user?.bloodType || "");
  const [age, setAge] = useState(String(user?.age ?? ""));
  const [gender, setGender] = useState(user?.gender || "");

  const parts = (user?.address || ",,,").split(",");
  const [address, setAddress] = useState({
    province: parts[0]?.trim() || "",
    district: parts[1]?.trim() || "",
    ward: parts[2]?.trim() || "",
    municipality: parts[3]?.trim() || "",
  });

  const provinces = [
    "Province 1",
    "Madhesh Pradesh",
    "Bagmati Province",
    "Gandaki Province",
    "Lumbini Province",
    "Karnali Province",
    "Sudurpashchim Province",
  ];

  const showMenu = () => navigation.dispatch(DrawerActions.openDrawer());

  const handlerUpdate = async () => {
    const payload = {
      name,
      email,
      phone,
      bloodGroup,
      age: parseInt(age || "0", 10),
      gender,
      address: `${address.province},${address.district},${address.ward},${address.municipality}`,
    };
    try {
      const res = await axios.patch(
        `${API_URL}/users/updateUser/${user.id}`,
        payload
      );
      setUser(res.data);
      Alert.alert("Success", "Profile has been updated");
      navigation.goBack();
    } catch {
      Alert.alert("Error", "Profile has not been updated");
    }
  };

  return (
    <ScrollView
      style={s.screen}
      contentContainerStyle={[s.content, { marginTop: verticalScale(20) }]}
      keyboardShouldPersistTaps="handled"
    >
      {/* Menu Button (white over red header) */}
      <View style={s.headerContainer}>
        <Text style={s.organizationName}>Smart BloodLink Nepal</Text>
      </View>

      {/* Menu Button */}
      <TouchableOpacity style={s.menuButton} onPress={showMenu}>
        <Image source={require("../../assets/list.png")} style={s.menuIcon} />
      </TouchableOpacity>

      <Text style={s.title}>Update Information</Text>
      {/* Header */}

      <View style={s.formCard}>
        <TextInput
          style={s.input}
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={s.input}
          placeholder="Age"
          value={age}
          onChangeText={setAge}
          keyboardType="number-pad"
        />
        <TextInput
          style={s.input}
          placeholder="Phone Number"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
        <TextInput
          style={s.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <Text style={s.label}>Gender</Text>
        <Picker
          selectedValue={gender}
          style={s.picker}
          onValueChange={setGender}
        >
          <Picker.Item label="Select Gender" value="" />
          {["Male", "Female", "Other"].map((g) => (
            <Picker.Item key={g} label={g} value={g} />
          ))}
        </Picker>
        <Text style={s.label}>Blood Group</Text>
        <Picker
          selectedValue={bloodGroup}
          style={s.picker}
          onValueChange={setBloodGroup}
        >
          <Picker.Item label="Select Blood Group" value="" />
          {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((g) => (
            <Picker.Item key={g} label={g} value={g} />
          ))}
        </Picker>

        <Text style={s.sectionTitle}>Address</Text>
        <Picker
          selectedValue={address.province}
          style={s.picker}
          onValueChange={(value) => setAddress({ ...address, province: value })}
        >
          <Picker.Item label="Select Province" value="" />
          {provinces.map((province) => (
            <Picker.Item key={province} label={province} value={province} />
          ))}
        </Picker>

        {["district", "ward", "municipality"].map((field) => (
          <TextInput
            key={field}
            style={s.input}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={address[field]}
            onChangeText={(text) => setAddress({ ...address, [field]: text })}
            keyboardType={field === "ward" ? "number-pad" : "default"}
          />
        ))}

        <TouchableOpacity style={s.button} onPress={handlerUpdate}>
          <Text style={s.buttonText}>Update</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const s = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: BG,
  },
  content: {
    paddingHorizontal: scale(16),
    paddingBottom: verticalScale(60),
  },
  organizationName: {
    fontSize: moderateScale(18),
    fontWeight: "bold",
    color: RED,
  },
  title: {
    textAlign: "center",
    fontSize: moderateScale(20),
    fontWeight: "700",
    color: RED,
    marginBottom: verticalScale(10),
  },
  formCard: {
    backgroundColor: CARD,
    borderRadius: moderateScale(10),
    padding: verticalScale(14),
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: RED,
    marginBottom: verticalScale(14),
  },
  menuButton: {
    position: "absolute",
    top: "3%",
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
    marginTop: 20,
    width: "100%",
  },
  organizationName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  headerTitle: {
    color: "#fff",
    fontWeight: "700",
    fontSize: moderateScale(18),
  },

  input: {
    backgroundColor: CARD,
    borderWidth: 1,
    borderColor: "#e3e3e3",
    borderRadius: moderateScale(8),
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(12),
    fontSize: moderateScale(14),
    marginBottom: verticalScale(10),
    color: "#222",
  },
  label: {
    fontSize: moderateScale(13),
    fontWeight: "600",
    color: "#444",
    marginBottom: verticalScale(6),
    marginTop: verticalScale(4),
  },
  sectionTitle: {
    fontSize: moderateScale(16),
    fontWeight: "700",
    color: RED,
    marginTop: verticalScale(10),
    marginBottom: verticalScale(6),
  },
  picker: {
    backgroundColor: CARD,
    borderWidth: 1,
    borderColor: "#e3e3e3",
    borderRadius: moderateScale(8),
    marginBottom: verticalScale(10),
  },
  button: {
    backgroundColor: RED,
    borderRadius: moderateScale(8),
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: verticalScale(12),
    marginTop: verticalScale(10),
    elevation: 2,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: moderateScale(16),
    textTransform: "uppercase",
  },
});

export default UpdateProfileScreen;

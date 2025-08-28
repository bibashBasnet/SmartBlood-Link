import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
  Dimensions,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import logo from "../../assets/logo.png";

import Constants from "expo-constants";
import axios from "axios";
import { moderateScale, scale, verticalScale } from "../../utils/responsive";

const API_URL = Constants.expoConfig.extra.apiUrl;
const { width } = Dimensions.get("window");
const RED = "#e53935";
const BG = "#f7f6f7";
const CARD = "#ffffff";

const RegistrationScreen = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState("test");
  const [email, setEmail] = useState("test32@gmail.com");
  const [phone, setPhone] = useState("9864537289");
  const [password, setPassword] = useState("test123");
  const [bloodGroup, setBloodGroup] = useState("A+");
  const [userType, setUserType] = useState("0");
  const [username, setUsername] = useState("test");
  const [age, setAge] = useState("34");
  const [gender, setGender] = useState("Male");

  const [address, setAddress] = useState({
    province: "Bagmati Province",
    district: "dang",
    ward: "5",
    municipality: "ghorahi",
  });

  const [driverLicenses, setDriverLicenses] = useState([]);
  const [userProfile, setUserProfile] = useState(null);

  const provinces = [
    "Province 1",
    "Madhesh Pradesh",
    "Bagmati Province",
    "Gandaki Province",
    "Lumbini Province",
    "Karnali Province",
    "Sudurpashchim Province",
  ];

  const pickImages = async (setter, existingImages) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaType.IMAGE,
      quality: 1,
      allowsEditing: true,
    });

    if (!result.canceled) {
      const newImage = result.assets[0]?.uri;
      if (newImage) {
        let newImages = [...existingImages, newImage];
        if (newImages.length > 2) newImages = newImages.slice(0, 2);
        setter(newImages);
      }
    }
  };

  const pickProfileImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "We need media permissions to upload images."
      );
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
    });

    if (!result.canceled) {
      const uri = result.assets[0]?.uri;
      if (uri) setUserProfile(uri);
    }
  };

  const handleRegister = async () => {
    const emailRegex =
      /^[A-Za-z][A-Za-z0-9._%+-]*@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const phoneRegex = /^(98|97)\d{8}$/;

    if (
      !name ||
      !username ||
      !age ||
      !email ||
      !phone ||
      !password ||
      !bloodGroup ||
      userType === "" ||
      !gender
    ) {
      Alert.alert("Validation Error", "Please fill all required fields.");
      return;
    }
    if (!emailRegex.test(email.trim())) {
      Alert.alert("Validation Error", "Enter a valid email address.");
      return;
    }

    if (!phoneRegex.test(phone.trim())) {
      Alert.alert(
        "Validation Error",
        "Enter a valid 10-digit Nepali phone number."
      );
      return;
    }

    if (password.length < 6) {
      Alert.alert(
        "Validation Error",
        "Password must be at least 6 characters."
      );
      return;
    }

    if (userType === "1" && driverLicenses.length === 0) {
      Alert.alert(
        "Validation Error",
        "Driver License upload is required for Drivers."
      );
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("age", age);
    formData.append("gender", gender);
    formData.append("bloodType", bloodGroup);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("userType", parseInt(userType));
    formData.append(
      "address",
      `${address.province}, ${address.district}, ${address.ward}, ${address.municipality}`
    );

    if (userProfile) {
      const filename = userProfile.split("/").pop();
      formData.append("profileImage", {
        uri: userProfile,
        name: filename,
        type: "image/jpeg",
      });
    }

    try {
      const res = await axios.post(`${API_URL}/users/createUser`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.status === 200) {
        navigation.navigate("LandingPage");
      } else {
        Alert.alert("Error", "Something went wrong.");
      }
    } catch (e) {
      Alert.alert("Error", e?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={[styles.content, { marginTop: verticalScale(20) }]}
      keyboardShouldPersistTaps="handled"
    >
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.organizationName}>Smart BloodLink Nepal</Text>
      </View>

      <Text style={styles.title}>Registration Form</Text>

      {/* Form Card */}
      <View style={styles.formCard}>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#9e9e9e"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Age"
          placeholderTextColor="#9e9e9e"
          value={age}
          onChangeText={setAge}
          keyboardType="number-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          placeholderTextColor="#9e9e9e"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#9e9e9e"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Text style={styles.label}>Gender</Text>
        <Picker
          selectedValue={gender}
          style={styles.picker}
          onValueChange={setGender}
        >
          <Picker.Item label="Select Gender" value="" />
          {["Male", "Female", "Other"].map((g) => (
            <Picker.Item key={g} label={g} value={g} />
          ))}
        </Picker>

        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#9e9e9e"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#9e9e9e"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
          />
          <TouchableOpacity
            style={styles.toggleButton}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Text style={styles.toggleText}>
              {showPassword ? "Hide" : "Show"}
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Blood Group</Text>
        <Picker
          selectedValue={bloodGroup}
          style={styles.picker}
          onValueChange={setBloodGroup}
        >
          <Picker.Item label="Select Blood Group" value="" />
          {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((group) => (
            <Picker.Item key={group} label={group} value={group} />
          ))}
        </Picker>

        <Text style={styles.label}>User Type</Text>
        <Picker
          selectedValue={userType}
          style={styles.picker}
          onValueChange={setUserType}
        >
          <Picker.Item label="Select User Type" value="" />
          <Picker.Item label="Normal User" value="0" />
          <Picker.Item label="Driver" value="1" />
        </Picker>

        {/* Address */}
        <Text style={styles.sectionTitle}>Address</Text>
        <Picker
          selectedValue={address.province}
          style={styles.picker}
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
            style={styles.input}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            placeholderTextColor="#9e9e9e"
            value={address[field]}
            onChangeText={(text) => setAddress({ ...address, [field]: text })}
          />
        ))}

        {/* Profile Image */}
        <Text style={styles.sectionTitle}>Profile picture</Text>
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={pickProfileImage}
        >
          <Text style={styles.uploadButtonText}>Upload Profile picture</Text>
        </TouchableOpacity>
        <View style={styles.imagePreviewContainer}>
          {userProfile && (
            <Image source={{ uri: userProfile }} style={styles.imagePreview} />
          )}
        </View>
        {/* Driver License (max 2) */}
        {userType === "1" && (
          <>
            <Text style={styles.sectionTitle}>
              Driver License (max 2 images)
            </Text>
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={() => pickImages(setDriverLicenses, driverLicenses)}
            >
              <Text style={styles.uploadButtonText}>
                Upload Driver License Images
              </Text>
            </TouchableOpacity>
            <View style={styles.imagePreviewContainer}>
              {driverLicenses.map((uri, i) => (
                <Image key={i} source={{ uri }} style={styles.imagePreview} />
              ))}
            </View>
          </>
        )}

        {/* Submit */}
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: BG,
  },
  content: {
    paddingHorizontal: scale(16),
    paddingBottom: verticalScale(40),
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: verticalScale(12),
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
  inputContainer: {
    position: "relative",
    marginBottom: verticalScale(10),
  },
  toggleButton: {
    position: "absolute",
    right: scale(12),
    top: verticalScale(12),
    paddingVertical: verticalScale(4),
    paddingHorizontal: scale(6),
  },
  toggleText: {
    color: RED,
    fontWeight: "700",
    fontSize: moderateScale(12),
  },
  picker: {
    backgroundColor: CARD,
    borderWidth: 1,
    borderColor: "#e3e3e3",
    borderRadius: moderateScale(8),
    marginBottom: verticalScale(10),
  },
  uploadButton: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: RED,
    borderRadius: moderateScale(8),
    paddingVertical: verticalScale(10),
    alignItems: "center",
    justifyContent: "center",
    marginBottom: verticalScale(10),
  },
  uploadButtonText: {
    color: RED,
    fontWeight: "700",
    fontSize: moderateScale(14),
  },
  imagePreviewContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: scale(8),
    marginBottom: verticalScale(12),
  },
  imagePreview: {
    width: width * 0.28,
    height: width * 0.28,
    borderRadius: moderateScale(8),
    borderWidth: 1,
    borderColor: "#ddd",
  },
  button: {
    backgroundColor: RED,
    paddingVertical: verticalScale(12),
    borderRadius: moderateScale(8),
    alignItems: "center",
    justifyContent: "center",
    marginTop: verticalScale(6),
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: moderateScale(16),
  },
});

export default RegistrationScreen;

import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
  SafeAreaView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import Constants from "expo-constants";
import axios from "axios";
import { Context } from "../../Context/Context";
import { CommonActions, DrawerActions } from "@react-navigation/native";
import { moderateScale, scale, verticalScale } from "../../utils/responsive";

const API_URL = Constants.expoConfig.extra.apiUrl;
const RED = "#e53935";
const BG = "#f7f6f7";
const CARD = "#ffffff";

export default function BloodDonationForm({ navigation }) {
  const [checking, setChecking] = useState(true);
  const { donate, setDonate, user, bloodBank, setIsForm, coordinate } =
    useContext(Context);
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    setIsForm(true);
  }, [setIsForm]);

  useEffect(() => {
    if (!checking && donate) {
      navigation.replace("DonateStatusScreen");
    }
  }, [checking, donate, navigation]);

  const [fullName, setFullName] = useState(user.name);
  const [ageOrDOB, setAgeOrDOB] = useState(`${user.age}`);
  const [showDOBPicker, setShowDOBPicker] = useState(false);
  const [dob, setDOB] = useState(new Date());
  const [gender, setGender] = useState(user.gender);
  const [bloodGroup, setBloodGroup] = useState(user.bloodType);
  const [contactNumber, setContactNumber] = useState(user.phone);
  const [email, setEmail] = useState(user.email);
  const [address, setAddress] = useState(user.address);
  const [weight, setWeight] = useState("50");
  const [healthStatus, setHealthStatus] = useState("ok");
  const [lastDonationDate, setLastDonationDate] = useState(new Date());
  const [showLastDonationPicker, setShowLastDonationPicker] = useState(false);
  const [preferredDonationDate, setPreferredDonationDate] = useState(
    new Date()
  );
  const [showPreferredDonationPicker, setShowPreferredDonationPicker] =
    useState(false);
  const [allergies, setAllergies] = useState("None");
  const [emergencyContact, setEmergencyContact] = useState("9867504938");
  const [createdBy, setCreatedBy] = useState(user.id);

  useEffect(() => {
    setFullName(user.name || "");
    setAgeOrDOB(`${user.age}` || "");
    setGender(user.gender || "");
    setBloodGroup(user.bloodType || "");
    setContactNumber(user.phone || "");
    setEmail(user.email || "");
    setAddress(user.address || "");
    setCreatedBy(user.id);
  }, [user]);

  const onSubmit = async () => {
    const emailRegex =
      /^[A-Za-z][A-Za-z0-9._%+-]*@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const phoneRegex = /^(98|97)\d{8}$/;

    if (
      !fullName ||
      !weight ||
      !healthStatus ||
      !ageOrDOB ||
      !gender ||
      !email ||
      !contactNumber ||
      !address ||
      !bloodGroup
    ) {
      Alert.alert("Validation Error", "Please fill all required fields.");
      return;
    }

    if (!emailRegex.test(email.trim())) {
      Alert.alert("Validation Error", "Enter a valid email address.");
      return;
    }
    if (!phoneRegex.test(contactNumber.trim())) {
      Alert.alert(
        "Validation Error",
        "Enter a valid 10-digit Nepali phone number."
      );
      return;
    }
    if (!phoneRegex.test(emergencyContact.trim())) {
      Alert.alert(
        "Validation Error",
        "Enter a valid 10-digit Nepali phone number."
      );
      return;
    }

    const payload = {
      name: fullName,
      age: ageOrDOB,
      gender,
      bloodGroup,
      phone: contactNumber,
      email,
      address,
      weight,
      medicalHistory: healthStatus,
      lastDonationDate,
      preferredDate: preferredDonationDate,
      allergies,
      emergencyContact,
      createdBy,
      bloodBankName: bloodBank,
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
    };

    try {
      await axios.post(`${API_URL}/donate/create`, payload);
      Alert.alert("Success", "Donation request submitted!");
      const res = await axios.get(`${API_URL}/donate/get/${user.id}`);
      setDonate(res.data);
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "DonateStatusScreen" }],
        })
      );
    } catch (e) {
      Alert.alert(
        "Error",
        e?.response?.data?.message || e.message || "Something went wrong"
      );
    }
  };

  const showMenu = () => navigation.dispatch(DrawerActions.openDrawer());
  const handlePress = () => navigation.navigate("Map", { from: "Donate" });

  if (!trigger) {
    return (
      <SafeAreaView style={s.safe}>
        {/* Floating menu over header */}
        <TouchableOpacity style={s.menuButton} onPress={showMenu}>
          <Image source={require("../../assets/list.png")} style={s.menuIcon} />
        </TouchableOpacity>

        <ScrollView style={s.container} contentContainerStyle={s.content}>
          {/* Header */}
          <View style={s.header}>
            <Text style={s.headerTitle}>Smart BloodLink Nepal</Text>
          </View>
          <Text style={s.headerSubtitle}>Blood Donation Form</Text>

          {/* Form card */}
          <View style={s.card}>
            <Text style={s.sectionTitle}>Personal Information</Text>

            <Text style={s.label}>Full Name *</Text>
            <TextInput
              style={s.input}
              value={fullName}
              onChangeText={setFullName}
              placeholder="Enter full name"
              placeholderTextColor="#9e9e9e"
            />

            <Text style={s.label}>Age or Date of Birth *</Text>
            <TextInput
              style={s.input}
              value={ageOrDOB}
              onChangeText={setAgeOrDOB}
              placeholder="Enter age or pick DOB"
              placeholderTextColor="#9e9e9e"
              keyboardType="numeric"
            />
            <TouchableOpacity
              style={s.dateButton}
              onPress={() => setShowDOBPicker(true)}
            >
              <Text style={s.dateText}>Pick Date of Birth</Text>
            </TouchableOpacity>
            {showDOBPicker && (
              <DateTimePicker
                value={dob}
                mode="date"
                display="default"
                onChange={(e, d) => {
                  setShowDOBPicker(false);
                  if (d) setDOB(d);
                }}
                maximumDate={new Date()}
              />
            )}

            <Text style={s.label}>Gender *</Text>
            <View style={s.pickerContainer}>
              <Picker
                selectedValue={gender}
                onValueChange={setGender}
                style={s.picker}
              >
                <Picker.Item label="Select Gender" value="" />
                <Picker.Item label="Male" value="Male" />
                <Picker.Item label="Female" value="Female" />
                <Picker.Item label="Other" value="Other" />
              </Picker>
            </View>

            <Text style={s.label}>Blood Group *</Text>
            <View style={s.pickerContainer}>
              <Picker
                selectedValue={bloodGroup}
                onValueChange={setBloodGroup}
                style={s.picker}
              >
                <Picker.Item label="Select Blood Group" value="" />
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((g) => (
                  <Picker.Item key={g} label={g} value={g} />
                ))}
              </Picker>
            </View>

            <Text style={s.sectionTitle}>Contact Information</Text>

            <Text style={s.label}>Contact Number *</Text>
            <TextInput
              style={s.input}
              value={contactNumber}
              onChangeText={setContactNumber}
              placeholder="Enter contact number"
              placeholderTextColor="#9e9e9e"
              keyboardType="phone-pad"
            />

            <Text style={s.label}>Email Address *</Text>
            <TextInput
              style={s.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter email"
              placeholderTextColor="#9e9e9e"
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Text style={s.label}>Address or Location *</Text>
            <TextInput
              style={s.input}
              value={address}
              onChangeText={setAddress}
              placeholder="City, District, Province"
              placeholderTextColor="#9e9e9e"
            />

            <TouchableOpacity style={s.secondaryButton} onPress={handlePress}>
              <Text style={s.secondaryButtonText}>
                Pick Your Location on Map
              </Text>
            </TouchableOpacity>

            <Text style={s.sectionTitle}>Health Information</Text>

            <Text style={s.label}>Weight (kg) *</Text>
            <TextInput
              style={s.input}
              value={weight}
              onChangeText={setWeight}
              placeholder="Enter weight"
              placeholderTextColor="#9e9e9e"
              keyboardType="numeric"
            />

            <Text style={s.label}>Health Status / Medical History *</Text>
            <TextInput
              style={[s.input, s.textArea]}
              value={healthStatus}
              onChangeText={setHealthStatus}
              placeholder="Any recent illness or chronic diseases"
              placeholderTextColor="#9e9e9e"
              multiline
              numberOfLines={4}
            />

            <Text style={s.label}>Last Donation Date (if any)</Text>
            <TouchableOpacity
              style={s.dateButton}
              onPress={() => setShowLastDonationPicker(true)}
            >
              <Text style={s.dateText}>{lastDonationDate.toDateString()}</Text>
            </TouchableOpacity>
            {showLastDonationPicker && (
              <DateTimePicker
                value={lastDonationDate}
                mode="date"
                display="default"
                onChange={(e, d) => {
                  setShowLastDonationPicker(false);
                  if (d) setLastDonationDate(d);
                }}
                maximumDate={new Date()}
              />
            )}

            <Text style={s.label}>Preferred Donation Date</Text>
            <TouchableOpacity
              style={s.dateButton}
              onPress={() => setShowPreferredDonationPicker(true)}
            >
              <Text style={s.dateText}>
                {preferredDonationDate.toDateString()}
              </Text>
            </TouchableOpacity>
            {showPreferredDonationPicker && (
              <DateTimePicker
                value={preferredDonationDate}
                mode="date"
                display="default"
                onChange={(e, d) => {
                  setShowPreferredDonationPicker(false);
                  if (d) setPreferredDonationDate(d);
                }}
                minimumDate={new Date()}
              />
            )}

            <Text style={s.label}>Any Allergies or Medication</Text>
            <TextInput
              style={[s.input, s.textArea]}
              value={allergies}
              onChangeText={setAllergies}
              placeholder="List any allergies or medication"
              placeholderTextColor="#9e9e9e"
              multiline
              numberOfLines={4}
            />

            <Text style={s.label}>Emergency Contact *</Text>
            <TextInput
              style={s.input}
              value={emergencyContact}
              onChangeText={setEmergencyContact}
              placeholder="Emergency contact number"
              placeholderTextColor="#9e9e9e"
              keyboardType="phone-pad"
            />

            <TouchableOpacity style={s.primaryButton} onPress={onSubmit}>
              <Text style={s.primaryButtonText}>Submit Donation Request</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return null;
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: BG },
  container: { flex: 1, backgroundColor: BG },
  content: {
    paddingHorizontal: scale(16),
    paddingBottom: verticalScale(40),
  },

  header: {
    backgroundColor: RED,
    borderRadius: moderateScale(8),
    paddingVertical: verticalScale(16),
    paddingHorizontal: scale(12),
    alignItems: "center",
    marginTop: verticalScale(40),
    marginBottom: verticalScale(16),
  },
  headerTitle: {
    color: "#fff",
    fontWeight: "800",
    fontSize: moderateScale(18),
  },
  headerSubtitle: {
    textAlign: "center",
    fontSize: moderateScale(20),
    fontWeight: "700",
    color: RED,
    marginBottom: verticalScale(10),
  },

  // Floating menu (white icon over red)
  menuButton: {
    position: "absolute",
    top: verticalScale(50),
    left: scale(20),
    zIndex: 20,
    padding: scale(8),
  },
  menuIcon: { width: scale(24), height: scale(24), tintColor: "#fff" },

  card: {
    backgroundColor: CARD,
    borderRadius: moderateScale(12),
    padding: verticalScale(14),
    borderLeftWidth: 4,
    borderLeftColor: RED,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  sectionTitle: {
    fontSize: moderateScale(16),
    fontWeight: "700",
    color: RED,
    marginTop: verticalScale(6),
    marginBottom: verticalScale(8),
  },
  label: {
    fontSize: moderateScale(13.5),
    fontWeight: "600",
    color: "#b71c1c",
    marginBottom: verticalScale(6),
  },

  input: {
    backgroundColor: CARD,
    borderWidth: 1.5,
    borderColor: "#ffcdd2",
    borderRadius: moderateScale(10),
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(12),
    fontSize: moderateScale(14),
    marginBottom: verticalScale(12),
    color: "#222",
  },
  textArea: {
    height: verticalScale(100),
    textAlignVertical: "top",
  },

  pickerContainer: {
    backgroundColor: CARD,
    borderWidth: 1.5,
    borderColor: "#ffcdd2",
    borderRadius: moderateScale(10),
    marginBottom: verticalScale(12),
  },
  picker: {
    height: verticalScale(60),
    color: "#333",
  },

  dateButton: {
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(12),
    backgroundColor: CARD,
    borderRadius: moderateScale(10),
    borderWidth: 1.5,
    borderColor: "#ffcdd2",
    marginBottom: verticalScale(12),
  },
  dateText: {
    fontSize: moderateScale(14),
    color: RED,
    fontWeight: "700",
    textAlign: "center",
  },

  secondaryButton: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: RED,
    borderRadius: moderateScale(10),
    paddingVertical: verticalScale(10),
    alignItems: "center",
    marginBottom: verticalScale(16),
  },
  secondaryButtonText: {
    color: RED,
    fontWeight: "800",
    fontSize: moderateScale(14),
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  primaryButton: {
    backgroundColor: RED,
    paddingVertical: verticalScale(14),
    borderRadius: moderateScale(10),
    alignItems: "center",
    marginTop: verticalScale(8),
  },
  primaryButtonText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: moderateScale(15.5),
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
});

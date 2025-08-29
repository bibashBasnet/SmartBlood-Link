import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Constants from "expo-constants";
import axios from "axios";
import { Context } from "../../Context/Context";
import RadioGroup from "react-native-radio-buttons-group";
import { moderateScale, scale, verticalScale } from "../../utils/responsive";
import { DrawerActions, useFocusEffect } from "@react-navigation/native";

const RED = "#e53935";
const BG = "#f7f6f7";
const CARD = "#ffffff";
const API_URL = Constants.expoConfig.extra.apiUrl;

const BloodRequestForm = ({ navigation }) => {
  const {
    user,
    setIsForm,
    requestCoord,
    selectedFreshId,
    setSelectedFreshId,
    selectedDeliveryId,
    setSelectedDeliveryId,
    setCoordinate,
    bloodBank,
  } = useContext(Context);

  useFocusEffect(
    useCallback(() => {
      setIsForm(true); // when the screen gains focus
      return () => {
        // optional: when screen loses focus
        // setIsForm(false);
      };
    }, [])
  );

  const [form, setForm] = useState({
    patientName: "Bibash",
    contact: "9867485735",
    bloodGroup: "A+",
    province: "Bagmati Province",
    district: "Dang",
    municipality: "Ghorahi",
    unitsRequired: "2",
    reason: "Accident",
    email: "bibash3@gmail.com",
    hospital: "Sahid Memorial",
  });

  const Freshoptions = [
    { id: "1", label: "Yes", value: "yes" },
    { id: "2", label: "No", value: "no" },
  ];
  const Deliveryoptions = [
    { id: "1", label: "Yes", value: "yes" },
    { id: "2", label: "No", value: "no" },
  ];

  // dropdowns
  const [bloodGroupOpen, setBloodGroupOpen] = useState(false);
  const [bloodGroupItems, setBloodGroupItems] = useState([
    { label: "A+", value: "A+" },
    { label: "A-", value: "A-" },
    { label: "B+", value: "B+" },
    { label: "B-", value: "B-" },
    { label: "AB+", value: "AB+" },
    { label: "AB-", value: "AB-" },
    { label: "O+", value: "O+" },
    { label: "O-", value: "O-" },
  ]);

  const [provinceOpen, setProvinceOpen] = useState(false);
  const [provinceItems, setProvinceItems] = useState([
    { label: "Bagmati Province", value: "Bagmati Province" },
    { label: "Gandaki Province", value: "Gandaki Province" },
    { label: "Lumbini Province", value: "Lumbini Province" },
    { label: "Karnali Province", value: "Karnali Province" },
    { label: "Sudurpashchim Province", value: "Sudurpashchim Province" },
    { label: "Koshi Province", value: "Koshi Province" },
    { label: "Madhesh Province", value: "Madhesh Province" },
  ]);

  const handleChange = (field, value) =>
    setForm((f) => ({ ...f, [field]: value }));

  const selectedFreshValue =
    Freshoptions.find((o) => o.id === selectedFreshId)?.value ?? "no";
  const selectedDeliveryValue =
    Deliveryoptions.find((o) => o.id === selectedDeliveryId)?.value ?? "no";
  const isFresh = selectedFreshValue === "yes";
  const isDelivery = selectedDeliveryValue === "yes";

  const showMenu = () => navigation.dispatch(DrawerActions.openDrawer());

  const handlePressMap = () => {
    setCoordinate({ latitude: 27.6949, longitude: 85.2899 });
    navigation.navigate("Map", { from: "Request" });
  };

  const handleSubmit = () => {
    const emailRegex =
      /^[A-Za-z][A-Za-z0-9._%+-]*@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const phoneRegex = /^(98|97)\d{8}$/;

    if (!emailRegex.test(form.email.trim()))
      return Alert.alert("Validation Error", "Enter a valid email address.");

    if (
      !form.patientName ||
      !form.contact ||
      !form.bloodGroup ||
      !form.province ||
      !form.district ||
      !form.municipality ||
      !form.unitsRequired ||
      !form.email
    )
      return Alert.alert("Error", "Please fill in all required fields");

    if (!phoneRegex.test(form.contact.trim()))
      return Alert.alert(
        "Validation Error",
        "Enter a valid 10-digit Nepali phone number."
      );

    const units = parseInt(form.unitsRequired, 10);
    if (Number.isNaN(units) || units <= 0)
      return Alert.alert("Error", "Enter a valid number of units.");

    const payload = {
      name: form.patientName,
      phone: form.contact,
      email: form.email,
      type: form.bloodGroup,
      location: `${form.province}, ${form.district}, ${form.municipality}`,
      amount: units,
      createdBy: user.id,
      isFresh,
      isDelivery,
      latitude: requestCoord?.latitude ?? null,
      longitude: requestCoord?.longitude ?? null,
      hospital: form.hospital,
      bloodBank,
    };

    axios
      .post(`${API_URL}/requests/create`, payload)
      .then(() => {
        Alert.alert("Success", "Blood request submitted successfully!");
        navigation.navigate("RequestScreen");
        setForm({
          patientName: "",
          contact: "",
          bloodGroup: "",
          province: "",
          district: "",
          municipality: "",
          unitsRequired: "",
          reason: "",
          email: "",
          hospital: "",
        });
        setSelectedFreshId("2"); // default to "No"
        setSelectedDeliveryId("2");
      })
      .catch((e) =>
        Alert.alert("Error", e?.response?.data?.message || "Submission failed")
      );
  };

  return (
    <SafeAreaView style={s.safe}>
      <ScrollView style={s.container} contentContainerStyle={s.content}>
        {/* Floating menu (white over red header) */}
        <TouchableOpacity style={s.menuButton} onPress={showMenu}>
          <Image source={require("../../assets/list.png")} style={s.menuIcon} />
        </TouchableOpacity>
        {/* Red header */}
        <View style={s.header}>
          <Text style={s.headerTitle}>Smart BloodLink Nepal</Text>
        </View>
        <Text style={s.headerSubtitle}>Blood Request Form</Text>
        {/* Form card */}
        <View style={s.card}>
          <Text style={s.sectionTitle}>Patient Details</Text>

          <Text style={s.label}>Patient Name *</Text>
          <TextInput
            style={s.input}
            placeholder="Enter patient name"
            placeholderTextColor="#9e9e9e"
            value={form.patientName}
            onChangeText={(t) => handleChange("patientName", t)}
          />

          <Text style={s.label}>Contact Number *</Text>
          <TextInput
            style={s.input}
            placeholder="Enter contact number"
            placeholderTextColor="#9e9e9e"
            keyboardType="phone-pad"
            value={form.contact}
            onChangeText={(t) => handleChange("contact", t)}
          />

          <Text style={s.label}>Email *</Text>
          <TextInput
            style={s.input}
            placeholder="Enter email"
            placeholderTextColor="#9e9e9e"
            autoCapitalize="none"
            keyboardType="email-address"
            value={form.email}
            onChangeText={(t) => handleChange("email", t)}
          />

          <Text style={s.label}>Required Blood Group *</Text>
          <DropDownPicker
            open={bloodGroupOpen}
            value={form.bloodGroup}
            items={bloodGroupItems}
            setOpen={setBloodGroupOpen}
            setItems={setBloodGroupItems}
            setValue={(cb) => handleChange("bloodGroup", cb(form.bloodGroup))}
            placeholder="Select blood group"
            style={s.dropdown}
            dropDownContainerStyle={s.dropdownContainer}
            zIndex={3000}
            zIndexInverse={1000}
            listMode="SCROLLVIEW"
          />

          <Text style={s.label}>Number of Units Required *</Text>
          <TextInput
            style={s.input}
            placeholder="e.g., 1, 2, 3"
            placeholderTextColor="#9e9e9e"
            keyboardType="numeric"
            value={form.unitsRequired}
            onChangeText={(t) => handleChange("unitsRequired", t)}
          />

          <Text style={s.sectionTitle}>Location</Text>

          <Text style={s.label}>Province *</Text>
          <DropDownPicker
            open={provinceOpen}
            value={form.province}
            items={provinceItems}
            setOpen={setProvinceOpen}
            setItems={setProvinceItems}
            setValue={(cb) => handleChange("province", cb(form.province))}
            placeholder="Select province"
            style={s.dropdown}
            dropDownContainerStyle={s.dropdownContainer}
            zIndex={2000}
            zIndexInverse={2000}
            listMode="SCROLLVIEW"
          />

          <Text style={s.label}>District *</Text>
          <TextInput
            style={s.input}
            placeholder="Enter district"
            placeholderTextColor="#9e9e9e"
            value={form.district}
            onChangeText={(t) => handleChange("district", t)}
          />

          <Text style={s.label}>Municipality *</Text>
          <TextInput
            style={s.input}
            placeholder="Enter municipality"
            placeholderTextColor="#9e9e9e"
            value={form.municipality}
            onChangeText={(t) => handleChange("municipality", t)}
          />

          <Text style={s.sectionTitle}>Fresh / Delivery</Text>

          <Text style={s.label}>Do you need Fresh Blood?</Text>
          <RadioGroup
            radioButtons={Freshoptions}
            selectedId={selectedFreshId}
            onPress={setSelectedFreshId}
            layout="row"
            containerStyle={{ marginVertical: 8 }}
            labelStyle={{ marginRight: 16, fontSize: moderateScale(14) }}
          />

          {isFresh ? (
            <>
              <Text style={s.label}>Hospital Name *</Text>
              <TextInput
                style={s.input}
                placeholder="Enter Hospital Name"
                placeholderTextColor="#9e9e9e"
                value={form.hospital}
                onChangeText={(t) => handleChange("hospital", t)}
              />
            </>
          ) : (
            <>
              <Text style={s.label}>Do you need Delivery Service?</Text>
              <RadioGroup
                radioButtons={Deliveryoptions}
                selectedId={selectedDeliveryId}
                onPress={setSelectedDeliveryId}
                layout="row"
                containerStyle={{ marginVertical: 8 }}
                labelStyle={{ marginRight: 16, fontSize: moderateScale(14) }}
              />

              <TouchableOpacity
                style={s.secondaryButton}
                onPress={handlePressMap}
              >
                <Text style={s.secondaryButtonText}>
                  Pick Your Location on Map
                </Text>
              </TouchableOpacity>
            </>
          )}

          <TouchableOpacity style={s.primaryButton} onPress={handleSubmit}>
            <Text style={s.primaryButtonText}>Submit Blood Request</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: BG },
  container: { flex: 1, backgroundColor: BG },
  content: { paddingHorizontal: scale(16), paddingBottom: verticalScale(40) },

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

  // floating menu
  menuButton: {
    position: "absolute",
    top: verticalScale(50),
    left: scale(20),
    zIndex: 10,
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

  dropdown: {
    borderColor: "#ffcdd2",
    borderWidth: 1.5,
    borderRadius: moderateScale(10),
    marginBottom: verticalScale(12),
    backgroundColor: CARD,
  },
  dropdownContainer: {
    borderColor: "#ffcdd2",
    borderWidth: 1.5,
    borderRadius: moderateScale(10),
    backgroundColor: CARD,
  },

  secondaryButton: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: RED,
    borderRadius: moderateScale(10),
    paddingVertical: verticalScale(10),
    alignItems: "center",
    marginTop: verticalScale(4),
    marginBottom: verticalScale(12),
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
    marginTop: verticalScale(6),
  },
  primaryButtonText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: moderateScale(15.5),
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
});

export default BloodRequestForm;

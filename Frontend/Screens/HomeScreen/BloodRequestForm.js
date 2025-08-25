import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Button,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Constants from "expo-constants";
import axios from "axios";
import { Context } from "../../Context/Context";
import RadioGroup from "react-native-radio-buttons-group";
import { moderateScale, scale, verticalScale } from "../../utils/responsive";
import { DrawerActions } from "@react-navigation/native";

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
  const API_URL = Constants.expoConfig.extra.apiUrl;

  useEffect(() => {
    setIsForm(true);
  }, []);

  const [form, setForm] = useState({
    patientName: "Bibash",
    contact: "98674857354",
    bloodGroup: "A+",
    province: "Bagmati Province",
    district: "dang",
    municipality: "ghorah",
    unitsRequired: "5",
    reason: "accident",
    email: "bibash3@gmail.com",
    hospital: "Sahid memorial",
  });

  const Freshoptions = [
    { id: "1", label: "Yes", value: "yes" },
    { id: "2", label: "No", value: "no" },
  ];
  const Deliveryoptions = [
    { id: "1", label: "Yes", value: "yes" },
    { id: "2", label: "No", value: "no" },
  ];

  // Blood group dropdown state
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

  // Province dropdown state
  const [provinceOpen, setProvinceOpen] = useState(false);
  const [provinceItems, setProvinceItems] = useState([
    { label: "Bagmati Province", value: "Bagmati" },
    { label: "Gandaki Province", value: "Gandaki" },
    { label: "Lumbini Province", value: "Lumbini" },
    { label: "Karnali Province", value: "Karnali" },
    { label: "Sudurpashchim Province", value: "Sudurpashchim" },
    { label: "Koshi Province", value: "Koshi" },
    { label: "Madhesh Province", value: "Madhesh" },
  ]);

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const selectedFreshValue = Freshoptions.find(
    (opt) => opt.id === selectedFreshId
  )?.value;
  const selectedDeliveryValue = Deliveryoptions.find(
    (opt) => opt.id === selectedDeliveryId
  )?.value;

  const isFresh = selectedFreshValue === "yes";
  const isDelivery = selectedDeliveryValue === "yes";

  const handleSubmit = () => {
    const emailRegex =
      /^[A-Za-z][A-Za-z0-9._%+-]*@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const phoneRegex = /^(98|97)\d{8}$/;

    console.log("Email to validate:", form.email);
    console.log("Pattern test result:", emailRegex.test(form.email));
    if (!emailRegex.test(form.email.trim())) {
      Alert.alert("Validation Error", "Enter a valid email address.");
      return;
    }

    if (
      !form.patientName ||
      !form.contact ||
      !form.bloodGroup ||
      !form.province ||
      !form.district ||
      !form.municipality ||
      !form.unitsRequired ||
      !form.email
    ) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    if (!phoneRegex.test(form.contact.trim())) {
      Alert.alert(
        "Validation Error",
        "Enter a valid 10-digit Nepali phone number."
      );
      return;
    }

    const units = parseInt(form.unitsRequired);
    if (isNaN(units) || units <= 0) {
      Alert.alert("Error", "Please enter a valid number of units required");
      return;
    }

    const requestData = {
      name: form.patientName,
      phone: form.contact,
      email: form.email,
      type: form.bloodGroup,
      location: `${form.province}, ${form.district}, ${form.municipality}`,
      amount: units,
      createdBy: user.id,
      isFresh, // ✅ now reliable
      isDelivery,
      latitude: requestCoord?.latitude ?? null,
      longitude: requestCoord?.longitude ?? null,
      hospital: form.hospital,
      bloodBank: bloodBank,
    };

    axios
      .post(`${API_URL}/requests/create`, requestData)
      .then((res) => {
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
        setSelectedFreshId("1");
        setSelectedDeliveryId("0");
      })
      .catch((e) => {
        Alert.alert("Error", e?.response?.data?.message || "Submission failed");
      });
  };
  const showMenu = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const handlePress = () => {
    setCoordinate({
      latitude: 27.6949,
      longitude: 85.2899,
    });
    navigation.navigate("Map", { from: "Request" });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Smart BloodLink Nepal</Text>
        <Text style={styles.subtitle}>Blood Request Form</Text>
      </View>
      <TouchableOpacity style={styles.menuButton} onPress={showMenu}>
        <Image
          source={require("../../assets/list.png")}
          style={styles.menuIcon}
        />
      </TouchableOpacity>
      <View style={styles.formContainer}>
        {/* Patient Name */}
        <Text style={styles.label}>Patient Name *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter patient name"
          value={form.patientName}
          onChangeText={(text) => handleChange("patientName", text)}
        />

        {/* Contact Details */}
        <Text style={styles.label}>Contact Number *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter contact number"
          keyboardType="phone-pad"
          value={form.contact}
          onChangeText={(text) => handleChange("contact", text)}
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter email"
          value={form.email}
          onChangeText={(text) => handleChange("email", text)}
        />

        {/* Blood Group Dropdown */}
        <Text style={styles.label}>Required Blood Group *</Text>
        <DropDownPicker
          open={bloodGroupOpen}
          value={form.bloodGroup}
          items={bloodGroupItems}
          setOpen={setBloodGroupOpen}
          setValue={(callback) => {
            const value = callback(form.bloodGroup);
            handleChange("bloodGroup", value);
          }}
          setItems={setBloodGroupItems}
          placeholder="Select blood group"
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownContainer}
          zIndex={3000}
          zIndexInverse={1000}
          listMode="SCROLLVIEW"
          dropDownDirection="AUTO"
        />

        {/* Number of Units Required */}
        <Text style={styles.label}>Number of Units Required *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter number of units (e.g., 1, 2, 3)"
          keyboardType="numeric"
          value={form.unitsRequired}
          onChangeText={(text) => handleChange("unitsRequired", text)}
        />
        {/* Location Section */}
        <Text style={styles.subtitle}>Location Information</Text>

        {/* Province Dropdown */}
        <Text style={styles.label}>Province *</Text>
        <DropDownPicker
          open={provinceOpen}
          value={form.province}
          items={provinceItems}
          setOpen={setProvinceOpen}
          setValue={(callback) => {
            const value = callback(form.province);
            handleChange("province", value);
          }}
          setItems={setProvinceItems}
          placeholder="Select province"
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownContainer}
          zIndex={2000}
          zIndexInverse={2000}
          listMode="SCROLLVIEW"
          dropDownDirection="AUTO"
        />

        {/* District */}
        <Text style={styles.label}>District *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter district"
          value={form.district}
          onChangeText={(text) => handleChange("district", text)}
        />

        {/* Municipality */}
        <Text style={styles.label}>Municipality *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter municipality"
          value={form.municipality}
          onChangeText={(text) => handleChange("municipality", text)}
        />

        <Text style={styles.label}>Do you need fresh Blood?</Text>
        <RadioGroup
          radioButtons={Freshoptions}
          selectedId={selectedFreshId}
          onPress={setSelectedFreshId}
          layout="row"
          containerStyle={{ marginVertical: 10 }}
          labelStyle={{ marginRight: 20, fontSize: 16 }}
        />
        {isFresh && (
          <>
            <Text style={styles.label}>Hospital Name:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Hospital Name"
              value={form.hospital}
              onChangeText={(text) => handleChange("hospital", text)}
            />
          </>
        )}
        {!isFresh && (
          <>
            <Text style={styles.label}>Do you need Delivery Service?</Text>
            <RadioGroup
              radioButtons={Deliveryoptions}
              selectedId={selectedDeliveryId}
              onPress={setSelectedDeliveryId}
              layout="row"
              containerStyle={{ marginVertical: 10 }}
              labelStyle={{ marginRight: 20, fontSize: 16 }}
            />
            <TouchableOpacity style={styles.submitButton} onPress={handlePress}>
              <Text style={styles.submitButtonText}>Your Location</Text>
            </TouchableOpacity>
          </>
        )}

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit Blood Request</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f7f6f7",
    flex: 1,
  },
  headerContainer: {
    marginTop: verticalScale(30),
    alignItems: "center",
    paddingVertical: verticalScale(25),
    paddingHorizontal: scale(20),
    borderBottomLeftRadius: moderateScale(20),
    borderBottomRightRadius: moderateScale(20),
  },
  formContainer: {
    marginTop: verticalScale(0),
    flex: 1,
    padding: scale(20),
  },
  title: {
    fontSize: moderateScale(24),
    fontWeight: "bold",
    color: "#c62828",
    textAlign: "center",
    marginBottom: verticalScale(5),
  },
  subtitle: {
    marginTop: verticalScale(30),
    fontSize: moderateScale(18),
    fontWeight: "600",
    color: "#c62828",
    textAlign: "center",
    opacity: 0.9,
  },
  menuButton: {
    position: "absolute",
    top: verticalScale(100),
    left: scale(20),
    backgroundColor: "#f7f6f7",
    borderRadius: moderateScale(25),
    padding: scale(10),
    shadowColor: "#000",
  },
  menuIcon: {
    width: scale(24),
    height: verticalScale(24),
    tintColor: "#c62828",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#b71c1c",
    paddingLeft: 5,
  },
  input: {
    borderWidth: 2,
    borderColor: "#ffcdd2",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    backgroundColor: "#ffffff",
    fontSize: 16,
    shadowColor: "#e57373",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  dropdown: {
    borderColor: "#ffcdd2",
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: "#ffffff",
    shadowColor: "#e57373",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  dropdownContainer: {
    borderColor: "#ffcdd2",
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: "#ffffff",
  },
  submitButton: {
    backgroundColor: "#d32f2f",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
    marginBottom: 30,
    shadowColor: "#b71c1c",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  submitButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
});

export default BloodRequestForm;

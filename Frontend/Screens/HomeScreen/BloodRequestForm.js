import React, { useContext, useState } from 'react';
import {
  View, Text, TextInput, ScrollView, Alert, StyleSheet,
  TouchableOpacity, KeyboardAvoidingView, Platform, Keyboard,
  TouchableWithoutFeedback
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Constants from 'expo-constants';
import axios from 'axios';
import { Context } from '../../Context/Context';

const BloodRequestForm = ({ navigation }) => {
  const { user } = useContext(Context);
  const API_URL = Constants.expoConfig.extra.apiUrl;

  const [form, setForm] = useState({
    patientName: '',
    contact: '',
    bloodGroup: '',
    province: '',
    district: '',
    municipality: '',
    unitsRequired: '',
    reason: '',
    createdBy: ''
  });

  // Dropdown states
  const [bloodGroupOpen, setBloodGroupOpen] = useState(false);
  const [bloodGroupItems, setBloodGroupItems] = useState([
    { label: 'A+', value: 'A+' }, { label: 'A-', value: 'A-' },
    { label: 'B+', value: 'B+' }, { label: 'B-', value: 'B-' },
    { label: 'AB+', value: 'AB+' }, { label: 'AB-', value: 'AB-' },
    { label: 'O+', value: 'O+' }, { label: 'O-', value: 'O-' },
  ]);

  const [provinceOpen, setProvinceOpen] = useState(false);
  const [provinceItems, setProvinceItems] = useState([
    { label: 'Bagmati Province', value: 'Bagmati' },
    { label: 'Gandaki Province', value: 'Gandaki' },
    { label: 'Lumbini Province', value: 'Lumbini' },
    { label: 'Karnali Province', value: 'Karnali' },
    { label: 'Sudurpashchim Province', value: 'Sudurpashchim' },
    { label: 'Koshi Province', value: 'Koshi' },
    { label: 'Madhesh Province', value: 'Madhesh' },
  ]);

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = () => {
    if (
      !form.patientName || !form.contact || !form.bloodGroup ||
      !form.province || !form.district || !form.municipality ||
      !form.unitsRequired
    ) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    const units = parseInt(form.unitsRequired);
    if (isNaN(units) || units <= 0) {
      Alert.alert('Error', 'Please enter a valid number of units required');
      return;
    }

    const requestData = {
      name: form.patientName,
      phone: form.contact,
      email: '', // optional
      type: form.bloodGroup,
      location: `${form.province}, ${form.district}, ${form.municipality}`,
      amount: units,
      createdBy: user.id,
    };

    axios.post(`${API_URL}/requests/create`, requestData)
      .then(() => {
        Alert.alert('Success', 'Blood request submitted successfully!');
        navigation.navigate("RequestScreen");
        setForm({
          patientName: '',
          contact: '',
          bloodGroup: '',
          province: '',
          district: '',
          municipality: '',
          unitsRequired: '',
          reason: '',
          createdBy: ''
        });
      })
      .catch(e => {
        Alert.alert('Error', e?.response?.data?.message || 'Submission failed');
      });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={styles.container}
          contentContainerStyle={{ paddingBottom: 80 }}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Blood Request Form</Text>

          <Text style={styles.label}>Patient Name *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter patient name"
            value={form.patientName}
            onChangeText={text => handleChange('patientName', text)}
          />

          <Text style={styles.label}>Contact Number *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter contact number"
            keyboardType="phone-pad"
            value={form.contact}
            onChangeText={text => handleChange('contact', text)}
          />

          <Text style={styles.label}>Required Blood Group *</Text>
          <DropDownPicker
            open={bloodGroupOpen}
            value={form.bloodGroup}
            items={bloodGroupItems}
            setOpen={setBloodGroupOpen}
            setValue={(callback) => {
              const value = callback(form.bloodGroup);
              handleChange('bloodGroup', value);
            }}
            setItems={setBloodGroupItems}
            placeholder="Select blood group"
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
            zIndex={3000}
            zIndexInverse={1000}
          />

          <Text style={styles.label}>Number of Units Required *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter number of units"
            keyboardType="numeric"
            value={form.unitsRequired}
            onChangeText={text => handleChange('unitsRequired', text)}
          />

          <Text style={styles.subtitle}>Location Information</Text>

          <Text style={styles.label}>Province *</Text>
          <DropDownPicker
            open={provinceOpen}
            value={form.province}
            items={provinceItems}
            setOpen={setProvinceOpen}
            setValue={(callback) => {
              const value = callback(form.province);
              handleChange('province', value);
            }}
            setItems={setProvinceItems}
            placeholder="Select province"
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
            zIndex={2000}
            zIndexInverse={2000}
          />

          <Text style={styles.label}>District *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter district"
            value={form.district}
            onChangeText={text => handleChange('district', text)}
          />

          <Text style={styles.label}>Municipality *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter municipality"
            value={form.municipality}
            onChangeText={text => handleChange('municipality', text)}
          />

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit Blood Request</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fef7f7',
    flex: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
    color: '#c62828',
    textShadowColor: 'rgba(198, 40, 40, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 15,
    color: '#d32f2f',
    paddingLeft: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#b71c1c',
    paddingLeft: 5,
  },
  input: {
    borderWidth: 2,
    borderColor: '#ffcdd2',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#ffffff',
    fontSize: 16,
    shadowColor: '#e57373',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  dropdown: {
    borderColor: '#ffcdd2',
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: '#ffffff',
    shadowColor: '#e57373',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  dropdownContainer: {
    borderColor: '#ffcdd2',
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: '#ffffff',
  },
  submitButton: {
    backgroundColor: '#d32f2f',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
    marginBottom: 30,
    shadowColor: '#b71c1c',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});

export default BloodRequestForm;

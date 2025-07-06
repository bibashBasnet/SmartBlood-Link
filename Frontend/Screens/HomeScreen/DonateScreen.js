import React, { useState, useEffect, useContext } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ScrollView, Image, Alert,
  Button
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import logo from '../../assets/logo.png'

import Constants from 'expo-constants';
import axios from 'axios';
import { Context } from '../../Context/Context';
import { DrawerActions } from '@react-navigation/native';

const API_URL = Constants.expoConfig.extra.apiUrl;

export default function BloodDonationForm({ navigation }) {
  const [checking, setChecking] = useState(true);
  const { donate, setDonate, user, bloodBank, setIsForm, coordinate } = useContext(Context);
  const [trigger, setTrigger] = useState(false)

  useEffect(() => {
    setIsForm(true)
  }, []);

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
  const [weight, setWeight] = useState('50');
  const [healthStatus, setHealthStatus] = useState('ok');
  const [lastDonationDate, setLastDonationDate] = useState(new Date());
  const [showLastDonationPicker, setShowLastDonationPicker] = useState(false);
  const [preferredDonationDate, setPreferredDonationDate] = useState(new Date());
  const [showPreferredDonationPicker, setShowPreferredDonationPicker] = useState(false);
  const [allergies, setAllergies] = useState('None');
  const [emergencyContact, setEmergencyContact] = useState('90000000000000');
  const [createdBy, setCreatedBy] = useState(user.id);

  useEffect(() => {
    setFullName(user.name || '');
    setAgeOrDOB(`${user.age}` || '');
    setGender(user.gender || '');
    setBloodGroup(user.bloodType || '');
    setContactNumber(user.phone || '');
    setEmail(user.email || '');
    setAddress(user.address || '');
    setCreatedBy(user.id);
  }, [user]);

  const onSubmit = async () => {
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
      longitude: coordinate.longitude
    };
    try {
      const response = await axios.post(`${API_URL}/donate/create`, payload);
      Alert.alert("Success", "Donation request submitted!");
      const res = await axios.get(`${API_URL}/donate/get`, {
        params: { createdBy: user.id }
      });
      setDonate(res.data);
      navigation.replace("DonateStatusScreen");
    } catch (e) {
      Alert.alert("Error", e?.response?.data?.message || e.message || "Something went wrong");
    }
  };

  const showMenu = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };


  const handlePress= () => {
    navigation.navigate("Map")
  }

  if (!trigger) {
    return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.title}>Smart BloodLink Nepal</Text>
        <Text style={styles.subtitle}>Blood Donation Form</Text>
      </View>

      <TouchableOpacity style={styles.menuButton} onPress={showMenu}>
        <Image source={require('../../assets/list.png')} style={styles.menuIcon} />
      </TouchableOpacity>
    
      <ScrollView style={styles.formContainer}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        
        <Text style={styles.label}>Full Name *</Text>
        <TextInput 
          style={styles.input} 
          value={fullName} 
          onChangeText={setFullName} 
          placeholder="Enter full name" 
        />

        <Text style={styles.label}>Age or Date of Birth *</Text>
        <TextInput
          style={styles.input}
          value={ageOrDOB}
          onChangeText={setAgeOrDOB}
          placeholder="Enter age or leave empty to pick DOB"
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.dateButton} onPress={() => setShowDOBPicker(true)}>
          <Text style={styles.dateText}>Pick Date of Birth</Text>
        </TouchableOpacity>
        {showDOBPicker && (
          <DateTimePicker
            value={dob}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDOBPicker(false);
              if (selectedDate) setDOB(selectedDate);
            }}
            maximumDate={new Date()}
          />
        )}

        <Text style={styles.label}>Gender *</Text>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={gender} onValueChange={setGender} style={styles.picker}>
            <Picker.Item label="Select Gender" value="" />
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />
            <Picker.Item label="Other" value="Other" />
          </Picker>
        </View>

        <Text style={styles.label}>Blood Group *</Text>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={bloodGroup} onValueChange={setBloodGroup} style={styles.picker}>
            <Picker.Item label="Select Blood Group" value="" />
            <Picker.Item label="A+" value="A+" />
            <Picker.Item label="A-" value="A-" />
            <Picker.Item label="B+" value="B+" />
            <Picker.Item label="B-" value="B-" />
            <Picker.Item label="AB+" value="AB+" />
            <Picker.Item label="AB-" value="AB-" />
            <Picker.Item label="O+" value="O+" />
            <Picker.Item label="O-" value="O-" />
          </Picker>
        </View>

        <Text style={styles.sectionTitle}>Contact Information</Text>

        <Text style={styles.label}>Contact Number *</Text>
        <TextInput
          style={styles.input}
          value={contactNumber}
          onChangeText={setContactNumber}
          placeholder="Enter contact number"
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Email Address *</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter email"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Address or Location (City, State) *</Text>
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={setAddress}
          placeholder="Enter address or location"
        />
        <TouchableOpacity style={styles.submitButton} onPress={handlePress}><Text style={styles.submitButtonText}>Your Location</Text></TouchableOpacity>

        <Text style={styles.sectionTitle}>Health Information</Text>

        <Text style={styles.label}>Weight (kg) *</Text>
        <TextInput
          style={styles.input}
          value={weight}
          onChangeText={setWeight}
          placeholder="Enter weight"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Health Status / Medical History *</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={healthStatus}
          onChangeText={setHealthStatus}
          placeholder="Any recent illness or chronic diseases"
          multiline
          numberOfLines={4}
        />

        <Text style={styles.label}>Last Donation Date (if any)</Text>
        <TouchableOpacity style={styles.dateButton} onPress={() => setShowLastDonationPicker(true)}>
          <Text style={styles.dateText}>{lastDonationDate.toDateString()}</Text>
        </TouchableOpacity>
        {showLastDonationPicker && (
          <DateTimePicker
            value={lastDonationDate}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowLastDonationPicker(false);
              if (selectedDate) setLastDonationDate(selectedDate);
            }}
            maximumDate={new Date()}
          />
        )}

        <Text style={styles.label}>Preferred Donation Date and Time</Text>
        <TouchableOpacity style={styles.dateButton} onPress={() => setShowPreferredDonationPicker(true)}>
          <Text style={styles.dateText}>{preferredDonationDate.toDateString()}</Text>
        </TouchableOpacity>
        {showPreferredDonationPicker && (
          <DateTimePicker
            value={preferredDonationDate}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowPreferredDonationPicker(false);
              if (selectedDate) setPreferredDonationDate(selectedDate);
            }}
            minimumDate={new Date()}
          />
        )}

        <Text style={styles.label}>Any Allergies or Medication</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={allergies}
          onChangeText={setAllergies}
          placeholder="List any allergies or medication"
          multiline
          numberOfLines={4}
        />

        <Text style={styles.label}>Emergency Contact Information (optional)</Text>
        <TextInput
          style={styles.input}
          value={emergencyContact}
          onChangeText={setEmergencyContact}
          placeholder="Emergency contact number"
          keyboardType="phone-pad"
        />

        <TouchableOpacity style={styles.submitButton} onPress={onSubmit}>
          <Text style={styles.submitButtonText}>Submit Donation Request</Text>
        </TouchableOpacity>
      </ScrollView>
    </ScrollView>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fef7f7',
  },
  headerContainer: {
    alignItems: 'center',
    backgroundColor: '#c62828',
    paddingVertical: 25,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    textAlign: 'center',
    opacity: 0.9,
  },
  menuButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: '#ffffff',
    borderRadius: 25,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 1000,
  },
  menuIcon: {
    width: 24,
    height: 24,
    tintColor: '#c62828',
  },
  formContainer: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
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
    textAlignVertical: 'top',
  },
  pickerContainer: {
    borderWidth: 2,
    borderColor: '#ffcdd2',
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: '#ffffff',
    shadowColor: '#e57373',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  picker: {
    height: 50,
    color: '#333333',
  },
  dateButton: {
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ffcdd2',
    marginBottom: 15,
    shadowColor: '#e57373',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  dateText: {
    fontSize: 16,
    color: '#c62828',
    fontWeight: '500',
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: '#d32f2f',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
    marginBottom: 30,
    shadowColor: '#b71c1c',
    shadowOffset: {
      width: 0,
      height: 4,
    },
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

import React, { useState, useEffect, useContext } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ScrollView, Image, Alert,
  Button
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import logo from '../../assets/logo.png'
import Constants from 'expo-constants';
import axios from 'axios';
import { Context } from '../../Context/Context';
import { CommonActions, DrawerActions } from '@react-navigation/native';
import { moderateScale, scale, verticalScale } from '../../utils/responsive';

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
  const [emergencyContact, setEmergencyContact] = useState('9867504938');
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

  const emailRegex = /^[A-Za-z][A-Za-z0-9._%+-]*@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  const phoneRegex = /^(98|97)\d{8}$/;

  if (!fullName ||!weight || !healthStatus ||  !ageOrDOB ||!gender || !email || !contactNumber || !address || !bloodGroup || !gender) {
    Alert.alert('Validation Error', 'Please fill all required fields.');
    return;
  }

    if (!emailRegex.test(email.trim())) {
      Alert.alert('Validation Error', 'Enter a valid email address.');
      return;
    }

    if (!phoneRegex.test(contactNumber.trim())) {
      Alert.alert('Validation Error', 'Enter a valid 10-digit Nepali phone number.');
      return;
    }
    if (!phoneRegex.test(emergencyContact.trim())) {
      Alert.alert('Validation Error', 'Enter a valid 10-digit Nepali phone number.');
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
      longitude: coordinate.longitude
    };
    try {
      const response = await axios.post(`${API_URL}/donate/create`, payload);
      Alert.alert("Success", "Donation request submitted!");
      const res = await axios.get(`${API_URL}/donate/get`, {
        params: { createdBy: user.id }
      });
      setDonate(res.data);
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: "DonateStatusScreen"}]
        })
      )
    } catch (e) {
      Alert.alert("Error", e?.response?.data?.message || e.message || "Something went wrong");
    }
  };

  const showMenu = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };


  const handlePress= () => {
    navigation.navigate("Map", {from: "Donate"})
  }

  if (!trigger) {
    return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
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
    marginTop: verticalScale(30),
    alignItems: 'center',
    paddingVertical: verticalScale(25),
    paddingHorizontal: scale(20),
    borderBottomLeftRadius: moderateScale(20),
    borderBottomRightRadius: moderateScale(20),
  },
  title: {
    fontSize: moderateScale(24),
    fontWeight: 'bold',
    color: '#c62828',
    textAlign: 'center',
    marginBottom: verticalScale(5),
  },
  subtitle: {
    marginTop: verticalScale(30),
    fontSize: moderateScale(18),
    fontWeight: '600',
    color: '#c62828',
    textAlign: 'center',
    opacity: 0.9,
  },
  menuButton: {
    position: 'absolute',
    top: verticalScale(50),
    left: scale(20),
    backgroundColor: '#ffffff',
    borderRadius: moderateScale(25),
    padding: scale(10),
    shadowColor: '#000',
  },
  menuIcon: {
    width: scale(24),
    height: verticalScale(24),
    tintColor: '#c62828',
  },
  formContainer: {
    marginTop: verticalScale(0),
    flex: 1,
    padding: scale(20),
  },
  sectionTitle: {
    fontSize: moderateScale(18),
    fontWeight: '600',
    marginTop: verticalScale(0),
    marginBottom: verticalScale(15),
    color: '#d32f2f',
    paddingLeft: scale(5),
  },
  label: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    marginBottom: verticalScale(8),
    color: '#b71c1c',
    paddingLeft: scale(5),
  },
  input: {
    borderWidth: 2,
    borderColor: '#ffcdd2',
    borderRadius: moderateScale(10),
    padding: scale(15),
    marginBottom: verticalScale(15),
    backgroundColor: '#ffffff',
    fontSize: moderateScale(16),
    shadowColor: '#e57373',
    shadowOffset: {
      width: 0,
      height: verticalScale(2),
    },
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(3),
    elevation: 2,
  },
  textArea: {
    height: verticalScale(100),
    textAlignVertical: 'top',
  },
  pickerContainer: {
    borderWidth: 2,
    borderColor: '#ffcdd2',
    borderRadius: moderateScale(10),
    marginBottom: verticalScale(15),
    backgroundColor: '#ffffff',
    shadowColor: '#e57373',
    shadowOffset: {
      width: 0,
      height: verticalScale(2),
    },
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(3),
    elevation: 2,
  },
  picker: {
    height: verticalScale(50),
    color: '#333333',
  },
  dateButton: {
    padding: scale(15),
    backgroundColor: '#ffffff',
    borderRadius: moderateScale(10),
    borderWidth: 2,
    borderColor: '#ffcdd2',
    marginBottom: verticalScale(15),
    shadowColor: '#e57373',
    shadowOffset: {
      width: 0,
      height: verticalScale(2),
    },
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(3),
    elevation: 2,
  },
  dateText: {
    fontSize: moderateScale(16),
    color: '#c62828',
    fontWeight: '500',
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: '#d32f2f',
    paddingVertical: verticalScale(15),
    paddingHorizontal: scale(30),
    borderRadius: moderateScale(25),
    marginTop: verticalScale(20),
    marginBottom: verticalScale(30),
    shadowColor: '#b71c1c',
    shadowOffset: {
      width: 0,
      height: verticalScale(4),
    },
    shadowOpacity: 0.3,
    shadowRadius: moderateScale(5),
    elevation: 5,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: scale(1),
  },
});


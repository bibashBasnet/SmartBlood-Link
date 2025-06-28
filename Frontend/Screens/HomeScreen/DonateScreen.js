import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Switch, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { styles } from './DonationScreenStyle';

export default function BloodDonationForm() {
  const [fullName, setFullName] = useState('');
  const [ageOrDOB, setAgeOrDOB] = useState('');
  const [showDOBPicker, setShowDOBPicker] = useState(false);
  const [dob, setDOB] = useState(new Date());
  const [gender, setGender] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [weight, setWeight] = useState('');
  const [healthStatus, setHealthStatus] = useState('');
  const [lastDonationDate, setLastDonationDate] = useState(new Date());
  const [showLastDonationPicker, setShowLastDonationPicker] = useState(false);
  const [preferredDonationDate, setPreferredDonationDate] = useState(new Date());
  const [showPreferredDonationPicker, setShowPreferredDonationPicker] = useState(false);
  const [allergies, setAllergies] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [consent, setConsent] = useState(false);

  const onSubmit = () => {
    if (!consent) {
      Alert.alert('Consent Required', 'You must agree to the terms and conditions.');
      return;
    }
    // For now just show an alert with data summary
    Alert.alert('Form Submitted', 
      `Name: ${fullName}
Age/DOB: ${ageOrDOB || dob.toDateString()}
Gender: ${gender}
Blood Group: ${bloodGroup}
Contact: ${contactNumber}
Email: ${email}
Address: ${address}
Weight: ${weight}
Health: ${healthStatus}
Last Donation: ${lastDonationDate.toDateString()}
Preferred Donation: ${preferredDonationDate.toDateString()}
Allergies/Medication: ${allergies}
Emergency Contact: ${emergencyContact}
Consent: ${consent ? 'Yes' : 'No'}`
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Full Name</Text>
      <TextInput style={styles.input} value={fullName} onChangeText={setFullName} placeholder="Enter full name" />

      <Text style={styles.label}>Age or Date of Birth</Text>
      <TextInput
        style={styles.input}
        value={ageOrDOB}
        onChangeText={setAgeOrDOB}
        placeholder="Enter age or leave empty to pick DOB"
        keyboardType="numeric"
      />
      <Button title="Pick Date of Birth" onPress={() => setShowDOBPicker(true)} />
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

      <Text style={styles.label}>Gender</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={gender} onValueChange={setGender}>
          <Picker.Item label="Select Gender" value="" />
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
      </View>

      <Text style={styles.label}>Blood Group</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={bloodGroup} onValueChange={setBloodGroup}>
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

      <Text style={styles.label}>Contact Number</Text>
      <TextInput
        style={styles.input}
        value={contactNumber}
        onChangeText={setContactNumber}
        placeholder="Enter contact number"
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>Email Address</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Enter email"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Address or Location (City, State)</Text>
      <TextInput
        style={styles.input}
        value={address}
        onChangeText={setAddress}
        placeholder="Enter address or location"
      />

      <Text style={styles.label}>Weight (kg)</Text>
      <TextInput
        style={styles.input}
        value={weight}
        onChangeText={setWeight}
        placeholder="Enter weight"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Health Status / Medical History</Text>
      <TextInput
        style={styles.input}
        value={healthStatus}
        onChangeText={setHealthStatus}
        placeholder="Any recent illness or chronic diseases"
        multiline
      />

      <Text style={styles.label}>Last Donation Date (if any)</Text>
      <Button title={lastDonationDate.toDateString()} onPress={() => setShowLastDonationPicker(true)} />
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
      <Button title={preferredDonationDate.toDateString()} onPress={() => setShowPreferredDonationPicker(true)} />
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
        style={styles.input}
        value={allergies}
        onChangeText={setAllergies}
        placeholder="List any allergies or medication"
        multiline
      />

      <Text style={styles.label}>Emergency Contact Information (optional)</Text>
      <TextInput
        style={styles.input}
        value={emergencyContact}
        onChangeText={setEmergencyContact}
        placeholder="Emergency contact number"
        keyboardType="phone-pad"
      />

      <View style={styles.consentContainer}>
        <Switch value={consent} onValueChange={setConsent} />
        <Text style={{ marginLeft: 8 }}>
          I agree to the terms and conditions / eligibility criteria
        </Text>
      </View>

      <Button title="Submit" onPress={onSubmit} />
    </ScrollView>
  );
}


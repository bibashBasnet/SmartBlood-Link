import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ScrollView, Image, Alert
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import logo from '../assets/logo.jpg'; // adjust the path as needed

const RegistrationScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [userType, setUserType] = useState('');

  const [permAddress, setPermAddress] = useState({
    province: '', district: '', ward: '', municipality: '',
  });

  const [tempAddress, setTempAddress] = useState({
    province: '', district: '', ward: '', municipality: '',
  });

  const [sameAddress, setSameAddress] = useState(false);

  const [nidCards, setNidCards] = useState([]);
  const [driverLicenses, setDriverLicenses] = useState([]);

  const provinces = [
    'Province 1',
    'Madhesh Pradesh',
    'Bagmati Province',
    'Gandaki Province',
    'Lumbini Province',
    'Karnali Province',
    'Sudurpashchim Province',
  ];

  useEffect(() => {
    if (sameAddress) {
      setTempAddress({ ...permAddress });
    }
  }, [permAddress, sameAddress]);

  const pickImages = async (setter, existingImages) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
    });

    if (!result.canceled) {
      const newImage = result.assets[0]?.uri;
      if (newImage) {
        let newImages = [...existingImages, newImage];
        if (newImages.length > 2) {
          newImages = newImages.slice(0, 2);
        }
        setter(newImages);
      }
    }
  };

  const handleRegister = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!name || !email || !phone || !password || !bloodGroup || !userType) {
      Alert.alert('Validation Error', 'Please fill all required fields.');
      return;
    }

    if (!emailRegex.test(email)) {
      Alert.alert('Validation Error', 'Enter a valid email address.');
      return;
    }

    if (!phoneRegex.test(phone)) {
      Alert.alert('Validation Error', 'Enter a valid 10-digit phone number.');
      return;
    }

    if (nidCards.length === 0) {
      Alert.alert('Validation Error', 'Please upload at least one NID image.');
      return;
    }

    if (userType === 'driver' && driverLicenses.length === 0) {
      Alert.alert('Validation Error', 'Driver License upload is required for Drivers.');
      return;
    }

    Alert.alert('Success', 'Registered successfully!');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Logo and Title */}
      <View style={styles.headerContainer}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.organizationName}>Smart BloodLink Nepal</Text>
      </View>
      <Text style={styles.title}>Registration Form</Text>

      <TextInput style={styles.input} placeholder="Full Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Phone Number" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
      <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />

      <Text style={styles.label}>Blood Group</Text>
      <Picker selectedValue={bloodGroup} style={styles.picker} onValueChange={setBloodGroup}>
        <Picker.Item label="Select Blood Group" value="" />
        {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map((group) => (
          <Picker.Item key={group} label={group} value={group} />
        ))}
      </Picker>

      <Text style={styles.label}>User Type</Text>
      <Picker selectedValue={userType} style={styles.picker} onValueChange={setUserType}>
        <Picker.Item label="Select User Type" value="" />
        <Picker.Item label="Donor" value="donor" />
        <Picker.Item label="Recipient" value="recipient" />
        <Picker.Item label="Driver" value="driver" />
      </Picker>

      {/* Permanent Address */}
      <Text style={styles.sectionTitle}>Permanent Address</Text>
      <Picker
        selectedValue={permAddress.province}
        style={styles.picker}
        onValueChange={(value) => setPermAddress({ ...permAddress, province: value })}
      >
        <Picker.Item label="Select Province" value="" />
        {provinces.map((province) => (
          <Picker.Item key={province} label={province} value={province} />
        ))}
      </Picker>

      {['district', 'ward', 'municipality'].map((field) => (
        <TextInput
          key={field}
          style={styles.input}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          value={permAddress[field]}
          onChangeText={(text) => setPermAddress({ ...permAddress, [field]: text })}
        />
      ))}

      {/* Temporary Address */}
      <Text style={styles.sectionTitle}>Temporary Address</Text>
      <TouchableOpacity
        onPress={() => {
          const newState = !sameAddress;
          setSameAddress(newState);
          if (newState) setTempAddress({ ...permAddress });
        }}
        style={styles.checkboxContainer}
      >
        <Text style={styles.checkboxLabel}>
          {sameAddress ? '✓ ' : '☐ '}Same as Permanent Address
        </Text>
      </TouchableOpacity>

      <Picker
        selectedValue={tempAddress.province}
        enabled={!sameAddress}
        style={styles.picker}
        onValueChange={(value) => setTempAddress({ ...tempAddress, province: value })}
      >
        <Picker.Item label="Select Province" value="" />
        {provinces.map((province) => (
          <Picker.Item key={province} label={province} value={province} />
        ))}
      </Picker>

      {['district', 'ward', 'municipality'].map((field) => (
        <TextInput
          key={field}
          style={styles.input}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          value={tempAddress[field]}
          onChangeText={(text) => setTempAddress({ ...tempAddress, [field]: text })}
          editable={!sameAddress}
        />
      ))}

      {/* NID Upload */}
      <Text style={styles.sectionTitle}>NID Card (max 2 images)</Text>
      <TouchableOpacity style={styles.uploadButton} onPress={() => pickImages(setNidCards, nidCards)}>
        <Text>Upload NID Images</Text>
      </TouchableOpacity>
      <View style={styles.imagePreviewContainer}>
        {nidCards.map((uri, i) => (
          <Image key={i} source={{ uri }} style={styles.imagePreview} />
        ))}
      </View>

      {/* Driver License Upload */}
      {userType === 'driver' && (
        <>
          <Text style={styles.sectionTitle}>Driver License (max 2 images)</Text>
          <TouchableOpacity style={styles.uploadButton} onPress={() => pickImages(setDriverLicenses, driverLicenses)}>
            <Text>Upload Driver License Images</Text>
          </TouchableOpacity>
          <View style={styles.imagePreviewContainer}>
            {driverLicenses.map((uri, i) => (
              <Image key={i} source={{ uri }} style={styles.imagePreview} />
            ))}
          </View>
        </>
      )}

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default RegistrationScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25, // half of width/height to make it circular
    marginRight: 10,
    resizeMode: 'cover',
  },
  organizationName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e53935',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
    color: '#e53935',
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  label: {
    fontWeight: '600',
    marginBottom: 5,
    marginTop: 10,
  },
  picker: {
    backgroundColor: '#fff',
    marginBottom: 15,
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 15,
    marginBottom: 8,
  },
  checkboxContainer: {
    marginBottom: 10,
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#333',
  },
  uploadButton: {
    backgroundColor: '#ddd',
    padding: 12,
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 10,
  },
  imagePreviewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#e53935',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

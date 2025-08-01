import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ScrollView, Image, Alert
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import logo from '../../assets/logo.png'
import { styles } from './RegistrationScreenStyle';

import Constants from 'expo-constants';
import axios from 'axios';
import { verticalScale } from '../../utils/responsive';
const API_URL = Constants.expoConfig.extra.apiUrl;


const RegistrationScreen = ({navigation}) => {

  const [showPassword, setShowPassword] = useState(false)

  const [name, setName] = useState('test');
  const [email, setEmail] = useState('test32@gmail.com');
  const [phone, setPhone] = useState('9864537289');
  const [password, setPassword] = useState('test123');
  const [bloodGroup, setBloodGroup] = useState('A+');
  const [userType, setUserType] = useState('0');
  const [username, setUsername] = useState('test')
  const [age, setAge] = useState('34')
  const [gender, setGender] = useState('Male')

  const [address, setAddress] = useState({
    province: 'Bagmati Province', district: 'dang', ward: '5', municipality: 'ghorahi',
  });

  const [driverLicenses, setDriverLicenses] = useState([]);
  const [userProfile, setUserProfile] = useState(null)

  const provinces = [
    'Province 1',
    'Madhesh Pradesh',
    'Bagmati Province',
    'Gandaki Province',
    'Lumbini Province',
    'Karnali Province',
    'Sudurpashchim Province',
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
        if (newImages.length > 2) {
          newImages = newImages.slice(0, 2);
        }
        setter(newImages);
      }
    }
  };

  const pickProfileImage = async () => {
    console.log("Pick image function called");
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'We need media permissions to upload images.');
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
    });

    if (!result.canceled) {
      const uri = result.assets[0]?.uri;
      if (uri) {
        setUserProfile(uri); // Only one image
      }
    }
  };


 const handleRegister = async () => {
    const emailRegex = /^[A-Za-z][A-Za-z0-9._%+-]*@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const phoneRegex = /^(98|97)\d{8}$/;

    if (!name ||!username || !age || !email || !phone || !password || !bloodGroup || userType === "" || !gender) {
      Alert.alert('Validation Error', 'Please fill all required fields.');
      return;
    }

    if (!emailRegex.test(email.trim())) {
      Alert.alert('Validation Error', 'Enter a valid email address.');
      return;
    }

    if (!phoneRegex.test(phone.trim())) {
      Alert.alert('Validation Error', 'Enter a valid 10-digit Nepali phone number.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Validation Error', 'Password must be at least 6 characters.');
      return;
    }

    if (userType === 1  && driverLicenses.length === 0) {
      Alert.alert('Validation Error', 'Driver License upload is required for Drivers.');
      return;
    }

    const formData = new FormData()
    formData.append('name', name)
    formData.append('email', email)
    formData.append('phone', phone)
    formData.append('age', age)
    formData.append('gender', gender)
    formData.append('bloodType', bloodGroup)
    formData.append('username', username)
    formData.append('password', password)
    formData.append('userType', parseInt(userType))
    formData.append('address', `${address.province}, ${address.district}, ${address.ward}, ${address.municipality}`)
    if(userProfile){
      const filename = userProfile.split('/').pop()
      formData.append('profileImage', {
        uri: userProfile,
        name: filename,
        type: 'image/jpeg' 
      })
    }
    // if(parseInt(userType) === 1){
    //   driverLicenses.forEach((url, index) => {
    //     const filename = url.split('/').pop()
    //     formData.append('driverLicenses', {
    //       uri,
    //       name: filename,
    //       type: 'image/jpeg'
    //     })
    //   })
    // }



  try {
      const res = await axios.post(`${API_URL}/users/createUser`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
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
    <ScrollView contentContainerStyle={[styles.container]}>

      {/* Logo and Title */}
      <View style={[styles.headerContainer]}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.organizationName}>Smart BloodLink Nepal</Text>
      </View>
      <Text style={styles.title}>Registration Form</Text>

      <ScrollView style={{flex: 1, maxHeight: verticalScale(650)}}>
        <TextInput style={styles.input} placeholder="Full Name" value={name} onChangeText={setName} />
        <TextInput style={styles.input} placeholder="Age" value={age} onChangeText={setAge}/>
        <TextInput style={styles.input} placeholder="Phone Number" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
        <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />

        <Text style={styles.label}>Gender</Text>
        <Picker selectedValue={gender} style={styles.picker} onValueChange={setGender}>
          <Picker.Item label="Select Gender" value="" />
          {['Male', 'Female', 'Other'].map((gender) => (
            <Picker.Item key={gender} label={gender} value={gender} />
          ))}
        </Picker>
        <TextInput style={styles.input} placeholder="Username" value={username} onChangeText={setUsername} keyboardType="default" />
        <View style = {styles.inputContainer}>
          <TextInput style={[styles.input]} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry = {!showPassword} />
          <TouchableOpacity
            style={styles.toggleButton}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Text style={styles.toggleText}>
              {showPassword ? 'Hide' : 'Show'}
            </Text>
          </TouchableOpacity>
        </View>
        


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
          <Picker.Item label="Normal User" value = "0" />
          <Picker.Item label="Driver" value= "1" />
        </Picker>

        {/* Permanent Address */}
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

        {['district', 'ward', 'municipality'].map((field) => (
          <TextInput
            key={field}
            style={styles.input}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={address[field]}
            onChangeText={(text) => setAddress({ ...address, [field]: text })}
          />
        ))}

        {/* User Profile file upload */}
          <>
            <Text style={styles.sectionTitle}>Profile picture</Text>
            <TouchableOpacity style={styles.uploadButton} onPress={pickProfileImage}>
              <Text>Upload Profile picture</Text>
            </TouchableOpacity>
            <View style={styles.imagePreviewContainer}>
              {userProfile && (
                <Image source={{uri: userProfile}} style={styles.imagePreview}/>
              )}
            </View>
          </>

        {/* Driver License Upload */}
        {userType === '1' && (
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
    </ScrollView>
  );
}

export default RegistrationScreen;
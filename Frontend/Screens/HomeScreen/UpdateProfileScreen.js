import React, { useState, useEffect, useContext } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ScrollView, Image, Alert
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import logo from '../../assets/logo.png'
import { styles } from '../RegistrationScreen/RegistrationScreenStyle';
import { Context } from '../../Context/Context';
import axios from 'axios';
import Constants from 'expo-constants'
import { scale, verticalScale } from '../../utils/responsive';


const UpdateProfileScreen = ({navigation}) => {
  const API_URL = Constants.expoConfig.extra.apiUrl;
  const {user, setUser} = useContext(Context);

      const [name, setName] = useState(user.name);
      const [email, setEmail] = useState(user.email);
      const [phone, setPhone] = useState(user.phone);
      const [bloodGroup, setBloodGroup] = useState(user.bloodType);
      const [age, setAge] = useState(`${user.age}`)
      const [gender, setGender] = useState(user.gender)

    
      const addressPart = user.address.split(",")

      const [address, setAddress] = useState({
        province: addressPart[0] , district: addressPart[1], ward: addressPart[2], municipality: addressPart[3],
      });

        const provinces = [
    'Province 1',
    'Madhesh Pradesh',
    'Bagmati Province',
    'Gandaki Province',
    'Lumbini Province',
    'Karnali Province',
    'Sudurpashchim Province',
  ];
    
  const [driverLicenses, setDriverLicenses] = useState([]);

  const handlerUpdate =()=>{
    const payload = {
      name, 
      email,
      phone,
      bloodGroup,
      age: parseInt(age),
      gender,
      address: `${address.province},${address.district},${address.ward},${address.municipality}`
    }

    axios.patch(`${API_URL}/users/updateUser/${user.id}`, payload)
    .then(res => {
      Alert.alert("Success", "Profile Has been updated")
      setUser(res.data)
      navigation.goBack()
    })
    .catch(err => {Alert.alert("Error", "Profile has not been updated")})
  }
  return (
    <ScrollView contentContainerStyle={[styles.container, {marginTop: verticalScale(30)}]}>

      {/* Logo and Title */}
      <View style={styles.headerContainer}>
        <Text style={[styles.organizationName, {marginLeft: scale(50)}]}>Smart BloodLink Nepal</Text>
      </View>
      <Text style={styles.title}>Update Information</Text>

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
      
        <Text style={styles.label}>Blood Group</Text>
        <Picker selectedValue={bloodGroup} style={styles.picker} onValueChange={setBloodGroup}>
          <Picker.Item label="Select Blood Group" value="" />
          {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map((group) => (
            <Picker.Item key={group} label={group} value={group} />
          ))}
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
        <TouchableOpacity style={styles.button} onPress={handlerUpdate}>
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
      </ScrollView>
    </ScrollView>
  );
}

export default UpdateProfileScreen

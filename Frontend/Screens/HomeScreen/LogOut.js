import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';



const LogOut = ({ navigation }) => {
  const handleLogout = async () => {
    await AsyncStorage.removeItem("authToken")
    await AsyncStorage.removeItem("userInfo")
    navigation.navigate("LandingPage")
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Are you sure you want to log out?</Text>

      <TouchableOpacity style={styles.buttonYes} onPress={handleLogout}>
        <Text style={styles.buttonTextYes}>Yes</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonNo} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonTextNo}>No</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f6f7',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
  },
  buttonYes: {
    backgroundColor: '#e53935',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginVertical: 10,
    width: 200,
    alignItems: 'center',
    elevation: 3,
  },
  buttonTextYes: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonNo: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#e53935',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
    width: 200,
    alignItems: 'center',
    marginVertical: 10,
    elevation: 2,
  },
  buttonTextNo: {
    color: '#e53935',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LogOut;

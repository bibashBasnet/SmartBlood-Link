import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,

} from 'react-native';
import axios from 'axios';
import { styles } from '../Styles';

import Constants from 'expo-constants';
import { Context } from '../Context/Context';

const API_URL = Constants.expoConfig.extra.apiUrl;





const LoginScreen = ({ navigation }) => {

  const [showPassword, setShowPassword] = useState(false)

  const {setUser} = useContext(Context);

  const [username, setUsername] = useState('test');
  const [password, setPassword] = useState('test123');

const handleLogin = () => {
  if (!username.trim() || !password.trim()) {
    alert("Please enter both username and password.");
    return;
  }

  axios.post(`${API_URL}/users/login`, {
    username: username.trim(),
    password: password.trim()
  })
  .then(res => {
    if (res.status === 200 && res.data) {
      const user = res.data;
      setUser(user);
      navigation.navigate("Main");
    } else {
      alert("Invalid response from server.");
    }
  })
  .catch(err => {
    alert("Login failed", err.response?.data?.message || err.message || "Unknown error");
  });
};


  const handleForgotPassword = () => {
    console.log('Forgot Password clicked');
  };

  return (
    <KeyboardAvoidingView 
      style={styles.LoginContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.LoginScrollContainer}>
        <View style={styles.LoginHeader}>
          <Image source={require('../assets/logo.png')} style={styles.LoginLogo} />
          <Text style={styles.LoginTitle}>Welcome Back</Text>
          <Text style={styles.LoginSubtitle}>Sign in to continue</Text>
        </View>

        <View style={styles.LoginForm}>
          <View style={styles.LoginInputContainer}>
            <Text style={styles.LoginLabel}>Username</Text>
            <TextInput
              style={styles.LoginInput}
              placeholder="Enter your Username"
              value={username}
              onChangeText={setUsername}
              keyboardType="default"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View style = {styles.LoginInputContainer}>
            <TextInput style={[styles.LoginInput]} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry = {!showPassword} />
            <TouchableOpacity
              style={styles.toggleButton}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Text style={styles.toggleText}>
                {showPassword ? 'Hide' : 'Show'}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.LoginButton} onPress={handleLogin}>
            <Text style={styles.LoginButtonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleForgotPassword} style={styles.LoginForgotButton}>
            <Text style={styles.LoginForgotText}>Forgot Password?</Text>
          </TouchableOpacity>

          <View style={styles.LoginSignUpContainer}>
            <Text style={styles.LoginNormalText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Registration")}>
              <Text style={styles.LoginLinkText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};



export default LoginScreen;

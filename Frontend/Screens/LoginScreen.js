import React, { useState } from 'react';
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

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    axios.post("http://192.168.1.68:8080/users/login", {
      username: username,
      password: password
    })
    .then(res => {
      navigation.navigate("Main");
    })
    .catch(err => {
      alert("Login failed", err.response?.data || err.message);
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

          <View style={styles.LoginInputContainer}>
            <Text style={styles.LoginLabel}>Password</Text>
            <TextInput
              style={styles.LoginInput}
              placeholder="Enter your password"
              keyboardType='default'
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
            />
          </View>

          <TouchableOpacity style={styles.LoginButton} onPress={handleLogin}>
            <Text style={styles.LoginButtonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleForgotPassword} style={styles.LoginForgotButton}>
            <Text style={styles.LoginForgotText}>Forgot Password?</Text>
          </TouchableOpacity>

          <View style={styles.LoginSignUpContainer}>
            <Text style={styles.LoginNormalText}>Don't have an account? </Text>
            <TouchableOpacity onPress={handleLogin}>
              <Text style={styles.LoginLinkText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};



export default LoginScreen;

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView,
  StatusBar,
} from 'react-native';
import { styles } from '../Styles';

const LandingScreen = ({ navigation }) => {
  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const handleSignUp = () => {
    navigation.navigate('Registration');
  };


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor='#f7f6f7' />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        {/* Header with Logo */}
        <View style={styles.header}>
          <Image source={require('../assets/logo.png')} style={styles.logo} />
          <Text style={styles.appName}>Smart BloodLink</Text>
          <Text style={styles.countryName}>Nepal</Text>
          <Text style={styles.tagline}>Connecting Lives, Saving Lives</Text>
        </View>

        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Every Drop Counts</Text>
          <Text style={styles.heroSubtitle}>
            Join Nepal's largest blood donation network and help save lives in your community
          </Text>
          
          {/* Features */}
          <View style={styles.featuresContainer}>
            <View style={styles.feature}>
              <Text style={styles.featureIcon}>🩸</Text>
              <Text style={styles.featureText}>Donate Blood</Text>
            </View>
            <View style={styles.feature}>
              <Text style={styles.featureIcon}>🔍</Text>
              <Text style={styles.featureText}>Find Donors</Text>
            </View>
            <View style={styles.feature}>
              <Text style={styles.featureIcon}>🚑</Text>
              <Text style={styles.featureText}>Emergency Help</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionSection}>
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
            <Text style={styles.signUpButtonText}>Create Account</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default LandingScreen;
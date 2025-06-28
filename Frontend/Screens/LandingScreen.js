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
    <SafeAreaView style={styles.LandingPageContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#f7f6f7" />
      <ScrollView contentContainerStyle={styles.LandingPageScrollContainer}>

        <View style={styles.LandingPageHeader}>
          <Image source={require('../assets/logo.png')} style={styles.LandingPageLogo} />
          <Text style={styles.LandingPageAppName}>Smart BloodLink</Text>
          <Text style={styles.LandingPageCountryName}>Nepal</Text>
          <Text style={styles.LandingPageTagline}>Connecting Lives, Saving Lives</Text>
        </View>

        <View style={styles.LandingPageHeroSection}>
          <Text style={styles.LandingPageHeroTitle}>Every Drop Counts</Text>
          <Text style={styles.LandingPageHeroSubtitle}>
            Join Nepal's largest blood donation network and help save lives in your community
          </Text>

          <View style={styles.LandingPageFeaturesContainer}>
            <View style={styles.LandingPageFeature}>
              <Text style={styles.LandingPageFeatureIcon}>🩸</Text>
              <Text style={styles.LandingPageFeatureText}>Donate Blood</Text>
            </View>
            <View style={styles.LandingPageFeature}>
              <Text style={styles.LandingPageFeatureIcon}>🔍</Text>
              <Text style={styles.LandingPageFeatureText}>Find Donors</Text>
            </View>
            <View style={styles.LandingPageFeature}>
              <Text style={styles.LandingPageFeatureIcon}>🚑</Text>
              <Text style={styles.LandingPageFeatureText}>Emergency Help</Text>
            </View>
          </View>
        </View>

        <View style={styles.LandingPageActionSection}>
          <TouchableOpacity style={styles.LandingPageLoginButton} onPress={handleLogin}>
            <Text style={styles.LandingPageLoginButtonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.LandingPageSignUpButton} onPress={handleSignUp}>
            <Text style={styles.LandingPageSignUpButtonText}>Create Account</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};



export default LandingScreen;

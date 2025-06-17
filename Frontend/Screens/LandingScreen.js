import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
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

        {/* Stats Section */}
        <View style={styles.statsSection}>
          <Text style={styles.statsTitle}>Making a Difference</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>10K+</Text>
              <Text style={styles.statLabel}>Lives Saved</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>5K+</Text>
              <Text style={styles.statLabel}>Active Donors</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>75+</Text>
              <Text style={styles.statLabel}>Cities</Text>
            </View>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f7f6f7',
//   },
//   scrollContainer: {
//     flexGrow: 1,
//     paddingBottom: 30,
//   },
//   header: {
//     alignItems: 'center',
//     paddingTop: 50,
//     paddingBottom: 30,
//     backgroundColor: '#f7f6f7',
//     borderBottomWidth: 1,
//     borderColor: '#e53935',
//   },
//   logo: {
//     width: 80,
//     height: 80,
//     marginBottom: 12,
//     resizeMode: 'contain',
//   },
//   appName: {
//     fontSize: 30,
//     fontWeight: 'bold',
//     color: '#e53935',
//   },
//   countryName: {
//     fontSize: 22,
//     fontWeight: '500',
//     color: '#e53935',
//   },
//   tagline: {
//     fontSize: 14,
//     color: '#e53935',
//     fontStyle: 'italic',
//     textAlign: 'center',
//     marginTop: 6,
//   },
//   heroSection: {
//     backgroundColor: '#e53935',
//     borderRadius: 16,
//     marginHorizontal: 20,
//     padding: 24,
//     marginBottom: 30,
//     marginTop: 20,
//   },
//   heroTitle: {
//     fontSize: 26,
//     fontWeight: 'bold',
//     color: '#fff',
//     textAlign: 'center',
//     marginBottom: 10,
//   },
//   heroSubtitle: {
//     fontSize: 15,
//     color: '#ffe0e0',
//     textAlign: 'center',
//     lineHeight: 22,
//     marginBottom: 20,
//   },
//   featuresContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginTop: 10,
//   },
//   feature: {
//     alignItems: 'center',
//     flex: 1,
//   },
//   featureIcon: {
//     fontSize: 30,
//     color: '#fff',
//     marginBottom: 6,
//   },
//   featureText: {
//     fontSize: 13,
//     color: '#fff',
//     fontWeight: '500',
//     textAlign: 'center',
//   },
//   actionSection: {
//     backgroundColor: '#f7f6f7',
//     marginHorizontal: 20,
//     borderRadius: 16,
//     padding: 20,
//     marginBottom: 30,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   loginButton: {
//     backgroundColor: '#e53935',
//     borderRadius: 25,
//     padding: 15,
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   loginButtonText: {
//     color: '#fff',
//     fontSize: 17,
//     fontWeight: 'bold',
//   },
//   signUpButton: {
//     borderColor: '#e53935',
//     borderWidth: 2,
//     borderRadius: 25,
//     padding: 15,
//     alignItems: 'center',
//   },
//   signUpButtonText: {
//     color: '#e53935',
//     fontSize: 17,
//     fontWeight: 'bold',
//   },
//   statsSection: {
//     backgroundColor: '#e53935',
//     borderRadius: 16,
//     marginHorizontal: 20,
//     padding: 20,
//   },
//   statsTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#fff',
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   statsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//   },
//   statItem: {
//     alignItems: 'center',
//   },
//   statNumber: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#fff',
//     marginBottom: 4,
//   },
//   statLabel: {
//     fontSize: 13,
//     color: '#ffe0e0',
//     textAlign: 'center',
//   },
// });



export default LandingScreen;
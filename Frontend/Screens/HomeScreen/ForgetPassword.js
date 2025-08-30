// ForgotPasswordScreen.js
import React, { useMemo, useRef, useState } from "react";
import {
  View,
  TextInput,
  Text,
  Alert,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useWindowDimensions } from "react-native";
import axios from "axios";
import Constants from "expo-constants";
// ✅ you already use these in your project
import { scale, verticalScale, moderateScale } from "../../utils/responsive";

export default function ForgotPasswordScreen({ navigation }) {
  const API_URL = Constants.expoConfig.extra.apiUrl;
  const { width } = useWindowDimensions();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState(false);

  const isEmailValid = useMemo(
    () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()),
    [email]
  );

  const canSubmit = isEmailValid && !loading;

  const sendOtp = async () => {
    setTouched(true);
    if (!isEmailValid) return;
    try {
      setLoading(true);
      await axios.post(`${API_URL}/auth/forgot-password/otp`, { email: email.trim() });
      Alert.alert("OTP Sent", "Check your email for the OTP.");
      navigation.navigate("otp", { email: email.trim() });
    } catch (e) {
      // Avoid leaking whether the email exists
      Alert.alert("If the email exists, an OTP has been sent.");
      navigation.navigate("otp", { email: email.trim() });
    } finally {
      setLoading(false);
    }
  };

  // Responsive logo size
  const logoSize = Math.min(width * 0.28, scale(120));

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.headerContainer}>
            <Image
              source={require("../../assets/logo.png")}
              style={[styles.logo, { width: logoSize, height: logoSize }]}
              resizeMode="contain"
            />
            <Text style={styles.title}>Forgot Password</Text>
            <Text style={styles.subtitle}>
              Enter your email to receive a one-time password (OTP)
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              value={email}
              onChangeText={(t) => setEmail(t)}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              placeholder="example@mail.com"
              placeholderTextColor="#9E9E9E"
              style={[
                styles.input,
                touched && !isEmailValid ? styles.inputError : null,
              ]}
              returnKeyType="send"
              onSubmitEditing={sendOtp}
              onBlur={() => setTouched(true)}
              accessibilityLabel="Email input"
            />
            {touched && !isEmailValid ? (
              <Text style={styles.errorText}>Please enter a valid email.</Text>
            ) : null}

            <TouchableOpacity
              style={[styles.button, !canSubmit && styles.buttonDisabled]}
              onPress={sendOtp}
              activeOpacity={0.85}
              disabled={!canSubmit}
              accessibilityRole="button"
              accessibilityLabel="Send OTP"
            >
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Send OTP</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.linkBtn}
              onPress={() => navigation.goBack()}
              accessibilityRole="button"
              accessibilityLabel="Back to sign in"
            >
              <Text style={styles.linkText}>Back to Sign In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const RED = "#d32f2f";
const DARK_RED = "#b71c1c";
const LIGHT_BORDER = "#E5E7EB";

const styles = StyleSheet.create({
  flex: { flex: 1 },
  safe: {
    flex: 1,
    backgroundColor: "#f7f6f7", // white theme base
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(24),
    paddingBottom: verticalScale(32),
    justifyContent: "center",
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: verticalScale(24),
  },
  logo: {
    marginBottom: verticalScale(12),
  },
  title: {
    fontSize: moderateScale(24),
    fontWeight: "800",
    color: DARK_RED,
    marginBottom: verticalScale(4),
    textAlign: "center",
  },
  subtitle: {
    fontSize: moderateScale(13),
    color: "#616161",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: moderateScale(14),
    padding: scale(18),
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: LIGHT_BORDER,
    // subtle shadow (Android uses elevation)
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  label: {
    fontSize: moderateScale(14),
    fontWeight: "700",
    marginBottom: verticalScale(8),
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: LIGHT_BORDER,
    borderRadius: moderateScale(10),
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(12),
    fontSize: moderateScale(15),
    color: "#111",
    marginBottom: verticalScale(6),
    backgroundColor: "#fff",
  },
  inputError: {
    borderColor: RED,
  },
  errorText: {
    color: RED,
    fontSize: moderateScale(12),
    marginBottom: verticalScale(8),
  },
  button: {
    backgroundColor: RED,
    paddingVertical: verticalScale(14),
    borderRadius: moderateScale(10),
    alignItems: "center",
    justifyContent: "center",
    marginTop: verticalScale(10),
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#fff",
    fontSize: moderateScale(16),
    fontWeight: "700",
    letterSpacing: 0.4,
    textTransform: "uppercase",
  },
  linkBtn: {
    alignSelf: "center",
    paddingVertical: verticalScale(12),
  },
  linkText: {
    color: DARK_RED,
    fontWeight: "700",
  },
});

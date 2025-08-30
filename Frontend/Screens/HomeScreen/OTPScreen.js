// VerifyOtpScreen.js
import React, { useState, useMemo, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  Alert,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Image,
} from "react-native";
import { useWindowDimensions } from "react-native";
import axios from "axios";
import Constants from "expo-constants";
import { scale, verticalScale, moderateScale } from "../../utils/responsive";

export default function VerifyOtpScreen({ route, navigation }) {
  const API_URL = Constants.expoConfig.extra.apiUrl;
  const { email } = route.params;
  const { width } = useWindowDimensions();

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState(false);

  // resend state
  const [cooldown, setCooldown] = useState(0); // seconds left

  const isOtpValid = useMemo(() => otp.trim().length === 6, [otp]);
  const canSubmit = isOtpValid && !loading;

  // timer for resend cooldown
  useEffect(() => {
    if (cooldown <= 0) return;
    const id = setInterval(() => setCooldown((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, [cooldown]);

  const verify = async () => {
    setTouched(true);
    if (!isOtpValid) return;
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${API_URL}/auth/forgot-password/verify`,
        {
          email,
          otp: otp.trim(),
        }
      );
      navigation.navigate("reset", { resetToken: data.resetToken });
    } catch {
      Alert.alert("Invalid or expired OTP.");
    } finally {
      setLoading(false);
    }
  };

  const resend = async () => {
    if (cooldown > 0 || loading) return;
    try {
      setLoading(true);
      await axios.post(`${API_URL}/auth/forgot-password/otp`, { email });
      setCooldown(30); // 30s lock
      Alert.alert("OTP resent", "Check your email for the new code.");
    } catch {
      // generic message for privacy
      Alert.alert("If the email exists, a new OTP has been sent.");
      setCooldown(30);
    } finally {
      setLoading(false);
    }
  };

  // responsive logo size
  const logoSize = Math.min(width * 0.26, scale(110));

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
            <Text style={styles.title}>Verify OTP</Text>
            <Text style={styles.subtitle}>
              Enter the 6-digit code sent to{" "}
              <Text style={{ fontWeight: "700", color: "#000" }}>{email}</Text>
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.label}>One-Time Password (OTP)</Text>
            <TextInput
              value={otp}
              onChangeText={(t) => {
                const v = t.replace(/[^0-9]/g, "");
                setOtp(v);
                if (v.length === 6) setTouched(true);
              }}
              keyboardType="number-pad"
              maxLength={6}
              style={[
                styles.input,
                touched && !isOtpValid ? styles.inputError : null,
              ]}
              placeholder="Enter 6-digit code"
              placeholderTextColor="#9E9E9E"
              returnKeyType="done"
              onSubmitEditing={verify}
              onBlur={() => setTouched(true)}
              textAlign="center"
              accessibilityLabel="OTP input"
            />
            {touched && !isOtpValid ? (
              <Text style={styles.errorText}>
                OTP must be exactly 6 digits.
              </Text>
            ) : null}

            <TouchableOpacity
              style={[styles.button, !canSubmit && styles.buttonDisabled]}
              onPress={verify}
              disabled={!canSubmit}
              activeOpacity={0.85}
              accessibilityRole="button"
              accessibilityLabel="Verify OTP"
            >
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Verify</Text>
              )}
            </TouchableOpacity>

            <View style={styles.resendRow}>
              <Text style={styles.resendHint}>Didn't get a code?</Text>
              <TouchableOpacity
                onPress={resend}
                disabled={cooldown > 0 || loading}
                style={styles.linkBtn}
              >
                <Text
                  style={[styles.linkText, cooldown > 0 && styles.linkDisabled]}
                >
                  {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend OTP"}
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.linkBtn}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.linkText}>Back</Text>
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
  safe: { flex: 1, backgroundColor: "#f7f6f7" },
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
  logo: { marginBottom: verticalScale(12) },
  title: {
    fontSize: moderateScale(24),
    fontWeight: "800",
    color: DARK_RED,
    marginBottom: verticalScale(6),
    textAlign: "center",
  },
  subtitle: { fontSize: moderateScale(14), color: "#555", textAlign: "center" },
  card: {
    backgroundColor: "#fff",
    borderRadius: moderateScale(14),
    padding: scale(18),
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: LIGHT_BORDER,
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
    fontSize: moderateScale(20),
    color: "#111",
    marginBottom: verticalScale(6),
    backgroundColor: "#fff",
    letterSpacing: 6,
  },
  inputError: { borderColor: RED },
  errorText: {
    color: RED,
    fontSize: moderateScale(12),
    marginBottom: verticalScale(8),
    textAlign: "center",
  },
  button: {
    backgroundColor: RED,
    paddingVertical: verticalScale(14),
    borderRadius: moderateScale(10),
    alignItems: "center",
    justifyContent: "center",
    marginTop: verticalScale(10),
  },
  buttonDisabled: { opacity: 0.6 },
  buttonText: {
    color: "#fff",
    fontSize: moderateScale(16),
    fontWeight: "700",
    textTransform: "uppercase",
  },
  resendRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: verticalScale(12),
  },
  resendHint: { color: "#666", marginRight: scale(6) },
  linkBtn: { paddingVertical: verticalScale(8), alignSelf: "center" },
  linkText: { color: DARK_RED, fontWeight: "700" },
  linkDisabled: { opacity: 0.6 },
});

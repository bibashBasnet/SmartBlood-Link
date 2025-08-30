// ResetPasswordScreen.js
import React, { useMemo, useState } from "react";
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
import axios from "axios";
import Constants from "expo-constants";
import { useWindowDimensions } from "react-native";
import { scale, verticalScale, moderateScale } from "../../utils/responsive";

export default function ResetPasswordScreen({ route, navigation }) {
  const API_URL = Constants.expoConfig.extra.apiUrl;
  const { resetToken } = route.params;

  const { width } = useWindowDimensions();
  const [p1, setP1] = useState("");
  const [p2, setP2] = useState("");
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState(false);

  // basic strength & validity
  const minLen = p1.length >= 8;
  const hasNum = /\d/.test(p1);
  const hasLetter = /[A-Za-z]/.test(p1);
  const passwordsMatch = p1 === p2;

  const isValid = useMemo(
    () => minLen && hasNum && hasLetter && passwordsMatch,
    [minLen, hasNum, hasLetter, passwordsMatch]
  );

  const canSubmit = isValid && !loading;

  const reset = async () => {
    setTouched(true);
    if (!isValid) {
      Alert.alert("Check password", "Make sure both passwords match and are strong.");
      return;
    }
    try {
      setLoading(true);
      await axios.post(`${API_URL}/auth/forgot-password/reset`, {
        token: resetToken,
        newPassword: p1,
      });
      Alert.alert("Password updated", "Please log in with your new password.");
      navigation.navigate("Login");
    } catch (e) {
      Alert.alert("Couldn’t reset", "Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const logoSize = Math.min(width * 0.26, scale(110));

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <View style={styles.headerContainer}>
            <Image
              source={require("../../assets/logo.png")}
              style={[styles.logo, { width: logoSize, height: logoSize }]}
              resizeMode="contain"
            />
            <Text style={styles.title}>Reset Password</Text>
            <Text style={styles.subtitle}>
              Create a strong password (min 8 chars, include letters and numbers)
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.label}>New password</Text>
            <View style={styles.inputRow}>
              <TextInput
                placeholder="New password"
                secureTextEntry={!show1}
                value={p1}
                onChangeText={setP1}
                style={[
                  styles.input,
                  touched && !minLen && styles.inputError,
                ]}
                placeholderTextColor="#9E9E9E"
                onBlur={() => setTouched(true)}
                returnKeyType="next"
              />
              <TouchableOpacity onPress={() => setShow1((s) => !s)} style={styles.eyeBtn}>
                <Text style={styles.eyeText}>{show1 ? "Hide" : "Show"}</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>Confirm password</Text>
            <View style={styles.inputRow}>
              <TextInput
                placeholder="Confirm password"
                secureTextEntry={!show2}
                value={p2}
                onChangeText={setP2}
                style={[
                  styles.input,
                  touched && !passwordsMatch && styles.inputError,
                ]}
                placeholderTextColor="#9E9E9E"
                onBlur={() => setTouched(true)}
                returnKeyType="done"
                onSubmitEditing={reset}
              />
              <TouchableOpacity onPress={() => setShow2((s) => !s)} style={styles.eyeBtn}>
                <Text style={styles.eyeText}>{show2 ? "Hide" : "Show"}</Text>
              </TouchableOpacity>
            </View>

            {/* inline hints */}
            {touched && (
              <View style={styles.hints}>
                <Hint ok={minLen} text="At least 8 characters" />
                <Hint ok={hasLetter} text="Contains letters" />
                <Hint ok={hasNum} text="Contains numbers" />
                <Hint ok={passwordsMatch} text="Both passwords match" />
              </View>
            )}

            <TouchableOpacity
              style={[styles.button, !canSubmit && styles.buttonDisabled]}
              onPress={reset}
              disabled={!canSubmit}
              activeOpacity={0.85}
              accessibilityRole="button"
              accessibilityLabel="Reset Password"
            >
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Reset Password</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity style={styles.linkBtn} onPress={() => navigation.goBack()}>
              <Text style={styles.linkText}>Back</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function Hint({ ok, text }) {
  return (
    <View style={hintStyles.row}>
      <Text style={[hintStyles.bullet, ok ? hintStyles.ok : hintStyles.bad]}>
        {ok ? "•" : "•"}
      </Text>
      <Text style={[hintStyles.text, ok ? hintStyles.okText : hintStyles.badText]}>
        {text}
      </Text>
    </View>
  );
}

const RED = "#d32f2f";
const DARK_RED = "#b71c1c";
const LIGHT_BORDER = "#E5E7EB";
const OK = "#2e7d32";
const BAD = RED;

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
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: verticalScale(10),
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: LIGHT_BORDER,
    borderRadius: moderateScale(10),
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(12),
    fontSize: moderateScale(15),
    color: "#111",
    backgroundColor: "#fff",
  },
  inputError: { borderColor: RED },
  eyeBtn: {
    marginLeft: scale(8),
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(10),
  },
  eyeText: {
    color: DARK_RED,
    fontWeight: "700",
  },
  hints: {
    marginTop: verticalScale(6),
    marginBottom: verticalScale(6),
  },
  button: {
    backgroundColor: RED,
    paddingVertical: verticalScale(14),
    borderRadius: moderateScale(10),
    alignItems: "center",
    justifyContent: "center",
    marginTop: verticalScale(6),
  },
  buttonDisabled: { opacity: 0.6 },
  buttonText: {
    color: "#fff",
    fontSize: moderateScale(16),
    fontWeight: "700",
    textTransform: "uppercase",
  },
  linkBtn: { alignSelf: "center", paddingVertical: verticalScale(12) },
  linkText: { color: DARK_RED, fontWeight: "700" },
});

const hintStyles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", marginBottom: verticalScale(4) },
  bullet: { fontSize: moderateScale(18), marginRight: scale(6) },
  ok: { color: OK },
  bad: { color: BAD },
  text: { fontSize: moderateScale(12) },
  okText: { color: OK },
  badText: { color: BAD },
});

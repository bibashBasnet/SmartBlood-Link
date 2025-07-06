import { View } from "react-native"

const ForgetPassword = () => {
  return (
    <KeyboardAvoidingView 
      style={styles.LoginContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.LoginScrollContainer}>
        <View style={styles.LoginHeader}>
          <Image source={require('../assets/logo.png')} style={styles.LoginLogo} />
          <Text style={styles.LoginTitle}>Forget Password</Text>
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

          <TouchableOpacity style={styles.LoginButton} onPress={handleLogin}>
            <Text style={styles.LoginButtonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleForgotPassword} style={styles.LoginForgotButton}>
            <Text style={styles.LoginForgotText}>Forgot Password?</Text>
          </TouchableOpacity>
          </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default ForgetPassword

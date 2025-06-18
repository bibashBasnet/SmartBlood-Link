import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f6f7',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 0,
    paddingBottom: 30,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    position: 'absolute',
    top: 40,
  },
  menuButton: {
    position: 'absolute',
    top: 150,
    left: 20,
  },
  menuIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 0,
    resizeMode: 'contain',
  },
  organizationName: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#e53935',
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 30,
    padding: 10,
    height: 200,
    width: 300,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#e53935',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#718096',
  },
  button: {
    backgroundColor: '#e53935',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    height: 50,
    width: 250,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
  },
  profileImageContainer: {
    marginTop: -50,
    marginBottom: 30,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#880808',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    resizeMode: 'cover',
  },
  infoContainer: {
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 50,
  },
  infoText: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 6,
    color: '#333',
  },
  infoValue: {
    fontWeight: '400',
    color: '#555',
  },
  row: {
     flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  cell: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 10,
    textAlign: 'center',
    fontSize: 14,
    color: '#333',
  },
  header: {
    backgroundColor: '#e53935',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  form: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d3748',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f7fafc',
  },
  loginButton: {
    backgroundColor: '#e53935',
    borderRadius: 25,
    padding: 16,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 16,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotButton: {
    alignItems: 'center',
    marginTop: 16,
  },
  forgotText: {
    color: '#e53935',
    fontSize: 16,
    fontWeight: '500',
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  normalText: {
    color: '#718096',
    fontSize: 16,
  },
  linkText: {
    color: '#e53935',
    fontSize: 16,
    fontWeight: '500',
  },
  appName: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#e53935',
  },
  countryName: {
    fontSize: 22,
    fontWeight: '500',
    color: '#e53935',
  },
  tagline: {
    fontSize: 14,
    color: '#e53935',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 6,
  },
  heroSection: {
    backgroundColor: '#e53935',
    borderRadius: 16,
    marginHorizontal: 20,
    padding: 24,
    marginBottom: 30,
    marginTop: 20,
  },
  heroTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  heroSubtitle: {
    fontSize: 15,
    color: '#ffe0e0',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  feature: {
    alignItems: 'center',
    flex: 1,
  },
  featureIcon: {
    fontSize: 30,
    color: '#fff',
    marginBottom: 6,
  },
  featureText: {
    fontSize: 13,
    color: '#fff',
    fontWeight: '500',
    textAlign: 'center',
  },
  actionSection: {
    backgroundColor: '#f7f6f7',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  signUpButton: {
    borderColor: '#e53935',
    borderWidth: 2,
    borderRadius: 25,
    padding: 15,
    alignItems: 'center',
  },
  signUpButtonText: {
    color: '#e53935',
    fontSize: 17,
    fontWeight: 'bold',
  },
  statsSection: {
    backgroundColor: '#e53935',
    borderRadius: 16,
    marginHorizontal: 20,
    padding: 20,
  },
  statsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    color: '#ffe0e0',
    textAlign: 'center',
  },
  table: {
    marginTop: 0,
    width: 400,
    margin: 16,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    elevation: 2,
  },

  historyTitle: {
  fontSize: 25,
  fontWeight: 'bold',
  color: '#e53935',
  textAlign: 'center',
  marginTop: -150,
  marginBottom: 10,
},


card: {
  width: 350,
  backgroundColor: '#ffffff',
  marginHorizontal: 20,
  marginVertical: 10,
  padding: 16,
  borderRadius: 12,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 3,
},

name: {
  fontSize: 20,
  fontWeight: 'bold',
  color: '#e53935',
  marginBottom: 6,
},

date: {
  fontSize: 16,
  color: '#999',
  marginBottom: 8,
},

detailsRow: {
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: 4,
},

bloodTypeBox: {
  backgroundColor: '#e53935',
  paddingHorizontal: 10,
  paddingVertical: 4,
  borderRadius: 8,
  marginRight: 12,
},

bloodTypeText: {
  color: '#fff',
  fontWeight: 'bold',
  fontSize: 16,
},

place: {
  fontSize: 16,
  color: '#444',
  flexShrink: 1,
},

//Landing Screen

LandingPageContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  LandingPageScrollContainer: {
    flexGrow: 1,
  },
  LandingPageHeader: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#ffffff',
  },
  LandingPageLogo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  LandingPageAppName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#e53935',
    marginTop: 10,
  },
  LandingPageCountryName: {
    fontSize: 20,
    color: '#444',
    marginTop: 2,
  },
  LandingPageTagline: {
    fontSize: 14,
    color: '#777',
    marginTop: 5,
  },
  LandingPageHeroSection: {
    backgroundColor: '#e53935',
    paddingVertical: 30,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    alignItems: 'center',
    borderRadius: 15,
  },
  LandingPageHeroTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  LandingPageHeroSubtitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  LandingPageFeaturesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  LandingPageFeature: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  LandingPageFeatureIcon: {
    fontSize: 30,
    marginBottom: 5,
    color: '#fff',
  },
  LandingPageFeatureText: {
    fontSize: 14,
    color: '#fff',
  },
  LandingPageActionSection: {
    backgroundColor: '#ffffff',
    paddingVertical: 30,
    paddingHorizontal: 40,
    alignItems: 'center',
  },
  LandingPageLoginButton: {
    backgroundColor: '#e53935',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginBottom: 15,
    width: '100%',
  },
  LandingPageLoginButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  LandingPageSignUpButton: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e53935',
    width: '100%',
  },
  LandingPageSignUpButtonText: {
    color: '#e53935',
    fontSize: 16,
    textAlign: 'center',
  },





  //Login Screen
  LoginContainer: {
    flex: 1,
    backgroundColor: '#f7f6f7',
  },
  LoginScrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  LoginHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  LoginLogo: {
    width: 90,
    height: 90,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  LoginTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#e53935',
  },
  LoginSubtitle: {
    fontSize: 15,
    color: '#555',
    marginTop: 4,
  },
  LoginForm: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  LoginInputContainer: {
    marginBottom: 16,
  },
  LoginLabel: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  LoginInput: {
    height: 44,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fafafa',
    fontSize: 15,
  },
  LoginButton: {
    backgroundColor: '#e53935',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  LoginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  LoginForgotButton: {
    marginTop: 25,
    alignItems: 'center', // Center the text horizontally
  },
  LoginForgotText: {
    fontSize: 13,
    color: '#e53935',
    textAlign: 'center',
  },
  LoginSignUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
  },
  LoginNormalText: {
    fontSize: 14,
    color: '#444',
  },
  LoginLinkText: {
    fontSize: 14,
    color: '#e53935',
    fontWeight: 'bold',
  },

});

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  // ========== Common ==========
  container: {
    flex: 1,
    backgroundColor: '#f7f6f7',
    padding: 20,
  },

  // ========== Header & Drawer ==========
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginRight: 10,
  },
  organizationName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#e53935',
  },
  menuButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    padding: 10,
  },
  menuIcon: {
    width: 28,
    height: 28,
    tintColor: '#e53935',
  },




// ========== Home Screen ==========
homeLogo: {
  width: 100,
  height: 100,
  resizeMode: 'contain',
  marginTop: 150,
  marginBottom: 10,
  alignSelf: 'center',
},

textContainer: {
  alignItems: 'center',
  marginTop: 30, // pushes all text down a bit
  marginBottom: 30,
  paddingHorizontal: 20,
},

title: {
  fontSize: 32,
  fontWeight: 'bold',
  color: '#e53935',
  marginBottom: 12,
  textAlign: 'center',
},

subtitle: {
  fontSize: 20,
  fontWeight: '600',
  color: '#555',
  marginBottom: 10,
  textAlign: 'center',
},

text: {
  fontSize: 16,
  color: '#444',
  textAlign: 'center',
  lineHeight: 22,
},

button: {
  backgroundColor: '#e53935',
  paddingVertical: 14,
  paddingHorizontal: 30,
  borderRadius: 30,
  width: 220,
  alignSelf: 'center',
  alignItems: 'center',
  marginTop: 10,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 5,
  elevation: 3,
},

buttonText: {
  color: '#fff',
  fontSize: 16,
  fontWeight: 'bold',
},



  // ========== Profile Screen ==========
  profileImageContainer: {
    alignSelf: 'center',
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    borderWidth: 3,
    borderColor: '#e53935',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    resizeMode: 'cover',
  },
  infoContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    marginTop: 10,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 12,
    color: '#e53935',
    fontWeight: '600',
  },

  // ========== Landing Screen ==========
  LandingPageContainer: {
    flex: 1,
    backgroundColor: '#f7f6f7',
    alignItems: 'center',
  },
  LandingPageScrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: 30,
  },
  LandingPageHeader: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  LandingPageLogo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  LandingPageAppName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#e53935',
    marginTop: 12,
  },
  LandingPageCountryName: {
    fontSize: 18,
    color: '#444',
    marginTop: 4,
  },
  LandingPageTagline: {
    fontSize: 14,
    color: '#777',
    fontStyle: 'italic',
    marginTop: 6,
    textAlign: 'center',
  },
  LandingPageHeroSection: {
    backgroundColor: '#e53935',
    paddingVertical: 30,
    paddingHorizontal: 16,
    marginHorizontal: 20,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  LandingPageHeroTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
  },
  LandingPageHeroSubtitle: {
    fontSize: 15,
    color: '#ffe0e0',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 16,
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
    color: '#fff',
    marginBottom: 6,
  },
  LandingPageFeatureText: {
    fontSize: 13,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '500',
  },
  LandingPageActionSection: {
    paddingHorizontal: 30,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  LandingPageLoginButton: {
    backgroundColor: '#e53935',
    paddingVertical: 14,
    borderRadius: 30,
    width: '100%',
    marginBottom: 15,
    alignItems: 'center',
  },
  LandingPageLoginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  LandingPageSignUpButton: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#e53935',
    paddingVertical: 14,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
  },
  LandingPageSignUpButtonText: {
    color: '#e53935',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // ========== Login Screen ==========
  LoginContainer: {
    flex: 1,
    backgroundColor: '#f7f6f7',
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
    alignItems: 'center',
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

  // ========== History Screen ==========
  historyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e53935',
    textAlign: 'center',
    marginVertical: 20,
  },
  card: {
    width: '90%',
    backgroundColor: '#ffffff',
    marginVertical: 10,
    padding: 16,
    borderRadius: 12,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e53935',
    marginBottom: 4,
  },
  date: {
    fontSize: 16,
    color: '#999',
    marginBottom: 8,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
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
    fontSize: 14,
    color: '#444',
    flexShrink: 1,
  },


 // ========History List Screen=====
 historyListLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  historyListValue: {
    fontWeight: 'normal',
    color: '#555',
  },
  historyListButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
  },
  historyListButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  historyListAcceptButton: {
    backgroundColor: '#4CAF50',
  },
  historyListRejectButton: {
    backgroundColor: '#F44336',
  },
  historyListButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from './utils/responsive';

export const styles = StyleSheet.create({
  // ========== Common ==========
  container: {
    flex: 1,
    backgroundColor: '#f7f6f7',
    padding: scale(20),
  },

  // ========== Header & Drawer ==========
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(30),
    marginBottom: verticalScale(10),

  },
  logo: {
    width: scale(40),
    height: verticalScale(40),
    resizeMode: 'contain',
    marginRight: scale(10),
  },
  organizationName: {
    fontSize: moderateScale(22),
    fontWeight: 'bold',
    color: '#e53935',
  },
  menuButton: {
    position: 'absolute',
    top: verticalScale(40),
    left: scale(20),
    padding: scale(10),
    marginTop: verticalScale(40)
  },
  menuIcon: {
    width: scale(28),
    height: verticalScale(28),
    tintColor: '#e53935',
  },

  // ========== Home Screen ==========
  homeLogo: {
    width: scale(100),
    height: verticalScale(100),
    resizeMode: 'contain',
    marginTop: verticalScale(150),
    marginBottom: verticalScale(10),
    alignSelf: 'center',
  },
  textContainer: {
    alignItems: 'center',
    marginTop: verticalScale(30),
    marginBottom: verticalScale(30),
    paddingHorizontal: scale(20),
  },
  title: {
    fontSize: moderateScale(32),
    fontWeight: 'bold',
    color: '#e53935',
    marginBottom: verticalScale(12),
    textAlign: 'center',
  },
  subtitle: {
    fontSize: moderateScale(20),
    fontWeight: '600',
    color: '#555',
    marginBottom: verticalScale(10),
    textAlign: 'center',
  },
  text: {
    fontSize: moderateScale(16),
    color: '#444',
    textAlign: 'center',
    lineHeight: verticalScale(22),
  },
  button: {
    backgroundColor: '#e53935',
    paddingVertical: verticalScale(14),
    paddingHorizontal: scale(30),
    borderRadius: moderateScale(30),
    width: scale(220),
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: verticalScale(10),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: verticalScale(2) },
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(5),
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  },
  // ========== Profile Screen ==========
  profileImageContainer: {
    alignSelf: 'center',
    width: scale(140),
    height: scale(140),
    borderRadius: moderateScale(70),
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: verticalScale(20),
    borderWidth: scale(3),
    borderColor: '#e53935',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: verticalScale(2) },
    shadowOpacity: 0.2,
    shadowRadius: moderateScale(5),
    elevation: 5,
  },
  profileImage: {
    width: scale(100),
    height: scale(100),
    borderRadius: moderateScale(50),
    resizeMode: 'cover',
  },
  infoContainer: {
    backgroundColor: '#fff',
    borderRadius: moderateScale(12),
    padding: scale(20),
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: verticalScale(1) },
    shadowOpacity: 0.05,
    shadowRadius: moderateScale(4),
    elevation: 2,
    marginTop: verticalScale(10),
  },
  infoText: {
    fontSize: moderateScale(16),
    marginBottom: verticalScale(12),
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
    paddingBottom: verticalScale(30),
  },
  LandingPageHeader: {
    alignItems: 'center',
    paddingVertical: verticalScale(40),
  },
  LandingPageLogo: {
    width: scale(100),
    height: scale(100),
    resizeMode: 'contain',
  },
  LandingPageAppName: {
    fontSize: moderateScale(26),
    fontWeight: 'bold',
    color: '#e53935',
    marginTop: verticalScale(12),
  },
  LandingPageCountryName: {
    fontSize: moderateScale(18),
    color: '#444',
    marginTop: verticalScale(4),
  },
  LandingPageTagline: {
    fontSize: moderateScale(14),
    color: '#777',
    fontStyle: 'italic',
    marginTop: verticalScale(6),
    textAlign: 'center',
  },
  LandingPageHeroSection: {
    backgroundColor: '#e53935',
    paddingVertical: verticalScale(30),
    paddingHorizontal: scale(16),
    marginHorizontal: scale(20),
    borderRadius: moderateScale(16),
    alignItems: 'center',
    marginTop: verticalScale(20),
    marginBottom: verticalScale(30),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: verticalScale(2) },
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(6),
    elevation: 4,
  },
  LandingPageHeroTitle: {
    fontSize: moderateScale(22),
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: verticalScale(8),
    textAlign: 'center',
  },
  LandingPageHeroSubtitle: {
    fontSize: moderateScale(15),
    color: '#ffe0e0',
    textAlign: 'center',
    lineHeight: verticalScale(22),
    marginBottom: verticalScale(16),
  },
  LandingPageFeaturesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  LandingPageFeature: {
    alignItems: 'center',
    marginHorizontal: scale(10),
  },
  LandingPageFeatureIcon: {
    fontSize: moderateScale(30),
    color: '#fff',
    marginBottom: verticalScale(6),
  },
  LandingPageFeatureText: {
    fontSize: moderateScale(13),
    color: '#fff',
    textAlign: 'center',
    fontWeight: '500',
  },
  LandingPageActionSection: {
    paddingHorizontal: scale(30),
    marginTop: verticalScale(20),
    width: '100%',
    alignItems: 'center',
  },
  LandingPageLoginButton: {
    backgroundColor: '#e53935',
    paddingVertical: verticalScale(14),
    borderRadius: moderateScale(30),
    width: '100%',
    marginBottom: verticalScale(15),
    alignItems: 'center',
  },
  LandingPageLoginButtonText: {
    color: '#fff',
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  },
  LandingPageSignUpButton: {
    backgroundColor: '#fff',
    borderWidth: scale(2),
    borderColor: '#e53935',
    paddingVertical: verticalScale(14),
    borderRadius: moderateScale(30),
    width: '100%',
    alignItems: 'center',
  },
  LandingPageSignUpButtonText: {
    color: '#e53935',
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  },

  // ========== Login Screen ==========
  LoginContainer: {
    flex: 1,
    backgroundColor: '#f7f6f7',
    paddingHorizontal: scale(24),
    paddingTop: verticalScale(60),
  },
  toggleButton: {
    position: 'absolute',
    right: scale(15),
    top: verticalScale(12),
    padding: scale(5),
    zIndex: 1,
  },
  toggleText: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
  LoginHeader: {
    alignItems: 'center',
    marginBottom: verticalScale(30),
  },
  LoginLogo: {
    width: scale(90),
    height: scale(90),
    resizeMode: 'contain',
    marginBottom: verticalScale(10),
  },
  LoginTitle: {
    fontSize: moderateScale(26),
    fontWeight: 'bold',
    color: '#e53935',
  },
  LoginSubtitle: {
    fontSize: moderateScale(15),
    color: '#555',
    marginTop: verticalScale(4),
  },
  LoginForm: {
    flex: 1,
    backgroundColor: '#fff',
    padding: scale(20),
    borderRadius: moderateScale(12),
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: verticalScale(2) },
    shadowRadius: moderateScale(5),
    maxHeight: verticalScale(625),
  },
  LoginInputContainer: {
    marginBottom: verticalScale(16),
  },
  LoginLabel: {
    fontSize: moderateScale(14),
    color: '#333',
    marginBottom: verticalScale(4),
  },
  LoginInput: {
    height: verticalScale(44),
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: moderateScale(8),
    paddingHorizontal: scale(12),
    backgroundColor: '#fafafa',
    fontSize: moderateScale(15),
  },
  LoginButton: {
    backgroundColor: '#e53935',
    paddingVertical: verticalScale(12),
    borderRadius: moderateScale(8),
    alignItems: 'center',
    marginTop: verticalScale(10),
  },
  LoginButtonText: {
    color: '#fff',
    fontSize: moderateScale(16),
    fontWeight: '600',
  },
  LoginForgotButton: {
    marginTop: verticalScale(25),
    alignItems: 'center',
  },
  LoginForgotText: {
    fontSize: moderateScale(13),
    color: '#e53935',
    textAlign: 'center',
  },
  LoginSignUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: verticalScale(25),
  },
  LoginNormalText: {
    fontSize: moderateScale(14),
    color: '#444',
  },
  LoginLinkText: {
    fontSize: moderateScale(14),
    color: '#e53935',
    fontWeight: 'bold',
  },
  // ========== History Screen ==========
  historyTitle: {
    fontSize: moderateScale(24),
    fontWeight: 'bold',
    color: '#e53935',
    textAlign: 'center',
    marginVertical: verticalScale(20),
  },
  card: {
    width: '90%',
    backgroundColor: '#ffffff',
    marginVertical: verticalScale(10),
    padding: scale(16),
    borderRadius: moderateScale(12),
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: verticalScale(2) },
    shadowOpacity: 0.08,
    shadowRadius: moderateScale(4),
    elevation: 2,
  },
  name: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: '#e53935',
    marginBottom: verticalScale(4),
  },
  date: {
    fontSize: moderateScale(16),
    color: '#999',
    marginBottom: verticalScale(8),
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bloodTypeBox: {
    backgroundColor: '#e53935',
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(4),
    borderRadius: moderateScale(8),
    marginRight: scale(12),
  },
  bloodTypeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: moderateScale(16),
  },
  place: {
    fontSize: moderateScale(14),
    color: '#444',
    flexShrink: 1,
  },

  // ======== History List Screen ========
  historyListLabel: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    marginTop: verticalScale(10),
    color: '#333',
  },
  historyListValue: {
    fontWeight: 'normal',
    color: '#555',
  },
  historyListButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: verticalScale(15),
  },
  historyListButton: {
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(20),
    borderRadius: moderateScale(8),
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


import { StyleSheet } from "react-native";
import { scale, verticalScale, moderateScale } from '../../utils/responsive';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: scale(20),
    backgroundColor: '#f4f4f4',
  },
  inputContainer: {
    position: 'relative',
    marginBottom: verticalScale(15),
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
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(10),
  },
  donateheaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(20),
    marginBottom: verticalScale(10),
  },
  menuButton: {
    position: 'absolute',
    top: verticalScale(40),
    left: scale(20),
    padding: scale(10),
  },
  menuIcon: {
    width: scale(28),
    height: scale(28),
    tintColor: '#e53935',
  },
  logo: {
    width: scale(50),
    height: scale(50),
    borderRadius: moderateScale(25),
    marginRight: scale(10),
    resizeMode: 'cover',
  },
  organizationName: {
    fontSize: moderateScale(24),
    fontWeight: 'bold',
    color: '#e53935',
  },
  title: {
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    marginBottom: verticalScale(20),
    alignSelf: 'center',
    color: '#e53935',
  },
  input: {
    backgroundColor: '#fff',
    padding: scale(12),
    paddingRight: scale(60),
    borderRadius: moderateScale(8),
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: verticalScale(15),
  },
  label: {
    fontWeight: '600',
    marginBottom: verticalScale(5),
    marginTop: verticalScale(10),
  },
  picker: {
    backgroundColor: '#fff',
    marginBottom: verticalScale(15),
    borderRadius: moderateScale(8),
    borderColor: '#ccc',
    borderWidth: 1,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: moderateScale(16),
    marginTop: verticalScale(15),
    marginBottom: verticalScale(8),
  },
  checkboxContainer: {
    marginBottom: verticalScale(10),
  },
  checkboxLabel: {
    fontSize: moderateScale(16),
    color: '#333',
  },
  uploadButton: {
    backgroundColor: '#ddd',
    padding: scale(12),
    alignItems: 'center',
    borderRadius: moderateScale(8),
    marginBottom: verticalScale(10),
  },
  imagePreviewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: verticalScale(15),
  },
  imagePreview: {
    width: scale(100),
    height: scale(100),
    borderRadius: moderateScale(8),
    marginRight: scale(10),
    marginBottom: verticalScale(10),
  },
  button: {
    backgroundColor: '#e53935',
    padding: scale(15),
    borderRadius: moderateScale(8),
    alignItems: 'center',
    marginTop: verticalScale(15),
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

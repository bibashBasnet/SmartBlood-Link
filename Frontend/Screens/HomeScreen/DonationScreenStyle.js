
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    resizeMode: 'cover',
  },
  organizationName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e53935',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
    color: '#e53935',
  },
  label: {
    fontWeight: '600',
    marginBottom: 5,
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    fontSize: 15,
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 15,
    marginBottom: 8,
  },
  checkboxContainer: {
    marginBottom: 10,
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#333',
  },
  consentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  uploadButton: {
    backgroundColor: '#ddd',
    padding: 12,
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 10,
  },
  imagePreviewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#e53935',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

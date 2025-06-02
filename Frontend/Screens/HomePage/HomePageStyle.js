import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 80
  },
  menuButton: {
    position: 'absolute',
    top: 50,
    left: 20,
  },
  menuIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
    resizeMode: 'contain',
    marginTop: 500
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 30,
    padding: 10,
    height: 200,
    width: 300
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
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
    textAlign: 'center'
  },
  text: {
    fontSize: 14
  }
});
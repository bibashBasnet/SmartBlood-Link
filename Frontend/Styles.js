import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f6f7',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    // paddingTop: 80
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    position: 'absolute',
    top: 40
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
    width: 200,
    height: 200,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 30,
    padding: 10,
    height: 200,
    width: 300
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 5
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
    fontSize: 16
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
    marginTop: 50
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
    paddingVertical: 12,
    paddingHorizontal: 4,
    backgroundColor: '#f9f9f9',
    marginBottom: 8,
    borderRadius: 8,
    elevation: 1, // for light shadow on Android
    shadowColor: '#000', // for light shadow on iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    justifyContent:'center',
    alignContent:'center'
  },
  cell: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  header: {
    fontWeight: 'bold',
  },

  table: {
    marginTop: -100,
    height: 350,
    width: 350,
    backgroundColor: '#f7f6f7'
  },

  logo: {
    width: 50,
    height: 50,
    borderRadius: 25, // half of width/height to make it circular
    marginRight: 10,
    resizeMode: 'cover',
  },
  organizationName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e53935',
  },
});

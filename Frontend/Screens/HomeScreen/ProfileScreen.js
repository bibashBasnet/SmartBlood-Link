import React, { useContext, useEffect, useState } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DrawerActions, useRoute } from '@react-navigation/native';
import { styles } from '../../Styles';
import logo from '../../assets/logo.png';
import { UserContext } from '../../Context/UserContext';

const ProfileScreen = ({ navigation }) => {

  const {user} = useContext(UserContext);

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [type, setType] = useState('-');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('9800000000');
  const [age, setAge] = useState();
  const [email, setEmail] = useState('');


  useEffect(() => {
    if (user) {
      setName(user.name);
      setAddress(user.address || 'Unknown');
      setType(user.bloodType || '-');
      setGender(user.gender || 'N/A');
      setPhone(user.phone || 'N/A');
      setAge(user.age || '-');
      setEmail(user.email || 'N/A');
    }
  }, [user]);

  const showMenu = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <SafeAreaView style={styles.container}>

      {/* Menu Button */}
      <TouchableOpacity style={styles.menuButton} onPress={showMenu}>
        <Image source={require('../../assets/list.png')} style={styles.menuIcon} />
      </TouchableOpacity>

      {/* Header */}
      <View style={styles.headerContainer}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.organizationName}>Smart BloodLink Nepal</Text>
      </View>

      {/* Profile Image */}
      <View style={styles.profileImageContainer}>
        {/* Placeholder for profile image */}
        <Image
          // source={require('../../assets/profile.png')} // or a default avatar
          style={styles.profileImage}
        />
      </View>

      {/* User Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Name: {name}</Text>
        <Text style={styles.infoText}>Phone: {phone}</Text>
        <Text style={styles.infoText}>Address: {address}</Text>
        <Text style={styles.infoText}>Gender: {gender}</Text>
        <Text style={styles.infoText}>Age: {age}</Text>
        <Text style={styles.infoText}>Email: {email}</Text>
        <Text style={styles.infoText}>Blood Type: {type}</Text>
      </View>

      {/* Edit Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
};

// export const styles = StyleSheet.create({


//   // Header Section
//   headerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 20,
//     marginBottom: 10,
//   },
//   logo: {
//     width: 40,
//     height: 40,
//     resizeMode: 'contain',
//     marginRight: 10,
//   },
//   organizationName: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#e53935',
//   },

//   // Menu
//   menuButton: {
//     position: 'absolute',
//     top: 40,
//     left: 20,
//     padding: 8,
//   },
//   menuIcon: {
//     width: 26,
//     height: 26,
//     tintColor: '#e53935',
//   },

//   // Profile Image
//   profileImageContainer: {
//     alignSelf: 'center',
//     width: 140,
//     height: 140,
//     borderRadius: 70,
//     backgroundColor: '#fff',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginVertical: 20,
//     borderWidth: 3,
//     borderColor: '#e53935',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 5,
//     elevation: 5,
//   },

//   profileImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     resizeMode: 'cover',
//   },

//   // Info Box
//   infoContainer: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.08,
//     shadowRadius: 4,
//     elevation: 2,
//     width: '100%',
//   },

//   infoText: {
//     fontSize: 16,
//     color: '#333',
//     marginBottom: 12,
//     fontWeight: '600',
//   },

//   // Edit Button (Optional)
//   button: {
//     backgroundColor: '#e53935',
//     paddingVertical: 12,
//     borderRadius: 30,
//     marginTop: 30,
//     alignItems: 'center',
//     alignSelf: 'center',
//     width: '60%',
//     elevation: 4,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });


export default ProfileScreen

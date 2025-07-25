import React from 'react'
import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { DrawerActions } from '@react-navigation/native'
import { styles } from '../../Styles'
import logo from '../../assets/logo.png'

const HomeScreen = ({navigation}) => {

  const showMenu = () => {
    navigation.dispatch(DrawerActions.openDrawer())
  }

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.headerContainer}>
        <Text style={styles.organizationName}>Smart BloodLink Nepal</Text>
      </View>

      <TouchableOpacity style={styles.menuButton} onPress={showMenu}>
        <Image source={require('../../assets/list.png')} style={styles.menuIcon} />
      </TouchableOpacity>
      <Image source={require('../../assets/logo.png')} style={styles.homeLogo} />


      <View style={styles.textContainer}>
        <Text style={styles.title}>Donate Blood</Text>
        <Text style={styles.subtitle}>Save a Life</Text>
        <Text style={styles.text}>Your Donation Can Make A Difference.</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Donate")}>
      <Text style={styles.buttonText}>Donate Now</Text>
      </TouchableOpacity>

    </SafeAreaView>
    
  )
}

export default HomeScreen

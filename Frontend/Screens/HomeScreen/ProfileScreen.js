import React, { useState } from 'react'
import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { DrawerActions } from '@react-navigation/native'
import { styles } from '../../Styles'
import logo from '../../assets/logo.png'

const ProfileScreen = ({navigation}) => {

  const [name, setName] = useState('Bibash Basnet')
  const [address, setAddress] = useState('Kathmandu')
  const [type, setType] = useState('-')
  const [gender, setGender] = useState('Male')
  const [phone, setPhone] = useState('98000000000')

  const showMenu = () => {
    navigation.dispatch(DrawerActions.openDrawer())
  }
  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.headerContainer}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.organizationName}>Smart BloodLink Nepal</Text>
      </View>

      <TouchableOpacity style={styles.menuButton} onPress={showMenu}>
        <Image source={require("../../assets/list.png")} style={styles.menuIcon} />
      </TouchableOpacity>
      <SafeAreaView style={styles.profileImageContainer}>
        
        {/* <Image source={require()}/> */}
      </SafeAreaView>
      <SafeAreaView style={styles.infoContainer}>
        <Text style={styles.infoText}>Name: {name}</Text>
        <Text style={styles.infoText}>Address: {address}</Text>
        <Text style={styles.infoText}>Phone No: {phone}</Text>
        <Text style={styles.infoText}>Gender: {gender}</Text>
        <Text style={styles.infoText}>Blood Type: {type}</Text>
      </SafeAreaView>
    </SafeAreaView>
  )
}

export default ProfileScreen

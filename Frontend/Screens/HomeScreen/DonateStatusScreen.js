import React, { useContext } from 'react'
import { Image, View, TouchableOpacity, Text } from 'react-native'
import { styles } from '../../Styles'
import logo from '../../assets/logo.png'
import { DrawerActions } from '@react-navigation/native'
import { Context } from '../../Context/Context'




const DonateStatusScreen = ({navigation}) => {
   const {donate} = useContext(Context)

    console.log("Donate status",donate.status)
      const showMenu = () => {
    navigation.dispatch(DrawerActions.openDrawer())
  }

 

  return (
    <View style={styles.container}>
    
          <View style={styles.headerContainer}>
              <Image source={logo} style={styles.logo} />
              <Text style={styles.organizationName}>Smart BloodLink Nepal</Text>
            </View>
    
          <TouchableOpacity style={styles.menuButton} onPress={showMenu}>
            <Image source={require('../../assets/list.png')} style={styles.menuIcon} />
          </TouchableOpacity>

        <Text style={styles.historyTitle}>My Donation Request</Text>
          
    
          <View style={[styles.LoginForm, {marginTop: 50}]}>
            <View>
            <Text style={styles.infoText}>Name: {donate.name}</Text>
            <Text style={styles.infoText}>Age: {donate.age}</Text>
            <Text style={styles.infoText}>Gender: {donate.gender}</Text>
            <Text style={styles.infoText}>Address: {donate.address}</Text>
            <Text style={styles.infoText}>Email: {donate.email}</Text>
            <Text style={styles.infoText}>Phone No: {donate.phone}</Text>
            <Text style={styles.infoText}>Phone No: {donate.bloodGroup}</Text>
            <Text style={styles.infoText}>Emergency Contact No: {donate.emergencyContact}</Text>
          </View>
          <View>
            <Text style={styles.infoText}>Weight: {donate.weight}</Text>
            <Text style={styles.infoText}>Last Donation Date: {donate.lastDonationDate}</Text>
            <Text style={styles.infoText}>Allergies: {donate.allergies}</Text>
          </View>
          <Text style={styles.infoText}>Preferred Time: {donate.preferredDate}</Text>
          <Text style={styles.infoText}>Status: {donate.status}</Text>

            
          </View>
    
        </View>
  )
}

export default DonateStatusScreen

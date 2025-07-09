import React, { useContext, useEffect } from 'react'
import { Image, View, TouchableOpacity, Text } from 'react-native'
import { styles } from '../../Styles'
import logo from '../../assets/logo.png'
import { DrawerActions } from '@react-navigation/native'
import { Context } from '../../Context/Context'
import axios from 'axios'
import Constants from 'expo-constants'




const DonateStatusScreen = ({navigation}) => {

  const API_URL = Constants.expoConfig.extra.apiUrl

   const {donate, setIsForm, setDonate, setCoordinate} = useContext(Context)
  const showMenu = () => {
    navigation.dispatch(DrawerActions.openDrawer())
  }

  useEffect(() => {
    setIsForm(false)
  }, [])
    const handlePress= () => {
    navigation.navigate("Map", {from: 'Donate'})
  }

  const handlePressCancel = async () => {
    try{
      const res = await axios.delete(`${API_URL}/donate/delete`, {
        params: {
          createdBy: donate.createdBy
        }
      })
      if(res){
        setDonate(null);
        setCoordinate({
          latitude: 27.6949,
          longitude: 85.2899
        })
        alert(res.data)
        navigation.replace("DonateScreen")
      }
    }catch(e){
      console.log(e.message)
    }
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
          
    
          <View style={[styles.LoginForm, {marginTop: -20}]}>
            <View>
            <Text style={styles.infoText}>Name: {donate?.name}</Text>
            <Text style={styles.infoText}>Age: {donate?.age}</Text>
            <Text style={styles.infoText}>Gender: {donate?.gender}</Text>
            <Text style={styles.infoText}>Address: {donate?.address}</Text>
            <Text style={styles.infoText}>Email: {donate?.email}</Text>
            <Text style={styles.infoText}>Phone No: {donate?.phone}</Text>
            <Text style={styles.infoText}>Blood Type: {donate?.bloodGroup}</Text>
            <Text style={styles.infoText}>Emergency Contact No: {donate?.emergencyContact}</Text>
          </View>
          <View>
            <Text style={styles.infoText}>Weight: {donate?.weight}</Text>
            <Text style={styles.infoText}>Last Donation Date: {donate?.lastDonationDate}</Text>
            <Text style={styles.infoText}>Allergies: {donate?.allergies}</Text>
          </View>
          <Text style={styles.infoText}>Preferred Time: {donate?.preferredDate}</Text>
          <Text style={styles.infoText}>Status: {donate?.status}</Text>
          <Text style={styles.infoText}>Requested BloodBank: {donate?.bloodBankName}</Text>
          <TouchableOpacity style={styles.button} onPress={handlePress}><Text style={styles.buttonText}>Map</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handlePressCancel}><Text style={styles.buttonText}>Cancel</Text></TouchableOpacity>



            
          </View>
    
        </View>
  )
}

export default DonateStatusScreen

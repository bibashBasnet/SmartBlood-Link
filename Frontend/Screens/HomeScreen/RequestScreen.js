import React, { useContext, useEffect, useState } from 'react'
import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { DrawerActions } from '@react-navigation/native'
import logo from '../../assets/logo.png'

import { styles } from '../../Styles'
import axios from 'axios'
import Constants from 'expo-constants'
import App from '../../App'
import { Context } from '../../Context/Context'

const RequestScreen = ({navigation}) => {

  const {user} = useContext(Context)

  const API_URL = Constants.expoConfig.extra.apiUrl;

      // const [date, setDate] = useState(['April 13, 2024', 'September 19, 2002', 'January 05, 2021'])
      // const [address, setAddress] = useState(['Kathmandu', 'Kathmandu', 'Kathmandu'])
      // const [type, setTyep] = useState(['A+', 'A-', 'B+'])
      // const [status, setStatus] = useState(['Pick up', 'On way', 'Waiting'])

    const [requestList, setRequestList] = useState([])

    useEffect(() => {
      console.log(user.id)
      axios.get(`${API_URL}/requests/getRequest`,{
        params: {
          id : user.id
        }
      })
      .then(res => {
        if(res.data && Array.isArray(res.data)){
          console.log(res.data)
          setRequestList(res.data)
        }
      })
      .catch(e =>{
        alert("RequestScreen: " + e.message)
      })
    },[])


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

        <Text>
            
        </Text>

        <Text style={[styles.historyTitle, {marginTop: 50}]}>My Request List</Text>
                <View>
                  {requestList.map((item, i) => (
                  <View key= {i} style={styles.card}>
                    <Text style={styles.name}>{item.time}</Text>
                    <Text style={styles.date}>{item.location}</Text>
                    <View style={styles.detailsRow}>
                      <View style={styles.bloodTypeBox}>
                        <Text style={styles.bloodTypeText}>{item.type}</Text>
                      </View>
                      <Text style={styles.name}>Status: {item.status}</Text>
                    </View>
                  </View>
                  ))}
                </View>
                <View style={[styles.card, {alignItems: "center"}]}>
                    <Image source={require("../../assets/plus.png")} style={{width: 25, height: 25}}/>
                </View>

    </SafeAreaView>
  )
}

export default RequestScreen

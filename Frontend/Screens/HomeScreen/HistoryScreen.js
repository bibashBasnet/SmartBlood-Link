import React, { useContext, useEffect, useState } from 'react'
import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { styles } from '../../Styles'
import { DrawerActions } from '@react-navigation/native'
import logo from '../../assets/logo.png'
import Constants from 'expo-constants'
import { Context } from '../../Context/Context'
import axios from 'axios'
import { ScrollView } from 'react-native-gesture-handler'



const HistoryScreen = ({navigation}) => {

  const {user} = useContext(Context);

  const API_URL = Constants.expoConfig.extra.apiUrl

  const [historyList, setHistoryList] = useState([])

  useEffect(()=>{
    axios.get(`${API_URL}/donationHistory/get`, {
      params: {
        id: user.id
      }
    })
    .then(res =>{
        if(res.data && Array.isArray(res.data)){
          setHistoryList(res.data)
    }})
    .catch(e => {alert("History List " + e.message)})
  },[])

    const showMenu = () => {
        navigation.dispatch(DrawerActions.openDrawer())
    }
  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.headerContainer}>
          <Text style={styles.organizationName}>Smart BloodLink Nepal</Text>
        </View>

        <TouchableOpacity style={styles.menuButton} onPress={showMenu}>
            <Image source={require("../../assets/list.png")} style={styles.menuIcon} />
        </TouchableOpacity>

        <Text style={styles.historyTitle}>My Donation History</Text>
        <View style={{flex: 1, maxHeight: 670}}>
        <ScrollView style={{}}>
          {historyList.map((item, i) => (
            <View key = {i} style={styles.card}>
              <Text style={[styles.location, styles.name]}>Location: {item.location}</Text>
              <Text style={styles.date}>Time: {item.time}</Text>
              <Text>Status: {item.status}</Text>
            </View>
        ))}
        </ScrollView>
        </View>


        
        
    </SafeAreaView>
  )
}

export default HistoryScreen

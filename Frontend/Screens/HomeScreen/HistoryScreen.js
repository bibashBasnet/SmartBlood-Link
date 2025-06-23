import React, { useState } from 'react'
import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { styles } from '../../Styles'
import { DrawerActions } from '@react-navigation/native'
import logo from '../../assets/logo.png'


const HistoryScreen = ({navigation}) => {

  const [date, setDate] = useState([1,4,3, 4])
  const [location, setLocation] = useState(['kathmandu', 'kathmandu', 'kathmandy', 'Pokhara'])
  const [status, setStatus] = useState(['Accepted','Accepted', 'In-progress'])

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

        <Text style={styles.historyTitle}>History Of Donation</Text>


        <View>
          {date.map((d, i) => (
            <View style={styles.card}>
              <Text style={[styles.location, styles.name]}>Location: {location[i]}</Text>
              <Text style={styles.date}>Time: {d}</Text>
              <Text>Status: {status[i]}</Text>
            </View>
        ))}
        </View>
        
        
    </SafeAreaView>
  )
}

export default HistoryScreen

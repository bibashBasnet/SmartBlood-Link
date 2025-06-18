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

        
        <View style={styles.table}>
          <View style={styles.row}>
            <Text style={[styles.cell, styles.header]}>Date</Text>
            <Text style={[styles.cell, styles.header]}>Location</Text>
            <Text style={[styles.cell, styles.header]}>Status</Text>
          </View>
          {date.map((d, i) => (
          <View key = {i}style={styles.row}>
            <Text style={styles.cell}>{d}</Text>
            <Text style={styles.cell}>{location[i]}</Text>
            <Text style={styles.cell}>{status[i]}</Text>
          </View>
          ))}
        </View>
        
    </SafeAreaView>
  )
}

export default HistoryScreen

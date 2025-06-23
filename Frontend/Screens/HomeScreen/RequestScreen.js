import React, { useState } from 'react'
import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { DrawerActions } from '@react-navigation/native'
import logo from '../../assets/logo.png'

import { styles } from '../../Styles'

const RequestScreen = ({navigation}) => {

      const [date, setDate] = useState(['April 13, 2024', 'September 19, 2002', 'January 05, 2021'])
      const [address, setAddress] = useState(['Kathmandu', 'Kathmandu', 'Kathmandu'])
      const [type, setTyep] = useState(['A+', 'A-', 'B+'])
      const [status, setStatus] = useState(['Pick up', 'On way', 'Waiting'])


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
        <Text style={[styles.historyTitle, {marginTop: 50}]}>Request History List</Text>
                <View>
                  {date.map((d, i) => (
                  <View key= {d} style={styles.card}>
                    <Text style={styles.name}>{d}</Text>
                    <Text style={styles.date}>{address[i]}</Text>
                    <View style={styles.detailsRow}>
                      <View style={styles.bloodTypeBox}>
                        <Text style={styles.bloodTypeText}>{type[i]}</Text>
                      </View>
                      <Text style={styles.name}>Status: {status[i]}</Text>
                    </View>
                  </View>
                  ))}
                </View>
                <View style={[styles.card, {alignItems: "center"}]} onPress={() => navigation.navigate()}>
                    <Image source={require("../../assets/plus.png")} style={{width: 25, height: 25}}/>
                </View>
    </SafeAreaView>
  )
}

export default RequestScreen

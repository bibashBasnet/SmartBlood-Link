import React, { useState } from 'react'
import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { DrawerActions } from '@react-navigation/native'
import logo from '../../assets/logo.png'

import { styles } from '../../Styles'

const RequestListScreen = ({navigation}) => {

  const [date, setDate] = useState(['April 13, 2024', 'September 19, 2002', 'January 05, 2021'])
  const [name, setName] = useState(['Ram', 'Shyam', 'Sita'])
  const [address, setAddress] = useState(['Kathmandu', 'Kathmandu', 'Kathmandu'])
  const [type, setTyep] = useState(['A+', 'A-', 'B+'])

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

        <Text style={[styles.historyTitle, {marginTop: 50}]}>Blood Request List</Text>
        <View>
          {date.map((d, i) => (
          <View style={styles.card}>
            <Text style={styles.name}>{name[i]}</Text>
            <Text style={styles.date}>{d}</Text>
            <View style={styles.detailsRow}>
              <View style={styles.bloodTypeBox}>
                <Text style={styles.bloodTypeText}>{type[i]}</Text>
              </View>
              <Text style={styles.place}>{address[i]}</Text>
            </View>
          </View>
          ))}
        </View>




    </SafeAreaView>
  )
}

export default RequestListScreen

import React, { useState } from 'react'
import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { DrawerActions } from '@react-navigation/native'
import logo from '../../assets/logo.png'

import { styles } from '../../Styles'

const RequestListScreen = ({navigation}) => {

  const [date, setDate] = useState([1,2,3])
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
        
        <View style={styles.table}>
          <View style={styles.row}>
              <Text style={[styles.cell, styles.header]}>Date</Text>
              <Text style={[styles.cell, styles.header]}>Name</Text>
              <Text style={[styles.cell, styles.header]}>Address</Text>
              <Text style={[styles.cell, styles.header]}>Type</Text>
              <Text style={[styles.cell, styles.header]}></Text>
            </View>
              {date.map((d, i) => (
              <View key={i} style={styles.row}>
                <Text style={styles.cell}>{d}</Text>
                <Text style={styles.cell}>{name[i]}</Text>
                <Text style={styles.cell}>{address[i]}</Text>
                <Text style={styles.cell}>{type[i]}</Text>
                <Text style={styles.cell}>
                  <TouchableOpacity>See More</TouchableOpacity>
                </Text>
              </View>
              ))}
          </View>

    </SafeAreaView>
  )
}

export default RequestListScreen

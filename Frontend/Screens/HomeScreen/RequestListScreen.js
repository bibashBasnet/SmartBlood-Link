import React, { useEffect, useState } from 'react'
import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { DrawerActions, useRoute } from '@react-navigation/native'
import logo from '../../assets/logo.png'

import { styles } from '../../Styles'

const RequestListScreen = ({navigation}) => {

  const [date, setDate] = useState(['April 13, 2024', 'September 19, 2002', 'January 05, 2021'])
  const [name, setName] = useState(['Ram', 'Shyam', 'Sita'])
  const [address, setAddress] = useState(['Kathmandu', 'Kathmandu', 'Kathmandu'])
  const [type, setTyep] = useState(['A+', 'A-', 'B+'])

  const [selectedIndex, setSelectedIndex] = useState(null)

  const showDetail = (i) => {
    if(selectedIndex === null)
      {setSelectedIndex(i)} 
    else if(selectedIndex === i)
      {setSelectedIndex(null)}
  }

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
            <TouchableOpacity onPress={() => {showDetail(i)}}>
              <View key= {d} style={styles.card} >
            <Text style={styles.name}>{name[i]}</Text>
            <Text style={styles.date}>{d}</Text>
            <View style={styles.detailsRow}>
              <View style={styles.bloodTypeBox}>
                <Text style={styles.bloodTypeText}>{type[i]}</Text>
              </View>
              <Text style={styles.place}>{address[i]}</Text>
            </View>
            {selectedIndex === i && (
              <View>
                <Text>Date: 19 may, 2021</Text>
                      <Text>Name: Bibash Basnet</Text>
                      <Text>Address: Kathmandu</Text>
                      <Text>Type: B+</Text>
                      <Text>Phone No: 938324342</Text>
                      <Text>Email: abc32@gmail.com</Text>
              </View>
            )}
          </View>
          </TouchableOpacity>
          
          ))}
        </View>




    </SafeAreaView>
  )
}

export default RequestListScreen

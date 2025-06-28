import React from 'react'
import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { DrawerActions } from '@react-navigation/native'
import logo from '../../assets/logo.png'

import { styles } from '../../Styles'

const RequestScreen = ({navigation}) => {
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
    </SafeAreaView>
  )
}

export default RequestScreen

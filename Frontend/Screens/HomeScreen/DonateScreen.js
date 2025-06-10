import React from 'react'
import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { DrawerActions } from '@react-navigation/native'

import { styles } from '../../Styles'

const DonateScreen = ({navigation}) => {
    const showMenu = () => {
        navigation.dispatch(DrawerActions.openDrawer())
    }
  return (
    <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.menuButton} onPress={showMenu}>
                <Image source={require("../../assets/list.png")} style={styles.menuIcon} />
        </TouchableOpacity>
        <Text>
         DonateScreen
        </Text>
    </SafeAreaView>
  )
}

export default DonateScreen

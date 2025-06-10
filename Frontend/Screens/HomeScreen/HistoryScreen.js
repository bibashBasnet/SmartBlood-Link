import React from 'react'
import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { styles } from '../../Styles'
import { DrawerActions } from '@react-navigation/native'


const HistoryScreen = ({navigation}) => {
    const showMenu = () => {
        navigation.dispatch(DrawerActions.openDrawer())
    }
  return (
    <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.menuButton} onPress={showMenu}>
            <Image source={require("../../assets/list.png")} style={styles.menuIcon} />
        </TouchableOpacity>
        <Text>
         History Screen
        </Text>
    </SafeAreaView>
  )
}

export default HistoryScreen

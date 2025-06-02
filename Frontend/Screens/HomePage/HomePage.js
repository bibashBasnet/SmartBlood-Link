import React from 'react'
import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { styles } from './HomePageStyle'

const HomePage = () => {
  return (
    <SafeAreaView style={styles.container}>

      <TouchableOpacity style={styles.menuButton}>
        <Image source={require('../../assets/list.png')} style={styles.menuIcon} />
      </TouchableOpacity>

      <Image source={require('../../assets/logo.png')} style={styles.logo} />

      <View style={styles.textContainer}>
        <Text style={styles.title}>Donate Blood</Text>
        <Text style={styles.subtitle}>Save a Life</Text>
        <Text style={styles.text}>Your Donation Can Make A Difference.</Text>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Donate Now</Text>
      </TouchableOpacity>

      <Text style={{color: '#000', fontSize: 18}}>Hello</Text>

    </SafeAreaView>
    
  )
}

export default HomePage

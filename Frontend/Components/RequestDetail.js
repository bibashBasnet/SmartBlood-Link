import React from 'react'
import { Text, View } from 'react-native'
import { styles } from '../Styles'

const RequestDetail = ({navigation}) => {
  return (
    <View style={styles.card}>
        <Text>Date: 19 may, 2021</Text>
      <Text>Name: Bibash Basnet</Text>
      <Text>Address: Kathmandu</Text>
      <Text>Type: B+</Text>
      <Text>Phone No: 938324342</Text>
      <Text>Email: abc32@gmail.com</Text>
      <Text></Text>
    </View>
  )
}

export default RequestDetail

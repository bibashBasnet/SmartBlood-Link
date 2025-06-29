import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, Text, TouchableOpacity, View, Alert } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import logo from '../../assets/logo.png';
import { styles } from '../../Styles';
import Constants from 'expo-constants';
import axios from 'axios';

const RequestListScreen = ({ navigation }) => {
  const API_URL = Constants.expoConfig.extra.apiUrl;
  const [requestList, setRequestList] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_URL}/requestList/get`)
      .then((res) => {
        if (res.data && Array.isArray(res.data)) {
          setRequestList(res.data);
        }
      })
      .catch((e) => {
        Alert.alert('RequestList Screen Error', e.message);
      });
  }, []);

  const showDetail = (i) => {
    setSelectedIndex(selectedIndex === i ? null : i);
  };

  const showMenu = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.organizationName}>Smart BloodLink Nepal</Text>
      </View>

      <TouchableOpacity style={styles.menuButton} onPress={showMenu}>
        <Image source={require('../../assets/list.png')} style={styles.menuIcon} />
      </TouchableOpacity>

      <Text style={[styles.historyTitle, { marginTop: 50 }]}>Blood Request List</Text>

      <View>
        {requestList.map((item, i) => (
          <TouchableOpacity key={i} onPress={() => showDetail(i)}>
            <View style={styles.card}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.date}>{item.time}</Text>
              <View style={styles.detailsRow}>
                <View style={styles.bloodTypeBox}>
                  <Text style={styles.bloodTypeText}>{item.bloodType}</Text>
                </View>
                <Text style={styles.place}>{item.address}</Text>
              </View>

              {selectedIndex === i && (
                <View style={{ marginTop: 10 }}>
                  <Text style={styles.historyListLabel}>
  Phone No: <Text style={styles.historyListValue}>{item.phone}</Text>
</Text>
<Text style={styles.historyListLabel}>
  Email: <Text style={styles.historyListValue}>{item.email}</Text>
</Text>

<View style={styles.historyListButtonContainer}>
  <TouchableOpacity style={[styles.historyListButton, styles.historyListAcceptButton]}>
    <Text style={styles.historyListButtonText}>Accept</Text>
  </TouchableOpacity>
  <TouchableOpacity style={[styles.historyListButton, styles.historyListRejectButton]}>
    <Text style={styles.historyListButtonText}>Reject</Text>
  </TouchableOpacity>
</View>

                  
                </View>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default RequestListScreen;

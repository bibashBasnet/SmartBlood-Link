import { View, StyleSheet, Image, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { styles } from '../../Styles';
import logo from '../../assets/logo.png'
import { DrawerActions } from '@react-navigation/native';

const MapScreen = ({navigation}) => {
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
          <Image source={require('../../assets/list.png')} style={styles.menuIcon} />
        </TouchableOpacity>

      <View style={MapStyles.container}>
              <MapView
        style={MapStyles.map}
        region={{
          latitude: 27.7172,
          longitude: 85.3240,
          latitudeDelta: 0.03,
          longitudeDelta: 0.03,
        }}
        showsUserLocation={true}
        provider="google"
      >
        <Marker
          coordinate={{ latitude: 27.7172, longitude: 85.3240 }}
          title="Kathmandu"
          description="Capital of Nepal"
        />
      </MapView>
      </View>

    </SafeAreaView>
  );
};

const MapStyles = StyleSheet.create({
  container: {
    marginTop: 50,
    maxHeight: 700,
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default MapScreen;

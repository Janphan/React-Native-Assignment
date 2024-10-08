import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Button, TextInput, Keyboard, Alert } from 'react-native';
import MyMap from './MyMap';
import { useState, useEffect } from 'react';
import { getAddress } from './mapAPI';
import * as Location from 'expo-location';


export default function App() {
  const [address, setAddress] = useState("")
  const [marker, setMarker] = useState(null);
  const [region, setRegion] = useState({
    latitude: 60.200692,
    longitude: 24.934302,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221,
  })
  const [currentLocation, setCurentLocation] = useState(null);
  // State where location is saved

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('No permission to get location')
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setCurentLocation(location);
      const { latitude, longitude } = location.coords;
      setRegion({
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.0322,
        longitudeDelta: 0.0221,
      });
      setMarker({
        latitude: latitude,
        longitude: longitude,
        title: 'Current Location',
        color: "yellow",
      });
    })();
  }, []);
  const handleShow = async () => {
    try {
      data = await getAddress(address)

      const location = data[0]; // Get the first result
      // const latitude = parseFloat(location.lat);
      // const longitude = parseFloat(location.lon);

      setRegion({
        latitude: parseFloat(location.lat),
        longitude: parseFloat(location.lon),
        latitudeDelta: 0.0322,
        longitudeDelta: 0.0221,
      })
      // Set marker position
      setMarker({
        latitude: parseFloat(location.lat),
        longitude: parseFloat(location.lon),
        // title: location.display_name,
      })
    }
    catch (err) {
      console.error(err);
      Alert.alert('Error', 'Failed to fetch location.');
    }
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          placeholder='Search Address'
          value={address}
          onChangeText={text => setAddress(text)}

        />
        <Button
          title='Show'
          onPress={handleShow}
        />
      </View>
      <MyMap region={region} marker={marker} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
},
);

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Button, TextInput, Keyboard } from 'react-native';
import MyMap from './MyMap';
import { useState } from 'react';
import { getAddress } from './mapAPI';


export default function App() {
  const [address, setAddress] = useState("")
  const [marker, setMarker] = useState(null);
  const [region, setRegion] = useState({
    latitude: 60.200692,
    longitude: 24.934302,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221,
  })
  const handleShow = () => {
    getAddress(address)
    if (data.length === 0) {
      Alert.alert('Error', 'No results found. Please try a different address.');
      return;
    }
    const location = data[0]; // Get the first result
    const lat = parseFloat(location.lat);
    const lon = parseFloat(location.lon);
    setRegion({
      latitude: lat,
      longitude: lon,
      latitudeDelta: 0.0322,
      longitudeDelta: 0.0221,
    })
    // Set marker position
    setMarker({
      latitude: lat,
      longitude: lon,
      title: location.display_name,
    })
      .catch(err => console.error(err))
    Keyboard.dismiss()
  }

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

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

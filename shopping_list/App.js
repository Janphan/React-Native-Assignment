import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList, Alert } from 'react-native';

export default function App() {
  const [toshop, setToShop] = useState("");
  const handleAdd = () => {
    Alert.alert("Button pressed")
  }
  const handleClear = () => {
    Alert.alert("Button pressed")
  }
  return (
    <View style={styles.container}>
      <Text>Simple shopping list app</Text>
      <View style={styles.inputStyle}>
        <TextInput
          value={toshop}
          onChangeText={text => setToShop(text)}
          placeholder="Enter a new item..."
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          onPress={handleAdd} title="Add" />
        <Button
          onPress={handleClear} title="Clear" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 50,
  },
  inputStyle: {
    flext: 1,
    padding: 50,
  },
  buttonContainer: {
    flex: 1,
    padding: 50,
  }
});

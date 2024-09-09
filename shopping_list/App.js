import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList, Alert, Keyboard } from 'react-native';
import ListEmptyComponent from './ListEmptyComponent';

export default function App() {
  const [toshop, setToShop] = useState("");
  const [shoplist, setShoplist] = useState([]);

  const handleAdd = () => {
    // Alert.alert("Button pressed")
    if (toshop.trim().length > 0) {
      setShoplist([...shoplist, { key: String(shoplist.length), content: toshop }]);
      setToShop("");
      console.log(shoplist);
      Keyboard.dismiss();
    } else {
      Alert.alert("Error", "Please enter a valid item");
    }

  }
  const handleClear = () => {
    // Alert.alert("Button pressed")
    setShoplist([]);
    Keyboard.dismiss();
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Simple shopping list app</Text>
      <View style={styles.inputStyle}>
        <TextInput
          value={toshop}
          onChangeText={text => setToShop(text)}
          placeholder="Enter a new item..."
          style={styles.input}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          onPress={handleAdd} title="Add" />
        <Button
          onPress={handleClear} title="Clear" />
      </View>
      <View style={styles.list}>
        <FlatList
          data={shoplist}
          renderItem={({ item }) => <Text>{item.content}</Text>}
          ListEmptyComponent={ListEmptyComponent}
        />
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
    padding: 20,
    marginTop: 50,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  inputStyle: {
    flex: 1,
    padding: 50,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  list: {
    flex: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    width: '100%',
    borderRadius: 5,
  },
});

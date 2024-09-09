import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList, Alert } from 'react-native';
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
    } else {
      Alert.alert("Error", "Please enter a valid item");
    }

  }
  const handleClear = () => {
    // Alert.alert("Button pressed")
    setShoplist([]);
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
    padding: 50,
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
  }
});

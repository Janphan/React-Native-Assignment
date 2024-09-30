import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable, TextInput, FlatList, Alert, Keyboard } from 'react-native';
import ListEmptyComponent from './ListEmptyComponent';
import * as SQLite from 'expo-sqlite';

export default function App() {
  const [toshop, setToShop] = useState({
    product: "",
    amount: "",
  });
  const [shoplist, setShoplist] = useState([]);

  const db = SQLite.openDatabaseSync('shopdb');

  const initialize = async () => {
    try {
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS shoptable (
        id INTEGER PRIMARY KEY NOT NULL, product TEXT, amount TEXT);
      `);
    } catch (error) {
      console.error('Could not open database', error);
    }
  }
  useEffect(() => {
    initialize();
    updateList();
  }, []);

  // const handleAdd = () => {
  //   // Alert.alert("Button pressed")
  //   if (toshop.length > 0) {
  //     setShoplist([...shoplist, { key: String(shoplist.length), content: toshop }]);
  //     setToShop("");
  //     console.log(shoplist);
  //     Keyboard.dismiss();
  //   } else {
  //     Alert.alert("Error", "Please enter a valid item");
  //   }

  // }
  const handleClear = () => {
    // Alert.alert("Button pressed")
    setShoplist([]);
    Keyboard.dismiss();
  }
  const saveItem = async () => {
    try {
      await db.runAsync('INSERT INTO shoptable (product, amount) VALUES (?, ?)', [toshop.product, toshop.amount]);
      console.log("added")
      // Todo: update the shop list
    } catch (error) {
      console.error('Could not add item', error);
    }
  };
  const updateList = async () => {
    try {
      const list = await db.getAllAsync('SELECT * from shoptable');
      setShoplist(list);
      console.log(list)
    } catch (error) {
      console.error('Could not get items', error);
    }
  }
  const deleteItem = async (id) => {
    try {
      await db.runAsync('DELETE FROM shoptable WHERE id=?', id);
      await updateList();
    }
    catch (error) {
      console.error('Could not delete item', error);
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Simple shopping list app</Text>
      <View style={styles.inputStyle}>
        <TextInput
          value={toshop.product}
          onChangeText={text => setToShop({ ...toshop, product: text })}
          placeholder="Enter a new item..."
          style={styles.input}
        />
        <TextInput
          value={toshop.amount}
          onChangeText={text => setToShop({ ...toshop, amount: text })}
          placeholder="Enter a new item..."
          style={styles.input}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.buttonContainer, {
              backgroundColor: pressed ? "darked" : "blue"
            },
          ]}
          onPress={saveItem}
        >
          <Text style={styles.buttonText}>Save</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.buttonContainer, {
              backgroundColor: pressed ? "darked" : "red"
            },
          ]}
          onPress={handleClear}
        >
          <Text style={styles.buttonText}>Clear</Text>
        </Pressable>
      </View>
      <View style={styles.list}>
        <FlatList
          keyExtractor={item => item.id.toString()}
          data={shoplist}
          renderItem={({ item }) =>
            <View style={styles.itemcontainer}>
              <Text>{item.product}</Text>
              <Text>{item.amount} </Text>
              <Text style={{ color: '#0000ff' }} onPress={() => deleteItem(item.id)}>Bought</Text>
            </View>}

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
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
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

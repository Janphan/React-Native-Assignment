import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable, TextInput, FlatList, Alert, Keyboard } from 'react-native';
import ListEmptyComponent from './ListEmptyComponent';
import { app } from './firebaseConfig';
import { getDatabase, ref, push, onValue, remove } from "firebase/database";

const database = getDatabase(app);

export default function App() {
  const [toshop, setToShop] = useState({
    title: "",
    amount: "",
  });
  const [shoplist, setShoplist] = useState([]);

  const handleClear = () => {
    // Alert.alert("Button pressed")
    setShoplist([]);
    const itemsRef = ref(database, '/items');
    remove(itemsRef); // Clear data from Firebase
    Keyboard.dismiss();
  }
  const handleSave = () => {
    console.log(toshop.title + " " + toshop.amount)
    if (toshop.amount && toshop.title) {
      push(ref(database, '/items'), toshop);
      setToShop("");
    }
    else {
      Alert.alert('Error', 'Type product and amount first');
    }
  }
  handleDelete = (id) => {
    const itemRef = ref(database, `/items/${id}`);
    remove(itemRef)
      .then(() => console.log("Item", itemRef, "removed"))
      .catch((error) => console.error('Error removing item:', error));
  }
  useEffect(() => {
    const itemsRef = ref(database, '/items');
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const itemList = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value
        }));
        setShoplist(itemList);
      } else {
        setShoplist([]); // Handle the case when there are no items
      }
    })
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Simple shopping list app</Text>
      <View style={styles.inputStyle}>
        <TextInput
          value={toshop.title}
          onChangeText={text => setToShop({ ...toshop, title: text })}
          placeholder="Enter title"
          style={styles.input}
        />
        <TextInput
          value={toshop.amount}
          onChangeText={text => setToShop({ ...toshop, amount: text })}
          placeholder="Enter amount"
          style={styles.input}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.buttonContainer, {
              backgroundColor: pressed ? "darkblue" : "blue"
            },
          ]}
          onPress={handleSave}
        >
          <Text style={styles.buttonText}>Save</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.buttonContainer, {
              backgroundColor: pressed ? "darkblue" : "red"
            },
          ]}
          onPress={handleClear}
        >
          <Text style={styles.buttonText}>Clear</Text>
        </Pressable>
      </View>
      <View style={styles.list}>
        <FlatList
          data={shoplist}
          renderItem={({ item }) =>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 18 }}>{item.title}, {item.amount}</Text>
              <Text style={{ fontSize: 18, color: "red" }} onPress={() => handleDelete(item.id)}> Delete</Text>
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

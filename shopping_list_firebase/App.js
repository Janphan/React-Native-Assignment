import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable, TextInput, FlatList, Alert, Keyboard } from 'react-native';
import ListEmptyComponent from './ListEmptyComponent';
import { app } from './firebaseConfig';
import { getDatabase, ref, push, onValue, remove } from "firebase/database";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Header, Input, Button, Icon } from "react-native-elements";
import LinearGradient from 'react-native-linear-gradient';

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
    <SafeAreaProvider>
      <View style={styles.container}>
        <Header
          backgroundImageStyle={{}}
          barStyle="default"
          centerComponent={{
            text: "SHOPPING APP",
            style: { color: "#fff" }
          }}
          centerContainerStyle={{}}
          containerStyle={{ width: 350 }}
          leftContainerStyle={{}}
          linearGradientProps={{}}
          placement="center"
          rightContainerStyle={{}}
          statusBarProps={{}}
        />
        <View style={styles.inputStyle}>
          <Input
            containerStyle={styles.input}
            disabledInputStyle={{ background: "#ddd" }}
            inputContainerStyle={{}}
            inputStyle={{}}
            label="Product"
            labelStyle={{}}
            labelProps={{}}
            value={toshop.title}
            onChangeText={text => setToShop({ ...toshop, title: text })}
            placeholder="Enter title"
          />
          <Input
            containerStyle={styles.input}
            disabledInputStyle={{ background: "#ddd" }}
            inputContainerStyle={{}}
            inputStyle={{}}
            label="Amount"
            labelStyle={{}}
            labelProps={{}}
            value={toshop.amount}
            onChangeText={text => setToShop({ ...toshop, amount: text })}
            placeholder="Enter amount"
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            buttonStyle={{ width: 150 }}
            containerStyle={{ margin: 5 }}
            disabledStyle={{
              borderWidth: 2,
              borderColor: "#00F"
            }}
            disabledTitleStyle={{ color: "#00F" }}
            linearGradientProps={null}
            icon={<Icon type="antdesign" name="save" size={15} color="#0FF" />}

            iconContainerStyle={{ background: "#000" }}
            loadingProps={{ animating: true }}
            loadingStyle={{}}
            onPress={handleSave}
            title="Save"
            titleProps={{}}
            titleStyle={{ marginHorizontal: 5 }}
          />
          <Button
            buttonStyle={{ width: 150, backgroundColor: "red" }}
            containerStyle={{ margin: 5 }}
            disabledStyle={{
              borderWidth: 2,
              borderColor: "#00F"
            }}
            disabledTitleStyle={{ color: "#00F" }}
            linearGradientProps={null}
            icon={<Icon type="antdesign" name="delete" size={15} color="#0FF" />}

            iconContainerStyle={{ background: "#000" }}
            loadingProps={{ animating: true }}
            loadingStyle={{}}
            onPress={handleClear}
            title="Clear"
            titleProps={{}}
            titleStyle={{ marginHorizontal: 5 }}
          />
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
    </SafeAreaProvider>
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
  inputStyle: {
    paddingTop: 5,
    width: "100%", // Make the input container take the full screen width
  },
  input: {
    width: '100%',  // Input takes full width
  },
});

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import * as Contacts from 'expo-contacts';
import { useState } from 'react'

export default function App() {
  const [contact, setContact] = useState({});
  const [contacts, setContacts] = useState([]);

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync(
        { fields: [Contacts.Fields.PhoneNumbers] }
      );
      if (data.length > 0) {
        setContacts(data);
        // setContact(data[0]);
      }
    }
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        renderItem={({ item }) => <Text>{item.name}</Text>
        }
      />
      <Button title="Get Contact" onPress={getContacts} />
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

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
        console.log(data)
        // console.log(Object.keys(data[10]).phoneNumbers)
        console.log("Contact data: ", data[0]);
        setContacts(data);
        // setContact(data[0]);
      }
    }
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id} // Use 'id' as the key
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomColor: '#ccc', borderBottomWidth: 1 }}>
            {/* Display the contact name */}
            <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>

            {/* Display the phone numbers if available */}
            {item.phoneNumbers && item.phoneNumbers.map((phone, index) => (
              <Text key={index} style={{ color: 'gray' }}>
                {phone.label}: {phone.number}
              </Text>
            ))}
          </View>
        )}
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

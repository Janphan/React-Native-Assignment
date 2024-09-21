import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Button, Keyboard, Alert, Image } from 'react-native';
import { fetchCurrency, convertCurrency } from './convertAPI';
import { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';

export default function App() {
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState("");
  const [currencies, setCurrencies] = useState([]);  // List of available currencies
  const [selectedCurrency, setSelectedCurrency] = useState(null);  // The selected currency

  // Fetch currency rates from API
  useEffect(() => {
    fetchCurrency()
      .then(availableCurrencies => {
        setCurrencies(availableCurrencies);
        if (availableCurrencies.length > 0) {
          setSelectedCurrency(availableCurrencies[0]);  // Set default currency to the first in the list
        }
      })
      .catch(err => console.error('Error fetching currencies:', err));
  }, []);

  const handleConvert = () => {
    if (!amount) {
      Alert.alert('Error', 'Please enter an amount to convert.');
      return;
    }
    if (!selectedCurrency) {
      Alert.alert('Error', 'Please select a currency.');
      return;
    }
    convertCurrency(amount, "EUR", selectedCurrency)
      .then(convertedValue => {
        setResult(convertedValue);
      })
      .catch(err => console.error(err))
    // setAmount("");
    Keyboard.dismiss();
  }
  useEffect(() => {
    if (result) {
      console.log("Conversion Result:", result);
    }
  }, [result]);  // Log result when it updates
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://nordicapis.com/wp-content/uploads/10-APIs-For-Currency-Exchange-Rates-1024x576.jpg' }}
        style={styles.image}
      />
      <Text>Euro converter</Text>
      <View style={styles.inputRow}>
        <TextInput
          placeholder='Amount'
          // keyboardType='numeric'
          value={amount}
          onChangeText={text => setAmount(text)}
        />
        <Text style={styles.euroSymbol}> €</Text>
      </View>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedCurrency}
          onValueChange={(itemValue) => setSelectedCurrency(itemValue)}
        >
          {currencies.map(currency => (
            <Picker.Item key={currency} label={currency} value={currency} />
          ))}
        </Picker>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Convert" onPress={handleConvert} />
        {result && (
          <Text style={styles.result}>
            {amount} EUR = {result} {selectedCurrency}
          </Text>
        )}
      </View>

      <StatusBar style="auto" />
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 150,
  },
  buttonContainer: {
    flex: 1,
  },
  image: {
    width: 150,  // Adjust the size of the image to your liking
    height: 150,
    marginBottom: 30,
  },
  inputRow: {
    flexDirection: 'row', // This makes TextInput and Euro sign appear in a row (side by side)
    alignItems: 'center',
    marginBottom: 20,
  },
  pickerContainer: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    width: 150,  // Adjust width of the picker container
    justifyContent: 'center',
  },
});

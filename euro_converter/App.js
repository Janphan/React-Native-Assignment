import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Button, Keyboard, Alert } from 'react-native';
import { fetchCurrency, convertCurrency } from './convertAPI';
import { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';

export default function App() {
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState("");
  const [currencies, setCurrencies] = useState([]);  // List of available currencies
  const [selectedCurrency, setSelectedCurrency] = useState();  // The selected currency

  // Fetch currency rates from API
  useEffect(() => {
    fetchCurrency()
      .then(availableCurrencies => {
        setCurrencies(availableCurrencies);
      })
      .catch(err => console.error('Error fetching currencies:', err));
  }, []);

  const handleConvert = () => {
    if (!amount) {
      Alert.alert('Error', 'Please enter an amount to convert.');
      return;
    }
    convertCurrency(amount, selectedCurrency, "EUR")
      .then(convertedValue => {
        setResult(convertedValue);
      })
      .catch(err => console.error(err))
    Keyboard.dismiss()
    console.log(result)
  }
  return (
    <View style={styles.container}>
      <Text>Euro converter</Text>
      <View>
        <TextInput
          placeholder='Input amount to convert'
          // keyboardType='numeric'
          value={amount}
          onChangeText={text => setAmount(text)}
        />
        <Picker
          selectedValue={selectedCurrency}
          onValueChange={(itemValue, itemIndex) => setSelectedCurrency(itemValue)}
        >
          {currencies.map(currency => (
            <Picker.Item key={currency} label={currency} value={currency} />
          ))}
        </Picker>
      </View>
      <View>
        <Button title="Convert" onPress={handleConvert} />
        {result && (
          <Text style={styles.result}>
            {amount} {selectedCurrency} = {result} EUR
          </Text>
        )}
      </View>

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

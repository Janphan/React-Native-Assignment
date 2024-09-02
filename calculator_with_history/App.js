
import { Button, StyleSheet, Text, View, TextInput, Alert, FlatList, Keyboard } from 'react-native';
import { useState, useEffect } from 'react';
import ListEmptyComponent from './ListEmptyComponent';

export default function App() {
  const [number1, setNumber1] = useState("");
  const [number2, setNumber2] = useState("");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([])
  const buttonAddPressed = () => {
    const num1 = parseFloat(number1) || 0;
    const num2 = parseFloat(number2) || 0;
    const result = num1 + num2;
    // Alert.alert("Button pressed");
    setResult(result)
    setHistory(prev => [...prev, { key: String(prev.length + 1), text: `${number1} + ${number2} = ${result}` }]);
    setNumber1("");
    setNumber2("");
    Keyboard.dismiss();
  };
  const buttonMinusPressed = () => {
    const num1 = parseFloat(number1) || 0;
    const num2 = parseFloat(number2) || 0;
    const result = num1 - num2;
    // Alert.alert("Button pressed");
    setResult(result)
    setHistory(prev => [...prev, { key: String(prev.length + 1), text: `${number1} - ${number2} = ${result}` }]);
    //hong hieu String(prev.length + 1)
    setNumber1("");
    setNumber2("");
    Keyboard.dismiss();
  };


  return (
    <View style={styles.container}>
      <Text>This is an calculator app</Text>
      <Text>Result: {result !== null ? result : "No calculation yet"}</Text>
      <TextInput
        style={styles.textInput}
        placeholder='Enter number 1'
        onChangeText={number1 => setNumber1(number1)}
        value={number1}
        keyboardType='numeric'
      />
      <TextInput
        style={styles.textInput}
        placeholder='Enter number 2'
        onChangeText={number2 => setNumber2(number2)}
        value={number2}
        keyboardType='numeric'
      />
      <View style={styles.buttonContainer}>
        <Button onPress={buttonAddPressed} title="+" />
        <Button onPress={buttonMinusPressed} title="-" />
      </View>
      <Text>History</Text>
      <FlatList
        data={history}
        renderItem={({ item }) => (<Text style={styles.historyItem}>{item.text}</Text>)}
        ListEmptyComponent={ListEmptyComponent}
        keyExtractor={item => item.key}
      //hong hieu
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 50,
  },
  buttonContainer: {
    flex: 1,
    width: 150,
    flexDirection: "row",
    alignItems: "flex-center",
    justifyContent: 'space-around',
    padding: 20,
  },
  textInput: {
    flex: 1,
    fontSize: 18,
    width: 200,
    borderColor: "gray",
    borderWidth: 1,
  },
  historyItem: {
    flex: 5,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  }
});

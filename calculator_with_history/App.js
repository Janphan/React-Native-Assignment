
import { Button, StyleSheet, Text, View, TextInput, Alert } from 'react-native';
import { useState } from 'react';

export default function App() {
  const buttonAddPressed = () => {
    Alert.alert("Button pressed");
    setResult(number1 + number2)
  };
  const buttonMinusPressed = () => {
    Alert.alert("Button pressed");
    setResult(number1 - number2)
  };
  const [number1, setNumber1] = useState("");
  const [number2, setNumber2] = useState("");
  const [result, setResult] = useState(null)

  return (
    <View style={styles.container}>
      <Text>This is an calculator app</Text>
      <Text>Result: {result}</Text>
      <TextInput
        style={styles.textInput}
        placeholder='Enter number 1'
        onChangeText={number1 => setNumber1(parseFloat(number1))}
        value={number1}
        keyboardType='numeric'
      />
      <TextInput
        style={styles.textInput}
        placeholder='Enter number 2'
        onChangeText={number2 => setNumber2(parseFloat(number2))}
        value={number2}
        keyboardType='numeric'
      />
      <View style={styles.buttonContainer}>
        <Button onPress={buttonAddPressed} title="+" />
        <Button onPress={buttonMinusPressed} title="-" />
      </View>
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
    flex: 2,
    width: 150,
    flexDirection: "row",
    alignItems: "flex-center",
    justifyContent: 'space-around',
    padding: 20,
  },
  textInput: {
    fontsize: 18,
    width: 200,
    borderColor: "gray",
    borderWidth: 1,
  }
});

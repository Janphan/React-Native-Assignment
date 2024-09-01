import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Alert } from 'react-native';

export default function App() {
  const [randomNumber, setRandomNumber] = useState(0);
  console.log(randomNumber)
  const [guessNumber, setGuessNumber] = useState("")
  const [text, setText] = useState("Guess a number between 1-100")
  const [count, setCount] = useState(0);

  useEffect(() => resetGame(), []);

  const resetGame = () => {
    setRandomNumber(Math.floor(Math.random() * 100) + 1);
    setText("Guess a number between 1-100");
    setCount(1);
    setGuessNumber('');
  }
  const buttonClicked = () => {
    if (randomNumber === guessNumber) {
      setCount(count + 1);
      Alert.alert(`You guessed the number in ${count} guesses`);
      resetGame();
    }

    if (randomNumber < guessNumber) {
      setText(`Your guess is ${guessNumber} too high`)
      setGuessNumber("")
      setCount(count + 1);
    }
    else if (randomNumber > guessNumber) {
      setText(`Your guess is ${guessNumber} too low`)
      setGuessNumber("")
      setCount(count + 1);
    }
    else {
      Alert.alert(`You guessed the number in ${count} guesses`)
      setText("Guess a number between 1-100")
      setCount(0)
      setGuessNumber("")

    }
  }
  return (
    <View style={styles.container}>
      <Text>{text}</Text>
      <TextInput
        style={styles.input}
        onChangeText={guessNumber => setGuessNumber(parseInt(guessNumber))}
        value={guessNumber}
        keyboardType='numeric'
        placeholder='Enter a number'
      >
      </TextInput>
      <Button onPress={buttonClicked} title="Guess" />
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

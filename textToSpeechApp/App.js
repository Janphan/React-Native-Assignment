import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';
import * as Speech from 'expo-speech';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { useState } from 'react';

export default function App() {
  const [text, setText] = useState('');
  const [language, setLanguage] = useState('en'); // default language English
  const [selectedIndex, setSelectedIndex] = useState(0);
  const languages = ['English', 'Finnish', 'Swedish'];
  const languageCodes = { English: 'en', Finnish: 'fi', Swedish: 'sv' };

  const speak = () => {
    if (text === '') {
      Alert.alert('Please enter some text to speak.');
    } else {
      console.log("selected language:", language)
      Speech.speak(text, { language });
    }
  };
  const handleLanguageChange = (index) => {
    const selectedLanguage = languages[index];
    setLanguage(languageCodes[selectedLanguage]);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Language: {language}</Text>
      <SegmentedControl
        values={languages} // Display English, Finnish, Swedish
        selectedIndex={selectedIndex} // Reflect current selected index
        onChange={(event) => handleLanguageChange(event.nativeEvent.selectedSegmentIndex)} // Handle language change
      />
      <TextInput
        style={styles.input}
        placeholder="Type something to speak..."
        onChangeText={(inputText) => setText(inputText)}
        value={text}
      />
      <Button title="Press to hear some words" onPress={speak} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

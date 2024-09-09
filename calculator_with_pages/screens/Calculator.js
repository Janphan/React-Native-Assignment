import { Button, StyleSheet, Text, View, TextInput, Keyboard, TouchableOpacity } from 'react-native';
import { useState } from 'react';

export default function Calculator({ navigation }) {
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
    }
    const handleClear = () => {
        setHistory([]);
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>This is an calculator app</Text>
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
            <View style={styles.buttonContainer} >
                <TouchableOpacity onPress={buttonAddPressed} style={styles.rectButton}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={buttonMinusPressed} style={styles.rectButton}>
                    <Text style={styles.buttonText}>-</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("History", { history })} style={styles.rectButton}>
                    <Text style={styles.buttonText}>History</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleClear} style={styles.rectButton}>
                    <Text style={styles.buttonText}>Clear</Text>
                </TouchableOpacity>

                {/* navigate to the history screen */}
                {/* {history}  ???????????*/}
            </View>
        </View>
    )
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
        flex: 3,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between', // Adjust spacing between buttons
        width: '100%', // Adjust width to fit buttons and provide spacing
        padding: 10,
        marginBottom: 256,
    },
    rectButton: {
        backgroundColor: '#1E90FF', // Button background color
        width: 80, // Fixed width for the button
        height: 40, // Fixed height for the button
        borderRadius: 5, // Optional: for slightly rounded corners
        justifyContent: 'center',
        alignItems: "center",
        margin: 5, // Optional: space around the button
    },
    textInput: {
        fontSize: 18,
        width: 200,
        borderColor: "gray",
        borderWidth: 1,
        margin: 10,
        padding: 5,
    },
    buttonText: {
        color: 'white', // Text color
        fontSize: 18, // Font size
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
});

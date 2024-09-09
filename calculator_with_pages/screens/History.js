import { Button, StyleSheet, Text, View, TouchableOpacity, FlatList, Keyboard } from 'react-native';
import ListEmptyComponent from "../ListEmptyComponent"

export default function History({ navigation, route }) {
    const { history } = route.params;
    return (

        <View style={styles.container}>
            <Text style={styles.title}>History</Text>
            <FlatList
                data={history}
                renderItem={({ item }) => (<Text style={styles.historyItem}>{item.text}</Text>)}
                ListEmptyComponent={ListEmptyComponent ? <ListEmptyComponent /> : <Text>No history available</Text>}

                keyExtractor={(item) => item.key}
            //hong hieu
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.rectButton}>
                    <Text style={styles.buttonText}>Calculator</Text>
                </TouchableOpacity>
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
    historyItem: {
        flex: 1,
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },
    buttonContainer: {
        flex: 3,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center", // Adjust spacing between buttons
        width: '100%', // Adjust width to fit buttons and provide spacing
        padding: 10,
        marginBottom: 256,
    },
    rectButton: {
        backgroundColor: '#1E90FF', // Button background color
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderRadius: 5, // Optional: for slightly rounded corners
        justifyContent: 'center',
        alignItems: "center",
        margin: 5, // Optional: space around the button
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

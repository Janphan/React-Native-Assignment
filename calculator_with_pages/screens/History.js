import { Button, StyleSheet, Text, View, TextInput, Alert, FlatList, Keyboard } from 'react-native';
import ListEmptyComponent from "../ListEmptyComponent"

export default function History({ navigation, route }) {
    const { history } = route.params;
    //??????????????????????
    return (

        <View style={styles.container}>
            <Text>History</Text>
            <FlatList
                data={history}
                renderItem={({ item }) => (<Text style={styles.historyItem}>{item.text}</Text>)}
                ListEmptyComponent={ListEmptyComponent ? <ListEmptyComponent /> : <Text>No history available</Text>}
                // ???????????
                keyExtractor={(item) => item.key}
            //hong hieu
            />
            <Button title="Back to Calculator" onPress={() => navigation.goBack()} />
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
        flex: 5,
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    }
});

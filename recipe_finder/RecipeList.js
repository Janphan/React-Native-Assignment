import { FlatList, View, Image, Text, StyleSheet } from "react-native"
import ListEmptyComponent from './ListEmptyComponent';
export default function RecipeList({ recipeList }) {
    return (
        <FlatList
            data={recipeList}
            renderItem={({ item }) => (
                <View style={{ margin: 10 }}>
                    <Text style={styles.title}>{item.strMeal}</Text>
                    <Image
                        source={{ uri: item.strMealThumb }}
                        style={styles.imgStyle}
                    />
                </View>
            )}
            ListEmptyComponent={ListEmptyComponent}
        />
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
    },
    imgStyle: {
        width: 200,
        height: 200,
    },
    title: {
        fontSize: 16,
        fontFamily: "bold",
    }
});

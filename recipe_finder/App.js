import { StyleSheet, Text, TextInput, View, Button, FlatList, Image, Keyboard } from 'react-native';
import { useState } from 'react';
import ListEmptyComponent from './ListEmptyComponent';
import { getRecipe } from './recipeAPI';

export default function App() {
  const [recipe, setRecipe] = useState("");
  const [recipeList, setRecipeList] = useState([]);

  // https://www.themealdb.com/api/json/v1/1/filter.php?i=tomato
  const hanleFetch = () => {
    getRecipe(recipe)
      .then(data => setRecipeList(data.meals))
      .catch(err => console.error(err))
    Keyboard.dismiss()
  }
  return (
    <View style={styles.container}>
      <Text>This is a recipe finder App</Text>
      <TextInput
        placeholder='Enter recipe'
        value={recipe}
        onChangeText={text => setRecipe(text)}
      />
      <Button title="Search" onPress={hanleFetch} />
      <FlatList
        data={recipeList}
        renderItem={({ item }) => (
          <View>
            <Text>{item.strMeal}</Text>
            <Image
              source={{ uri: item.strMealThumb }}
              style={styles.imgStyle}
            />
          </View>
        )}
        ListEmptyComponent={ListEmptyComponent}
      />
    </View>
  );
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
});

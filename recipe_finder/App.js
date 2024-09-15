import { StyleSheet, Text, TextInput, View, Button, FlatList, Image, Keyboard, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import RecipeList from './RecipeList';

import { getRecipe } from './recipeAPI';

export default function App() {
  const [recipe, setRecipe] = useState("");
  const [recipeList, setRecipeList] = useState([]);
  const [loading, setLoading] = useState(false)

  // https://www.themealdb.com/api/json/v1/1/filter.php?i=tomato
  const hanleFetch = () => {
    setLoading(true)
    getRecipe(recipe)
      .then(data => setRecipeList(data.meals))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
    Keyboard.dismiss()
    setRecipe("")
  }
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Recipe finder App</Text>
      <TextInput
        placeholder='Enter recipe'
        value={recipe}
        onChangeText={text => setRecipe(text)}
        style={styles.normalText}
      />
      <Button title="Search" onPress={hanleFetch} />
      <ActivityIndicator size="small" animating={loading} />
      <RecipeList recipeList={recipeList} />
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
  header: {
    fontSize: 16,
    fontFamily: "bold",
  },
  normalText: {
    fontSize: 16,
  }
});

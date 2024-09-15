export const getRecipe = (recipe) => {
    return fetch(`${process.env.EXPO_PUBLIC_API_URL}?i=${recipe}`)
        .then(response => {
            if (!response.ok)
                throw new Error("Error in fetch:" + response.statusText)
            return response.json()
        })
}
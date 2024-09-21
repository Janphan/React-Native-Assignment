const key = "66ee65a1ac27d363006451iyo35881b"

export const getAddress = (address) => {
    return fetch(`${process.env.EXPO_PUBLIC_API_URL}?q=${address}&api_key=${key}`)
        .then(response => {
            if (!response.ok)
                throw new Error("Error in fetch:" + response.statusText)
            return response.json()
        })
        .catch(err => {
            console.error("Fetch error:", err);
            throw err; // Ensure the error is re-thrown for proper handling
        });
}
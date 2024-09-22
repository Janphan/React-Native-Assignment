const key = "66ee65a1ac27d363006451iyo35881b"

export const getAddress = async (address) => {
    try {
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}?q=${address}&api_key=${key}`)
        if (!response.ok) {
            throw new Error("Error in fetch: " + response.statusText);
        }
        const data = await response.json()
        console.log(data[0].lat)
        return data;

    } catch (err) {
        console.error("Fetch error:", err);
        throw err;
    }
};
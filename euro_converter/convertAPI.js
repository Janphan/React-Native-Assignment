const API_KEY = 'VLF7vVmnyLmaYu8a2VnV6s5jXzE1CuQq';
const API_BASE_URL = 'https://api.apilayer.com/exchangerates_data';

const myHeaders = new Headers({
    'apikey': API_KEY,
});
var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
};

//get converted currency with the input amount
export const fetchCurrency = () => {
    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };
    return fetch(`${API_BASE_URL}/latest?base=EUR`, requestOptions)
        .then(response => {
            if (!response.ok)
                throw new Error("Error in fetch:" + response.statusText)
            return response.json()
        })
        .then(data => {
            return Object.keys(data.rates)
        })
        .catch(error => {
            console.error('Error fetching currencies:', error);
            throw error;
        });
}

// get available currency and display in the picker
export const convertCurrency = (amount, from, to) => {
    return fetch(`${API_BASE_URL}/convert?to=${to}&from=${from}&amount=${amount}`, requestOptions)
        .then(response => {
            if (!response.ok)
                throw new Error("Error in fetch:" + response.statusText)
            return response.json()
        })
        .then(data => {
            return data.result;  // Return the conversion result
        })
        .catch(error => {
            console.error('Error converting currency:', error);
            throw error;
        });
}


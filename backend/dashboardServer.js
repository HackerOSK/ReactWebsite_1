// const express = require('express');
import axios from 'axios';

// const app = express();
// const PORT = 3000;

// Function to fetch data from CoinGecko API
const fetchCoinGeckoData = async () => {
    const options = {
        method: 'GET',
        url: 'https://api.coingecko.com/api/v3/exchanges',
        headers: {
            accept: 'application/json',
            'x-cg-demo-api-key': 'CG-zoZjfhsK4WZe448Fj1H6Xjrw', // Optional API key header

            // Remove the malformed API key. If you have a valid key, add it here
        },
    };

    try {
        const response = await axios.request(options);
        return response.data; // API already returns the data object
    } catch (error) {
        console.error('Error fetching data from CoinGecko:', error.message);
        throw new Error('Unable to fetch data from CoinGecko');
    }
};

// // Route to fetch CoinGecko data
// app.get('/coingecko', async (req, res) => {
//     try {
//         const data = await fetchCoinGeckoData();
//         // Remove .data since the API response is already processed
//         const exchanges = data.slice(0, 10);
        
//         res.setHeader('Content-Type', 'application/json');
//         res.status(200).json(exchanges); // Use .json() instead of .send() for JSON responses
//     } catch (error) {
//         res.status(500).json({ error: error.message }); // Use .json() for consistency
//     }
// });

// Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });

export default fetchCoinGeckoData;
// module.exports = app;
// module.exports = fetchCoinGeckoData;
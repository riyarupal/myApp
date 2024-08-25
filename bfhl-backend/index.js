const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/bfhl', (req, res) => {
    const data = req.body;

    const alphabets = [];
    const numbers = [];
    let highestLowercaseAlphabet = '';

    for (const item of data) {
        if (/^[A-Za-z]$/.test(item)) {
            alphabets.push(item);
            if (item === item.toLowerCase() && item > highestLowercaseAlphabet) {
                highestLowercaseAlphabet = item;
            }
        } else if (/^\d+$/.test(item)) {
            numbers.push(item);
        }
    }

    res.json({
        is_success: true,
        alphabets,
        numbers,
        highest_lowercase_alphabet: highestLowercaseAlphabet
    });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3009;


app.set('view engine', 'ejs');
app.use(express.static('public'));


app.use(bodyParser.urlencoded({ extended: false }));



app.get('/', (req, res) => {
    res.render('form');
});


app.post('/submit', (req, res) => {
    const { username, email } = req.body;
    res.render('success', { username, email });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

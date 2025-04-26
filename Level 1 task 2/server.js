const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3010;


app.set('view engine', 'ejs');



app.use(bodyParser.urlencoded({ extended: false }));


let users = [];

app.get('/', (req, res) => {
    res.render('form', { error: null, oldData: {} });
});

app.post('/submit', (req, res) => {
    const { username, email, age, bio } = req.body;

    // Server-side Validation
    if (!username || !email || !age || !bio) {
        return res.render('form', {
            error: 'All fields are required!',
            oldData: { username, email, age, bio }
        });
    }
    if (!email.includes('@')) {
        return res.render('form', {
            error: 'Please enter a valid email address!',
            oldData: { username, email, age, bio }
        });
    }
    if (isNaN(age) || Number(age) <= 0) {
        return res.render('form', {
            error: 'Age must be a positive number!',
            oldData: { username, email, age, bio }
        });
    }

    // If all validations pass, store data
    const userData = { username, email, age, bio };
    users.push(userData);

    console.log("All Users:", users);

    res.render('success', { data: userData });
});


// Start server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

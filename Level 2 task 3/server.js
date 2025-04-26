const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3009;


app.set('view engine', 'ejs');



app.use(bodyParser.urlencoded({ extended: false }));



app.get('/', (req, res) => {
    res.render('webpage');
});




// Start server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

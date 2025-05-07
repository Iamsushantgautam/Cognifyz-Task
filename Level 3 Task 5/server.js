const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'public')));


app.use(cors());
app.use(bodyParser.json());

let data = []; // In-memory data store
let id = 1;

// CREATE
app.post('/items', (req, res) => {
  const item = { id: id++, ...req.body };
  data.push(item);
  res.status(201).json(item);
});

// READ ALL
app.get('/items', (req, res) => {
  res.json(data);
});

// READ ONE
app.get('/items/:id', (req, res) => {
  const item = data.find(i => i.id == req.params.id);
  item ? res.json(item) : res.status(404).send('Item not found');
});

// UPDATE
app.put('/items/:id', (req, res) => {
  const index = data.findIndex(i => i.id == req.params.id);
  if (index !== -1) {
    data[index] = { id: data[index].id, ...req.body };
    res.json(data[index]);
  } else {
    res.status(404).send('Item not found');
  }
});

// DELETE
app.delete('/items/:id', (req, res) => {
  const index = data.findIndex(i => i.id == req.params.id);
  if (index !== -1) {
    const removed = data.splice(index, 1);
    res.json(removed[0]);
  } else {
    res.status(404).send('Item not found');
  }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));

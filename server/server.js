const express = require('express');
const path = require('path');
const axios = require('axios');
const token = require('./config');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, '/../client/dist')));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

// Retrieves the list of products
app.get('/products', (req, res) => {
  axios({
    url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products',
    headers: {
      Authorization: token,
    },
  })
    .then((res) => {
      res.end(res.data);
    })
    .catch((err) => {
      console.error(err);
    });
});

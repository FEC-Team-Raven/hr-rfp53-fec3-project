const express = require('express');
const path = require('path');
const axios = require('axios');
const token = require('./config.js');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '/../client/dist')));

app.get('/', (req, res) => {
  console.log(`SERVING GET REQUEST AT ${req.url}`);
  axios({
    url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products',
    headers: {
      Authorization: token
    }
  })
    .then(result => {
      res.end(result.data[0]);
    })
    .catch(err => {
      console.log(err);
      res.end();
    });
});

app.get('/products', (req, res) => {
  console.log(`SERVING GET REQUEST AT ${req.url}`);
  axios({
    url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products',
    headers: {
      Authorization: token
    }
  })
    .then(result => {
      res.end(JSON.stringify(result.data));
    })
    .catch(err => {
      console.log(err);
      res.end();
    });
});

app.get('/reviews', (req, res) => {
  console.log(`SERVING GET REQUEST AT ${req.url}`);

});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

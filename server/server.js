const express = require('express');
const path = require('path');
const axios = require('axios');
<<<<<<< HEAD
const token = require('./config');
=======
const token = require('./config.js');
>>>>>>> 871b33c6de1664f55708fbd6c2dea0d04f8af365

const app = express();
const port = 3000;

<<<<<<< HEAD
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

=======
>>>>>>> 871b33c6de1664f55708fbd6c2dea0d04f8af365
app.use(express.static(path.join(__dirname, '/../client/dist')));

app.get('/', (req, res) => {
  res.end();
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

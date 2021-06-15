const express = require('express');
const path = require('path');
const axios = require('axios');
const token = require('./config.js');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, '/../client/dist')));

app.get('/products/:product_id/styles', (req, res) => {
  console.log(`SERVING GET REQUEST AT ${req.url}`);
  axios({
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${req.params.product_id}/styles`,
    method: 'GET',
    headers: {
      Authorization: token
    }
  })
    .then(response => {
      res.send(JSON.stringify(response.data));
    })
    .catch((err) => {
      console.error(err);
      res.status(500);
      res.send(`Failed to get styles at "https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${req.params.product_id}/styles"`);
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
  var searchParams = new URLSearchParams(req.url.replace('/reviews', ''));
  var productId = searchParams.get('productId');
  axios({
    url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews',
    params: {
      page: 1,
      count: 50,
      sort: 'newest',
      // eslint-disable-next-line camelcase
      product_id: productId
    },
    headers: {
      Authorization: token
    }
  })
    .then(reviews => {
      res.end(JSON.stringify(reviews.data));
    })
    .catch(err => {
      console.log(err);

    });
});

app.post('/cart', (req, res) => {
  axios.post('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/cart', {'sku_id': req.body.sku}, { headers: { Authorization: token, 'Content-Type': 'application/json' } }
  ).then(response => res.send(response.data))
    .catch(err => { throw err; res.status(500); res.send(err); } );
});

app.get('/', (req, res) => {
  res.end();
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

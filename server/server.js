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
  res.end();
});

// Retrieves the list of products
app.get('/products/list', (req, res) => {
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

// Retrieves IDs of related product lists
app.get('/products/relatedIds', (req, res) => {
  let productId = req.headers.productid;
  axios({
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${productId}/related`,
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

// Retrieves produdct level info about a SPECIFIC product id
app.get('/products/productid', (req, res) => {
  let productId = req.headers.productid;
  axios({
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${productId}`,
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

// Retrieves ALL STYLES for a given product
app.get('/products/styles', (req, res) => {
  let productId = req.headers.productid;
  axios({
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${productId}/styles`,
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

// Retrieves RATINGS for a given product
app.get('/reviews/meta', (req, res) => {
  var searchParams = new URLSearchParams(req.url.replace('/reviews/meta', ''));
  var productId = searchParams.get('productId');
  axios({
    url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/meta',
    method: 'GET',
    params: {
      // eslint-disable-next-line camelcase
      product_id: productId
    },
    headers: {
      Authorization: token
    }
  })
    .then(meta => {
      res.end(JSON.stringify(meta.data));
    })
    .catch(err => {
      console.log(err);
    });
});
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

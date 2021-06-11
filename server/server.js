const express = require('express');
const path = require('path');
const axios = require('axios');
const token = require('./config.js');

const app = express();
const port = 3000;

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
  var searchParams = new URLSearchParams(req.url.replace('/reviews', ''));
  var productId = searchParams.get('productId');
  var sort = searchParams.get('sort');
  var page = searchParams.get('page');
  axios({
    url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews',
    params: {
      page: 1,
      count: 500,
      sort: sort,
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

app.put('/reviews/helpful', (req, res) => {
  console.log(`SERVING PUT REQUEST AT ${req.url}`);
  var searchParams = new URLSearchParams(req.url.replace('/reviews/helpful', ''));
  var reviewId = searchParams.get('reviewId');
  axios({
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/${reviewId}/helpful`,
    method: 'PUT',
    headers: {
      Authorization: token
    }
  })
    .then(() => {
      res.end();
    })
    .catch(err => {
      console.log(err);
    });
});

app.post('/reviews', (req, res) => {
  console.log(`SERVING POST REQUEST AT ${req.url}`);
  console.log(req.body);
});

app.get('/reviews/meta', (req, res) => {
  console.log(`SERVING GET REQUEST AT ${req.url}`);
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

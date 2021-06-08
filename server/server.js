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

// app.get('/questions', (req, res) => {
//   console.log(`SERVING GET REQUEST AT ${req.url}`);
//   axios({
//     method: 'get',
//     url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions',
//     headers: {
//       Authorization: token
//     },
//     params: {
//       'product_id': '17067'
//     }
//   })
//     .then(result => {
//       console.log('GOT HERE');
//       res.status(200).send(result.data.results);
//     })
//     .catch(err => {
//       console.log(err);
//       res.end();
//     });
// });
app.get('/questions', (req, res) => {
  console.log(`SERVING GET REQUEST AT ${req.url}`);
  var searchParams = new URLSearchParams(req.url.replace('/questions', ''));
  var productId = searchParams.get('productId');
  console.log(productId);

  axios({
    method: 'get',
    url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions',
    headers: {
      Authorization: token
    },
    params: {
      'product_id': productId
    }
  })
    .then(result => {
      console.log('GOT HERE');
      res.status(200).send(result.data.results);
    })
    .catch(err => {
      console.log(err);
      res.end();
    });
});


app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

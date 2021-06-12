/* eslint-disable camelcase */
const express = require('express');
const path = require('path');
const axios = require('axios');
const token = require('./config.js');
const cloudinary = require('cloudinary');
const FormData = require('form-data');

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({storage: storage});

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
  let upload = multer({storage: multer.memoryStorage()}).any('files');
  upload(req, res, err => {
    var formInputs = {};
    for (var key in req.body) {
      formInputs[key] = req.body[key];
    }

    formInputs['product_id'] = parseInt(formInputs['product_id'], 10);
    formInputs['rating'] = parseInt(formInputs['rating'], 10);
    formInputs['recommended'] = formInputs['recommended'] === 'true';
    formInputs['characteristics'] = JSON.parse(formInputs['characteristics']);
    formInputs['photos'] = [];

    axios({
      url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews',
      method: 'POST',
      body: formInputs,
      headers: {
        Authorization: token
      }
    })
      .then(() => {
        res.end();
      })
      .catch(err => {
        console.log(err);
        console.log(formInputs);
      });

    console.log(req.files);

    // cloudinary.config({
    //   cloud_name: 'dczltf399',
    //   api_key: '946126219219165',
    //   api_secret: 'vWxGANXZlZ8vgCEJGrpKWGHMHAE'
    // });

    // cloudinary.v2.uploader.unsigned_upload(req.files[0].buffer.toString('base64'), 'mtmwkcmo', (response) => {
    //   console.log(response);
    // });
  });
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

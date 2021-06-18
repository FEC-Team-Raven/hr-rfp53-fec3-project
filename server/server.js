/* eslint-disable camelcase */
const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const axios = require('axios');
const config = require('./config.js');
const imgbbUploader = require('imgbb-uploader');
const FormData = require('form-data');

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({storage: storage});

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '/../client/dist')));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));

app.post('/clickAnalytics', (req, res) => {
  axios({
    url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/interactions',
    method: 'POST',
    headers: {
      Authorization: config.github
    },
    data: {
      element: req.body.event.element,
      widget: req.body.event.widget,
      time: req.body.event.time
    }
  })
    .then(response => {
      res.send(response.data);
    })
    .catch(err => {
      res.status(500);
      res.send(err);
      throw err;
    });
});

/****************************
  RELATED PRODUCTS ENDPOINTS
*****************************/

// Retrieves the list of products
app.get('/products/list', (req, res) => {
  axios({
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${req.params.product_id}`,
    headers: {
      Authorization: config.github
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
      Authorization: config.github
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
app.get('/products/:product_id', (req, res) => {
  console.log(`SERVING GET REQUEST AT ${req.url}`);
  axios({
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${req.params.product_id}`,
    headers: {
      Authorization: config.github
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

app.get('/products/:product_id/styles', (req, res) => {
  console.log(`SERVING GET REQUEST AT ${req.url}`);
  axios({
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${req.params.product_id}/styles`,
    method: 'GET',
    headers: {
      Authorization: config.github
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

// Retrieves ALL STYLES for a given product
app.get('/products/styles', (req, res) => {
  let productId = req.headers.productid;
  axios({
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${productId}/styles`,
    headers: {
      Authorization: config.github
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

app.put('/reviews/helpful', (req, res) => {
  console.log(`SERVING PUT REQUEST AT ${req.url}`);
  var searchParams = new URLSearchParams(req.url.replace('/reviews/helpful', ''));
  var reviewId = searchParams.get('reviewId');
  axios({
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/${reviewId}/helpful`,
    method: 'PUT',
    headers: {
      Authorization: config.github
    }
  })
    .then(() => {
      res.end();
    })
    .catch(err => {
      console.log(err);
    });
});

app.put('/reviews/report', (req, res) => {
  console.log(`SERVING PUT REQUEST AT ${req.url}`);
  var searchParams = new URLSearchParams(req.url.replace('/reviews/report', ''));
  var reviewId = searchParams.get('reviewId');
  axios({
    method: 'PUT',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/${reviewId}/report`,
    headers: {
      Authorization: config.github
    }
  });
});

app.get('/reviews', (req, res) => {
  // console.log(`SERVING GET REQUEST AT ${req.url}`);
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
      Authorization: config.github
    }
  })
    .then(reviews => {
      res.end(JSON.stringify(reviews.data));
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
    formInputs['recommend'] = formInputs['recommend'] === 'true';
    formInputs['photos'] = [];
    formInputs['characteristics'] = JSON.parse(formInputs['characteristics']);

    var options = {
      apiKey: config.imgbb,
      base64string: ''
    };

    var uploadImages = [];

    for (var i = 0; i < req.files.length; i++) {
      options['base64string'] = req.files[i].buffer.toString('base64');
      uploadImages.push(imgbbUploader(options).then(response => {
        formInputs.photos.push(response.url);
      }));
    }

    Promise.all(uploadImages)
      .then(() => {
        axios({
          url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews',
          method: 'POST',
          data: formInputs,
          headers: {
            Authorization: config.github
          }
        })
          .then(() => {
            res.end();
          })
          .catch(err => {
            console.log(err);
            //console.log(formInputs);
          });
      });

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
      Authorization: config.github
    }
  })
    .then(meta => {
      res.end(JSON.stringify(meta.data));
    })
    .catch(err => {
      console.log(err);
    });
});

app.get('/reviews/meta/:productId', (req, res) => {
  console.log(`SERVING GET REQUEST AT ${req.url}`);
  axios({
    url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/meta',
    method: 'GET',
    headers: {
      Authorization: config.github,
    },
    params: {
      'product_id': req.params.productId
    }
  }).then(response => { res.send(response.data); })
    .catch(err => {
      throw err;
      res.status(500);
      res.send(err);
    });
});

app.post('/cart', (req, res) => {
  axios.post('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/cart',
    {'sku_id': req.body.sku},
    { headers:
      { Authorization: config.github, 'Content-Type': 'application/json' }
    }
  )
    .then(response => { res.send(response.data); })
    .catch(err => {
      throw err;
      res.status(500);
      res.send(err);
    });
});

app.get('/', (req, res) => {
  res.end();
});

/****************************
    QUESTIONS ENDPOINTS
*****************************/

app.get('/questions', (req, res) => {
  var searchParams = new URLSearchParams(req.url.replace('/questions', ''));
  var productId = searchParams.get('productId');

  axios({
    method: 'get',
    url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions',
    headers: { Authorization: config.github },
    params: {
      'product_id': productId,
      'count': 50
    }
  })
    .then(result => {
      res.status(200).send(result.data.results);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(400);
    });
});

app.get('/answers', (req, res) => {
  var searchParams = new URLSearchParams(req.url.replace('/answers', ''));
  var questionId = searchParams.get('id');

  axios({
    method: 'get',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${questionId}/answers`,
    headers: { Authorization: config.github },
    params: {
      'count': 100
    }
  })
    .then((result) => {
      res.end(JSON.stringify(result.data));
    })
    .catch((err) => {
      throw err;
      res.end(400);
    });
});

app.post('/questions/add', (req, res) => {
  axios({
    method: 'post',
    url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions',
    headers: { Authorization: config.github },
    data: req.body
  })
    .then(result => {
      res.status(201).send(result.data);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(400);
    });
});




app.post('/answers/add', (req, res) => {
  const questionId = req.body.questionId;
  delete req.body.questionId;

  axios({
    method: 'post',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${questionId}/answers`,
    headers: { Authorization: config.github },
    data: req.body
  })
    .then((result) => {
      res.status(201).send('SUCCESS');
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

app.post('/report/answer', (req, res) => {
  axios({
    method: 'put',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/answers/${req.body.id}/report`,
    headers: { Authorization: config.github },
  })
    .then((result) => {
      res.status(204).send('SUCCESS REPORT ANSWER');
    })
    .catch((err) => {
      throw err;
      res.sendStatus(500);
    });
});

app.post('/helpful/answer', (req, res) => {
  axios({
    method: 'put',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/answers/${req.body.id}/helpful`,
    headers: { Authorization: config.github },
  })
    .then((result) => {
      res.status(204).send('SUCCESS ANSWER HELPFUL');
    })
    .catch((err) => {
      throw err;
      res.sendStatus(500);
    });
});

app.post('/helpful/question', (req, res) => {
  axios({
    method: 'put',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${req.body.id}/helpful`,
    headers: { Authorization: config.github },
  })
    .then((result) => {
      res.status(204).send('SUCCESS QUESTION HELPFUL');
    })
    .catch((err) => {
      throw err;
      res.sendStatus(500);
    });
});

app.post('/report/question', (req, res) => {
  axios({
    method: 'put',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${req.body.id}/report`,
    headers: { Authorization: config.github },
  })
    .then((result) => {
      res.status(204).send('SUCCESS REPORT QUESTION');
    })
    .catch((err) => {
      throw err;
      res.sendStatus(500);
    });
});


app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});


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

app.get('/', (req, res) => {
  res.end();
});

app.get('/products', (req, res) => {
  // console.log(`SERVING GET REQUEST AT ${req.url}`);
  axios({
    url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products',
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

app.get('/questions', (req, res) => {
  // console.log(`SERVING GET REQUEST AT ${req.url}`);
  var searchParams = new URLSearchParams(req.url.replace('/questions', ''));
  var productId = searchParams.get('productId');

  axios({
    method: 'get',
    url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions',
    headers: { Authorization: token },
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

//get all answers
app.get('/answers', (req, res) => {
  // console.log(`SERVING GET REQUEST AT ${req.url}`);
  var searchParams = new URLSearchParams(req.url.replace('/answers', ''));
  var questionId = searchParams.get('id');

  axios({
    method: 'get',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${questionId}/answers`,
    headers: { Authorization: token },
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
  // console.log(`SERVING GET REQUEST AT ${req.url}`);

  axios({
    method: 'post',
    url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions',
    headers: { Authorization: token },
    data: req.body
  })
    .then(result => {
      res.status(201).send(result.data);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(400);



app.post('/answers/add', (req, res) => {
  // console.log(`SERVING GET REQUEST AT ${req.url}`);
  const questionId = req.body.questionId;
  delete req.body.questionId;

  axios({
    method: 'post',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${questionId}/answers`,
    headers: { Authorization: token },
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
  // console.log(`SERVING GET REQUEST AT ${req.url}`);
  axios({
    method: 'put',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/answers/${req.body.id}/report`,
    headers: { Authorization: token },
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
  // console.log(`SERVING GET REQUEST AT ${req.url}`);
  // console.log(req.body);
  axios({
    method: 'put',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/answers/${req.body.id}/helpful`,
    headers: { Authorization: token },
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
  // console.log(`SERVING GET REQUEST AT ${req.url}`);
  axios({
    method: 'put',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${req.body.id}/helpful`,
    headers: { Authorization: token },
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
  // console.log(`SERVING GET REQUEST AT ${req.url}`);
  axios({
    method: 'put',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${req.body.id}/report`,
    headers: { Authorization: token },
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

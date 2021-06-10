const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const axios = require('axios');
const token = require('./config.js');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '/../client/dist')));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));

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

app.get('/questions', (req, res) => {
  console.log(`SERVING GET REQUEST AT ${req.url}`);
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
  console.log(`SERVING GET REQUEST AT ${req.url}`);
  var searchParams = new URLSearchParams(req.url.replace('/answers', ''));
  var questionId = searchParams.get('id');

  axios({
    method: 'get',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${questionId}/answers`,
    headers: { Authorization: token }
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
  console.log(`SERVING GET REQUEST AT ${req.url}`);
  console.log(req.body);

  axios({
    method: 'post',
    url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions',
    headers: { Authorization: token },
    data: req.body
  })
    .then(result => {
      console.log(result.data);
      res.status(201).send(result.data);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(400);
    });
});



app.post('/answers/add', (req, res) => {
  console.log(`SERVING GET REQUEST AT ${req.url}`);
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
  console.log(`SERVING GET REQUEST AT ${req.url}`);
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
  console.log(`SERVING GET REQUEST AT ${req.url}`);
  console.log(req.body);
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
  console.log(`SERVING GET REQUEST AT ${req.url}`);
  console.log(req.body);
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
  console.log(`SERVING GET REQUEST AT ${req.url}`);
  console.log(req.body);
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

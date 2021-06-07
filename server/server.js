const express = require('express');
const axios = require('axios');
const tok = require('./config');


const app = express();
const port = 3000;

app.use(express.static(__dirname + '/../client/dist'));

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.get('/question', (req, res) => {
  //get produce from the api
  axios({
    method: 'get',
    url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products',
    headers: {
      'Authorization': tok
    }
  })
    .then((product) => {
      console.log(product.data[0]);
      res.send(product.data[0]);
    })
    .catch((err) => {
      console.log(err);
    });



});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

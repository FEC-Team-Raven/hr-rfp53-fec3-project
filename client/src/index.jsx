<<<<<<< HEAD
/* eslint-disable import/extensions */

import React from 'react';
=======
import React, {useState, useEffect} from 'react';
>>>>>>> 871b33c6de1664f55708fbd6c2dea0d04f8af365
import ReactDOM from 'react-dom';

import Related from './components/related/Related.jsx';
<<<<<<< HEAD
// import Overview from './components/overview/Overview.jsx';
// import Questions from './components/questions/Questions.jsx';
// import Reviews from './components/reviews/Reviews.jsx';

const App = () => (
  <div>
    <Related />
    {/* <Overview />
    <Questions />
    <Reviews /> */}
  </div>
);
=======
import Questions from './components/questions/Questions.jsx';
import Reviews from './components/reviews/Reviews.jsx';
import axios from 'axios';

const App = () => {
  const [productId, setProductId] = useState(0);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (loading) {
      setLoading(false);
      axios('http://localhost:3000/products')
        .then(products => {
          setProductId(products.data[0].id);
        })
        .catch(err => {
          console.log(err);
          setLoading(true);
        });
    }
  });

  return (
    <div>
      <Overview productId={productId}/>
      <Related productId={productId}/>
      <Questions productId={productId}/>
      <Reviews productId={productId}/>
    </div>
  );
};
>>>>>>> 871b33c6de1664f55708fbd6c2dea0d04f8af365

ReactDOM.render(<App />, document.getElementById('app'));

export default App;

import React, {useState, useEffect, useContext} from 'react';
import ReactDOM from 'react-dom';
import Overview from './components/overview/Overview.jsx';
import Related from './components/related/Related.jsx';
import Questions from './components/questions/Questions.jsx';
import Reviews from './components/reviews/Reviews.jsx';
import axios from 'axios';

const App = () => { // executed 6 times
  const [productId, setProductId] = useState(0);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (loading) {
      axios('http://localhost:3000/products/list')
        .then(products => {
          // Sets id as the first product object in the array of products
          setProductId(products.data[0].id);
          setLoading(false);
        })
        .catch(err => {
          console.log(err);

          setLoading(true);
        });
    }
  });

  return (
    <div>
      {!loading &&
        <Related currProductId={productId}/>
      }
      {/* <Overview productId={productId}/>
      <Questions productId={productId}/> */}
      {/* <Reviews productId={productId}/> */}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));

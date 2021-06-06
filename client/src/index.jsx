import React, {useState, useEffect, useContext} from 'react';
import ReactDOM from 'react-dom';
import Overview from './components/overview/Overview.jsx';
import Related from './components/related/Related.jsx';
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
      <Related productId={productId}/>

      {/* <Overview productId={productId}/>
      <Questions productId={productId}/>
      <Reviews productId={productId}/> */}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));

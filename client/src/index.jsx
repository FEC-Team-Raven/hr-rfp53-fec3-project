import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import Overview from './components/overview/Overview';
import Related from './components/related/Related';
import Questions from './components/questions/Questions';
import Reviews from './components/reviews/Reviews';
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

ReactDOM.render(<App />, document.getElementById('app'));
import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import Overview from './components/overview/Overview.jsx';
import Related from './components/related/Related.jsx';
import Questions from './components/questions/Questions.jsx';
import Reviews from './components/reviews/Reviews.jsx';
import axios from 'axios';

const exampleProduct = {
  id: 11,
  name: 'Air Minis 250',
  slogan: 'Full court support',
  description: 'This optimized air cushion pocket reduces impact but keeps a perfect balance underfoot.',
  category: 'Basketball Shoes',
  'default_price': 0,
  features: [
    {
      feature: 'Sole',
      value: 'Rubber'
    },
    {
      feature: 'Material',
      value: 'FullControlSkin'
    }
  ],
};

const App = () => {
  const [productId, setProductId] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      axios('http://localhost:3000/products')
        .then(products => {
          setProductId(products.data[0].id);
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, []);

  if (loading) {
    return (
      <div>Loading product page...</div>
    );
  }

  return (
    <div>
      <Overview productId={productId} product={exampleProduct}/>
      {/* <Related productId={productId}/>
      <Questions productId={productId}/>
      <Reviews productId={productId}/> */}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));

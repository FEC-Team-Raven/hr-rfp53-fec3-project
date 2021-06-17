import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Overview from './components/overview/Overview.jsx';
import Related from './components/related/Related.jsx';
import Questions from './components/questions/Questions.jsx';
import Reviews from './components/reviews/Reviews.jsx';

const App = () => {
  const [productId, setProductId] = useState(0);
  const [productName, setProductName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      setLoading(false);
      axios('http://localhost:3000/products')
        .then(products => {
          console.log('id', products.data[0].id);
          console.log('name', products.data[0].name);

          setProductId(products.data[0].id);
          setProductName(products.data[0].name);
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
      {/* <Related productId={productId}/> */}
      <Questions productId={productId} productName={productName}/>
      <Reviews productId={productId}/>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));

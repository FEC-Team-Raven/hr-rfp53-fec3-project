import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import Overview from './components/overview/Overview.jsx';
import Related from './components/related/Related.jsx';
import Questions from './components/questions/Questions.jsx';
import Reviews from './components/reviews/Reviews.jsx';
import axios from 'axios';

const App = () => {
  const [productData, setProductData] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      axios('http://localhost:3000/products')
        .then(products => {
          setProductData(products.data[0]);
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
      <Overview productId={productData.id} product={productData}/>
      {/* <Related productId={productId}/>
      <Questions productId={productId}/>
      <Reviews productId={productId}/> */}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));

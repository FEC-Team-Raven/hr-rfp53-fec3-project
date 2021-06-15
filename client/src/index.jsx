import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import Overview from './components/overview/Overview.jsx';
import Related from './components/related/Related.jsx';
import Questions from './components/questions/Questions.jsx';
import Reviews from './components/reviews/Reviews.jsx';
import axios from 'axios';

const App = () => {
  const [ productData, setProductData ] = useState(0);
  const [ productIDtoRender, setProductIDtoRender ] = useState(17067);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    if (loading) {
      axios(`http://localhost:3000/products/${productIDtoRender}`)
        .then(products => {
          setProductData(products.data);
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
      <Related productId={productData.id}/>
      <Questions productId={productData.id}/>
      <Reviews productId={productData.id}/>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));

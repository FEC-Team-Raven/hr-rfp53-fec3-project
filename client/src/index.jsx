import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Overview from './components/overview/Overview.jsx';
import Related from './components/related/Related.jsx';
import Questions from './components/questions/Questions.jsx';
import Reviews from './components/reviews/Reviews.jsx';


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
<<<<<<< HEAD
      {/* <Overview productId={productId}/> */}
      {/* <Related productId={productId}/> */}
      <Questions productId={productId}/>
      {/* <Reviews productId={productId}/> */}
=======
      {/*
      <Overview productId={productId}/>
      <Related productId={productId}/>
      <Questions productId={productId}/>
      */}
      <Reviews productId={productId}/>
>>>>>>> 21010d67ccdd3d3f60242eb3d14762aa5d729a8f
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));

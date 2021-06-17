import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Navbar from './components/navbar/Navbar.jsx';
import Overview from './components/overview/Overview.jsx';
import Related from './components/related/Related.jsx';
import Questions from './components/questions/Questions.jsx';
import Reviews from './components/reviews/Reviews.jsx';

const themeContext = React.createContext('light');

const App = () => {
  const [ productData, setProductData ] = useState(0);
  const [ productIDtoRender, setProductIDtoRender ] = useState(17071);
  const [ loading, setLoading ] = useState(true);

  const clickAnalytics = event => {
    let clickEvent = {
      element: event.target.tagName === 'BODY' ? 'body' : event.target.id || Array.from(event.target.classList)[0] || event.target.tagName,
      widget: event.target.tagName === 'BODY' ? 'N/A' : event.target.closest('.module').id,
      time: (new Date()).toTimeString()
    };
    axios({
      url: '/clickAnalytics',
      method: 'POST',
      data: {
        'event': clickEvent
      },
    });
  };

  useEffect(() => {
    if (loading) {
      axios(`http://localhost:3000/products/${productIDtoRender}`)
        .then(products => {
          setProductData(products.data);
          setLoading(false);
          document.body.addEventListener('click', clickAnalytics);
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
      <Navbar />
      <Overview productId={productData.id} product={productData}/>
      <Related productId={productData.id}/>
      <Questions productId={productData.id} productName={productData.name}/>
      <Reviews productId={productData.id}/>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));

export { themeContext };
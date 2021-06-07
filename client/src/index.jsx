import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Overview from './components/overview/Overview.jsx';
import Related from './components/related/Related.jsx';
import Questions from './components/questions/Questions.jsx';
import Reviews from './components/reviews/Reviews.jsx';

const App = () => {
  const [productId, setProductId] = useState(0);

  useEffect(() => {
    //send get request to server --> to api and back
    axios({
      method: 'get',
      url: '/question',
    })
      .then((res) => {
        console.log(res.data.id);
        setProductId(res.data.id);
      })
      .catch((err) => {

      });


  }, []);

  return (
    <div>
      {/* <Overview />
    <Related /> */}
      <Questions value={productId}/>
      {/* <Reviews /> */}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));

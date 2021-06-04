/* eslint-disable import/extensions */

import React from 'react';
import ReactDOM from 'react-dom';

import Related from './components/related/Related.jsx';
// import Overview from './components/overview/Overview.jsx';
// import Questions from './components/questions/Questions.jsx';
// import Reviews from './components/reviews/Reviews.jsx';

const App = () => (
  <div>
    <Related />
    {/* <Overview />
    <Questions />
    <Reviews /> */}
  </div>
);

ReactDOM.render(<App />, document.getElementById('app'));

export default App;

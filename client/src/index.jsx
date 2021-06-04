import React from 'react';
import ReactDOM from 'react-dom';
import Overview from './components/overview/Overview.jsx';
import Related from './components/related/Related.jsx';
import Questions from './components/questions/Questions.jsx';
import Reviews from './components/reviews/Reviews.jsx';

const App = () => (
  <div>
    <Overview />
    <Related />
    <Questions />
    <Reviews />
  </div>
);

ReactDOM.render(<App />, document.getElementById('app'));

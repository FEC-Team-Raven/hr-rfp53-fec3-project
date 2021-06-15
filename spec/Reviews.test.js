/* eslint-disable camelcase */
import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils, {act} from 'react-dom/test-utils';
import renderer from 'react-test-renderer';
import { JSDOM } from 'jsdom';

import Reviews from '../client/src/components/reviews/Reviews.jsx';
import ReviewList from '../client/src/components/reviews/ReviewList/ReviewList.jsx';
import ReviewTile from '../client/src/components/reviews/ReviewList/ReviewTile.jsx';
import RatingBar from '../client/src/components/reviews/ProductBreakdown/RatingBar.jsx';
import CharacteristicBreakdown from '../client/src/components/reviews/ProductBreakdown/CharacteristicBreakdown.jsx';
import CharacteristicInput from '../client/src/components/reviews/ReviewList/ReviewForm/CharacteristicInput.jsx';
import StarSelector from '../client/src/components/reviews/ReviewList/ReviewForm/StarSelector.jsx';
import ReviewForm from '../client/src/components/reviews/ReviewList/ReviewForm/ReviewForm.jsx';



it('renders ReviewTile correctly', () => {
  var testReview = {
    body: 'I hate cucumber pls dont throw it at me i see a bird i stare at it i meow at it i do a wiggle come here birdy look at dog hiiiiiisssss. Pet my belly, you know you want to; seize the hand and shred it! spend all night ensuring people don\'t sleep sleep all day, claws in the eye of the beholder so attack feet, ignore the human until she needs to get up, ',
    date: '2021-04-20T00:00:00.000Z',
    helpfulness: 8,
    photos: [],
    rating: 3,
    recommend: true,
    response: null,
    review_id: 347986,
    reviewer_name: 'JoeCool',
    summary: 'Gate keepers of hell.'
  };

  const tree = renderer
    .create(<ReviewTile review={testReview} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders ReviewTile response if there is a response correctly', () => {
  var testReview = {
    body: 'I hate cucumber pls dont throw it at me i see a bird i stare at it i meow at it i do a wiggle come here birdy look at dog hiiiiiisssss. Pet my belly, you know you want to; seize the hand and shred it! spend all night ensuring people don\'t sleep sleep all day, claws in the eye of the beholder so attack feet, ignore the human until she needs to get up, ',
    date: '2021-04-20T00:00:00.000Z',
    helpfulness: 8,
    photos: [],
    rating: 3,
    recommend: true,
    response: 'TEST RESPONSE',
    review_id: 347986,
    reviewer_name: 'JoeCool',
    summary: 'Gate keepers of hell.'
  };

  const tree = renderer
    .create(<ReviewTile review={testReview} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders RatingBar correctly', () => {
  var stars = 5;
  var total = 100;
  var count = 30;
  var distribution = count / total;

  const tree = renderer
    .create(<RatingBar stars={stars} distribution={distribution} count={count}/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders CharacteristicBreakdown correctly', () => {
  var characteristic = 'Fit';
  var rating = '4.6';
  const tree = renderer
    .create(<CharacteristicBreakdown characteristic={characteristic} rating={rating} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders CharacteristicInput correctly', () => {
  var characteristic = 'Comfort';
  const tree = renderer
    .create(<CharacteristicInput characteristic={characteristic} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders StarSelector correctly', () => {
  const tree = renderer
    .create(<StarSelector />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

xit('renders ReviewForm correctly', () => {
  act(() => {
    const tree = renderer
      .create(<ReviewForm productId={17076}/>)
      .toJSON();
  });
  expect(tree).toMatchSnapshot();
});

let container;
let productId = 17067;

const dom = new JSDOM();
global.window = dom.window;
global.document = dom.window.document;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

xit('renders two more reviews when clicking More Reviews', () => {
  act(() => {
    var FilterContext = React.createContext({});
    var context = {
      starFilter: [],
      setStarFiler: () => {}
    };
    ReactDOM.render(
      <FilterContext.Provider value={context} >
        <ReviewList productId={productId} />
      </FilterContext.Provider>
      , container);
  });
  const moreReviews = container.querySelector('#moreReviews');
  act(() => {
    moreReviews.dispatchEvent(new MouseEvent('click', {bubbles: true}));
  });


});
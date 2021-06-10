/* eslint-disable camelcase */
import React from 'react';
import renderer from 'react-test-renderer';
import Reviews from '../client/src/components/reviews/Reviews.jsx';
import ReviewList from '../client/src/components/reviews/ReviewList/ReviewList.jsx';
import ReviewTile from '../client/src/components/reviews/ReviewList/ReviewTile.jsx';

it('renders Reviews correctly', () => {
  const tree = renderer
    .create(<Reviews />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});


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
import React, {useState, useEffect} from 'react';
import ReviewList from './ReviewList.jsx';
import axios from 'axios';

export const ReviewContext = React.createContext([]);

const Reviews = (props) => (
  <ReviewList productId={props.productId}/>
);

export default Reviews;

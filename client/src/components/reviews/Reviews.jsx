import React, {useState, useEffect} from 'react';
import ReviewList from './ReviewList/ReviewList.jsx';
import ProductBreakdown from './ProductBreakdown/ProductBreakdown.jsx';
import axios from 'axios';

export const ReviewContext = React.createContext({});

const Reviews = (props) => {
  const [loading, setLoading] = useState(true);

  var context = {
    starFilter: useState([]),
    metaData: useState({})
  };

  useEffect(() => {
    if (props.productId) {
      getMetaData();
    }
  }, [props.productId]);

  var getMetaData = () => {
    axios('http://localhost:3000/reviews/meta', {
      params: {
        productId: props.productId
      }
    })
      .then(meta => {
        context.metaData[1](meta.data);
        setLoading(false);
      });
  };

  if (!loading) {
    return (
      <div>
        RATINGS & REVIEWS
        <div className="ratingsReviewsContainer">
          <ReviewContext.Provider value={context}>
            <ProductBreakdown productId={props.productId} />
            <ReviewList productId={props.productId} />
          </ReviewContext.Provider>
        </div>
      </div>
    );
  }
  return null;
};

export default Reviews;

import React, {useState, useEffect} from 'react';
import axios from 'axios';

const ProductBreakdown = props => {
  var [metaData, setMetaData] = useState({});

  useEffect(() => {
    if (props.productId !== 0) {
      getMetaData(props.productId);
    }
  }, [props.productId]);

  var getMetaData = reviewId => {
    axios('http://localhost:3000/reviews/meta', {
      params: {
        productId: props.productId
      }
    })
      .then(meta => {
        setMetaData(meta);
      });
  };

  return (
    <div className="productBreakdown">
      PRODUCT BREAKDOWN
    </div>
  );
};

export default ProductBreakdown;

import React, { useState, useEffect, useContext } from 'react';
import ProductCard from './ProductCard.jsx';

import axios from 'axios';

const RelatedProducts = ({ currProductId }) => {
  const [ relatedIds, setRelatedIds ] = useState([]);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    if (loading) {
      axios({
        method: 'GET',
        url: `products/${currProductId}/related`
      })
        .then(res => {
          setRelatedIds(res.data);
          console.log('relatedIds:', relatedIds);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
        });
    }
  });

  return (
    <div>
      {relatedIds.map(productId => {
        <ProductCard productId={productId} list={'related'}/>;
      })}
    </div>
  );

};

export default RelatedProducts;

import React, { useState, useEffect, useContext } from 'react';
import ProductCard from './ProductCard.jsx';

import axios from 'axios';

const RelatedProducts = ({ currProductId }) => {
  const [ relatedIds, setRelatedIds ] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const [ initial, setInitial] = useState(true);

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
        .catch(err => console.error(err));
    }
  });

  return (
    <div className="carousel-wrapper">
      <div className="carousel">
        {relatedIds.map(productId =>
          <ProductCard productId={productId} list={'related'}/>
        )}
        <div class="carousel__button--next"></div>
        <div class="carousel__button--prev"></div>
      </div>
    </div>
  );

};

export default RelatedProducts;

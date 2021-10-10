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
          setLoading(false);
        })
        .catch(err => console.error(err));
    }
  });

  // Carousel functionality

  return (

    <div className="related">
      <div className="carousel__button prev">&#x2190;</div>

      <div className="carousel">
        <div className="carousel__images">
          {relatedIds.map(productId =>
            <ProductCard
              currProductId={currProductId}
              productId={productId}
              list={'related'}/>
          )}
          {/* <ProductCard
            currProductId={currProductId}
            productId={relatedIds[0]}
            list={'related'}/> */}
        </div>
      </div>

      <div className="carousel__button next">&#x2192;</div>

    </div>

  );

};

export default RelatedProducts;

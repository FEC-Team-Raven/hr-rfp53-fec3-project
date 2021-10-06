import React, { useState, useEffect, useContext } from 'react';
import ProductCard from './ProductCard.jsx';

import { RelatedContext } from './Related.jsx';

const RelatedProducts = ({ currProductId }) => {
  const [ relatedIDs, setRelatedIDs ] = useState([]);

  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    if (loading) {
      axios({
        method: 'GET',
        url: `products/${currProductId}/related`
      })
        .then(res => {
          setRelatedIDs(res.data);
          console.log(relatedIDs);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
        });
    }
  });


};

export default RelatedProducts;

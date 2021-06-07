import React, {useState, useEffect, useContext} from 'react';
import RelatedProducts from './RelatedProducts.jsx';
import YourOutfit from './YourOutfit.jsx';

import axios from 'axios';

const Related = ({productId}) => {
  const [relatedIds, setRelatedIds] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (loading) {
      setLoading(false);
      axios('http://localhost:3000/products/related', {headers: {'productId': productId}})
        .then(relatedIds => {
          setRelatedIds(relatedIds.data);

        })
        .catch(err => {
          console.log(err);
          setLoading(true);
        });
    }
  });

  return (
    <div>
      {console.log(relatedIds)}
      <h1>RELATED PRODUCTS</h1>
      <RelatedProducts />
      <h1>YOUR OUTFIT</h1>
      <YourOutfit />
    </div>
  );
};


export default Related;

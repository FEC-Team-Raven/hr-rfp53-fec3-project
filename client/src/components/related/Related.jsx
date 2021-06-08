import React, {useState, useEffect, useContext} from 'react';
import RelatedProducts from './RelatedProducts.jsx';
import YourOutfit from './YourOutfit.jsx';

import axios from 'axios';

const Related = ({productId}) => {
  const [relatedIds, setRelatedIds] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (loading) {
      setLoading(false);
      // Retrieves an ARRAY of related IDs of a specific product
      axios('http://localhost:3000/products/relatedIds', {headers: {'productId': productId}})
        .then(response => {
          setRelatedIds(response.data);
          return response.data;
        })

        // Retrieves data of SPECIFIC product
        .then(response => {
          let related = response;
          let promises = [];
          for (var i = 0; i < related.length; i++) {
            promises.push(
              axios('http://localhost:3000/product', {headers: {'productId': related[i]}})
                .then(response => {
                  setRelatedProducts(relatedProducts.push(response.data));
                })
            );
          }
          Promise.all(promises).then(() => console.log(relatedProducts));
        })

        .catch(err => {
          console.error(err);
          setLoading(true);
        });
    }
  });

  return (
    <div>
      <h1>RELATED PRODUCTS</h1>
      <RelatedProducts />
      <h1>YOUR OUTFIT</h1>
      <YourOutfit />
    </div>
  );
};

export default Related;

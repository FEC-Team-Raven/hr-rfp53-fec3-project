import React, {useState, useEffect, useContext} from 'react';
import RelatedProducts from './RelatedProducts.jsx';
import Outfit from './Outfit.jsx';

import axios from 'axios';

export const RelatedContext = React.createContext([]);

const Related = ({currProductId}) => {
  const [relatedIds, setRelatedIds] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const providerVal = {
    currProductId,
    relatedProducts
  };

  useEffect(() => {
    if (loading) {
      setLoading(false);
      // Retrieves an ARRAY of related IDs of a specific product
      axios('http://localhost:3000/products/relatedIds', {headers: {'productId': currProductId}})
        .then(response => {
          setRelatedIds(response.data);
          return response.data;
        })

        // Retrieves data of specific products
        .then(related => {
          let promises = [];
          for (var i = 0; i < related.length; i++) {
            promises.push(
              axios('http://localhost:3000/products/productid', {headers: {'productId': related[i]}})
                .then(response => {
                  return response.data;
                })
            );
          }
          Promise.all(promises).then((products) => {
            setRelatedProducts(products);
          });
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
      <div className="list">
        <RelatedContext.Provider value={providerVal}>
          <RelatedProducts />
        </RelatedContext.Provider>
      </div>
      <h1>YOUR OUTFITS</h1>
      <div>
        <Outfit productId={currProductId}/>
      </div>
    </div>
  );
};

export default Related;

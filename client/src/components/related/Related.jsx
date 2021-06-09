import React, {useState, useEffect, useContext} from 'react';
import RelatedProducts from './RelatedProducts.jsx';
import YourOutfit from './YourOutfit.jsx';

import axios from 'axios';

export const RelatedContext = React.createContext([]);

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

        // Retrieves data and styles of SPECIFIC product
        .then(related => {
          let promises = [];
          for (var i = 0; i < related.length; i++) {
            promises.push(
              axios('http://localhost:3000/product', {headers: {'productId': related[i]}})
                .then(response => {
                  return response.data;
                })
            );
          }
          Promise.all(promises).then((related) => {
            setRelatedProducts(related);
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
      <RelatedContext.Provider value={relatedProducts}>
        <h1>RELATED PRODUCTS</h1>
        <RelatedProducts />
      </RelatedContext.Provider>
      {/* <h1>YOUR OUTFIT</h1>
      <YourOutfit /> */}
    </div>
  );
};

export default Related;

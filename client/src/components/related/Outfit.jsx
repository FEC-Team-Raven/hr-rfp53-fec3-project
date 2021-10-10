import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard.jsx';

import axios from 'axios';

export const OutfitContext = React.createContext({});

const Outfit = ({ currProductId }) => {
  const [ outfitIds, setOutfitIds ] = useState([]); // contains user's saved outfits IDs
  const [ loading, setLoading ] = useState(true);

  const outfitVals = {
    currProductId,
    outfitIds,
    setOutfitIds
  };

  useEffect(() => {
    if (loading) {
      axios({
        method: 'GET',
        url: `products/${currProductId}`
      })
        .then(res => {
          setAllOutfitData(res.data);
          setLoading(false);
        })
        .catch(err => console.error(err));
    }
  }, []);

  const addOutfit = () => {
    // Prevents duplicate outfits
    let unique = true;
    if (unique) {
      setOutfitIds([...outfitIds, currProductId]);
      console.log(allOutfitData);
    } else {
      console.log('Outfit already added!');
    }
  };

  return (
    <div id="outfit">
      <div id="prev" className="carousel__button">&#x2190;</div>
      <div className="carousel">

        <div className="carousel__images">
          <div id="add_outfit_button" className="card" onClick={addOutfit}>
            <h1>+</h1>
            <h2>Add to Outfit</h2>
          </div>
          <OutfitContext.Provider value={outfitVals}>
            {outfitIds.map(outfitId =>
              <ProductCard
                productId={outfitId}
                list={'outfit'}
                key={currProductId}/>)
            }
          </OutfitContext.Provider>
        </div>
      </div>

      <div id="next" className="carousel__button">&#x2192;</div>
    </div>

  );
};

export default Outfit;

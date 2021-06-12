import React, {useState, useEffect, useContext} from 'react';
import ProductCard from './ProductCard.jsx';

import axios from 'axios';

export const OutfitContext = React.createContext([]);

const Outfit = ({productId}) => {
  const [outfitIds, setOutfitIds] = useState([]);
  const [outfits, setOutfits] = useState([]);
  const [isClicked, handleClick] = useState([false]);

  const providerVal = {
    outfitIds,
    setOutfitIds,
    outfits,
    setOutfits
  };

  const addOutfit = () => {
    handleClick(true);
    // Prevents duplicate outfits
    let unique = !outfitIds.includes(productId);

    if (unique) {
      handleClick(false);
      axios('http://localhost:3000/product', {headers: {'productId': productId}})
        .then(response => {
          setOutfitIds([...outfitIds, response.data.id]);
          setOutfits([...outfits, response.data]);
        });
    }
  };

  return (
    <div className="outfit list">
      <div className="card addOutfit">
        <button onClick={addOutfit}>+</button>
        <h2>Add to Outfit</h2>
      </div>
      <OutfitContext.Provider value={providerVal}>
        {outfits.map(outfit =>
          <ProductCard
            product={outfit}
            listType={'outfit'}
            key={outfit.id}/>)
        }
      </OutfitContext.Provider>
    </div>
  );
};

export default Outfit;

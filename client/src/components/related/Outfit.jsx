import React, {useState, useEffect, useContext} from 'react';
import ProductCard from './ProductCard.jsx';

import axios from 'axios';

export const OutfitContext = React.createContext([]);

const Outfit = ({productId}) => {
  const [outfitIds, setOutfitIds] = useState([]);
  const [outfits, setOutfits] = useState([]);

  const providerVal = {
    outfitIds,
    setOutfitIds,
    outfits,
    setOutfits
  };

  const addOutfit = () => {
    // Prevents duplicate outfits
    // let unique = !outfitIds.includes(productId);
    // if (unique) {
      axios('http://localhost:3000/products/productid', {headers: {'productId': productId}})
        .then(response => {
          setOutfitIds([...outfitIds, response.data.id]);
          setOutfits([...outfits, response.data]);
        })
        .catch(err => {
          throw err;
        });
    // }
  };

  return (
    <ol className="outfit list carousel__viewport">
      <li id="carousel__slide0" className="card addOutfit carousel__slide">
        <button className="addOutfit-btn" onClick={addOutfit}>&#43;</button>
        <h2>Add to Outfit</h2>
      </li>
      <OutfitContext.Provider value={providerVal}>
        {outfits.map(outfit =>
          <ProductCard
            product={outfit}
            listType={'outfit'}
            key={outfit.id}/>)
        }
      </OutfitContext.Provider>
    </ol>
  );
};

export default Outfit;

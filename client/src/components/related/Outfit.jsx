import React, {useState, useEffect, useContext} from 'react';
import ProductCard from './ProductCard.jsx';

import axios from 'axios';

import { OutfitContext } from './Related.jsx';

const Outfit = () => {
  const currProductData = useContext(OutfitContext).currProductData;
  const currProductStyles = useContext(OutfitContext).currProductStyles;

  // Adds product name to current product styles
  currProductStyles.name = currProductData.name;

  const outfitIds = useContext(OutfitContext).outfitIds;
  const setOutfitIds = useContext(OutfitContext).setOutfitIds;
  const outfits = useContext(OutfitContext).outfits;
  const setOutfits = useContext(OutfitContext).setOutfits;

  const addOutfit = () => {
    // Prevents duplicate outfits
    let unique = !outfitIds.includes(currProductStyles.product_id);
    if (unique) {
      setOutfitIds([...outfitIds, currProductStyles.product_id]);
      setOutfits([...outfits, currProductStyles]);
    }
  };

  return (
    <div className="carousel__cards">
      <div className="card addOutfit" onClick={addOutfit}>
        <button className="addOutfit-btn">&#43;</button>
        <h2>Add to Outfit</h2>
      </div>
      {outfits.map(outfit =>
        <ProductCard
          product={outfit}
          list={'outfit'}
          key={outfit.product_id}/>)
      }
    </div>
  );
};

export default Outfit;

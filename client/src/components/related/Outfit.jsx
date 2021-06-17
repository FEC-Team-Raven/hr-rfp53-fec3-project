import React, {useState, useEffect, useContext} from 'react';
import ProductCard from './ProductCard.jsx';

import axios from 'axios';

import { OutfitContext } from './Related.jsx';

const Outfit = ({productId}) => {
  const outfitIds = useContext(OutfitContext).outfitIds;
  const setOutfitIds = useContext(OutfitContext).setOutfitIds;
  const outfits = useContext(OutfitContext).outfits;
  const setOutfits = useContext(OutfitContext).setOutfits;

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
    <div className="carousel__cards">
      <div className="card addOutfit">
        <button className="addOutfit-btn" onClick={addOutfit}>&#43;</button>
        <h2>Add to Outfit</h2>
      </div>
      {outfits.map((outfit, index) =>
        <ProductCard
          cardNum={index}
          product={outfit}
          list={'outfit'}
          key={outfit.id}/>)
      }
    </div>
  );
};

export default Outfit;

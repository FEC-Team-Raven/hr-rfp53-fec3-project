import React, {useState, useEffect, useContext} from 'react';
import ProductCard from './ProductCard.jsx';

import axios from 'axios';

const Outfit = ({productId}) => {
  const [outfitIds, setOutfitIds] = useState([]);
  const [outfits, setOutfits] = useState([]);
  const [isClicked, handleClick] = useState([false]);

  const addOutfit = () => {
    handleClick(true);
    // Prevent duplicate outfits
    if (outfitIds.includes(productId)) {
      console.log('Outfit already added!');
    } else {
      if (isClicked) {
        handleClick(false);
      }

      axios('http://localhost:3000/product', {headers: {'productId': productId}})
        .then(response => {
          setOutfitIds([...outfitIds, response.data.id]);
          setOutfits([...outfits, response.data]);
        });
    }
  };

  return (
    <div className="grid-container">
      <div className="card addOutfit">
        <button onClick={addOutfit}>+</button>
        <h2>Add to Outfit</h2>
      </div>
      {outfits.map(outfit =>
        <ProductCard product={outfit} key={outfit.id}/>)
      }
    </div>
  );
};

export default Outfit;

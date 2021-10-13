import React, { useState, useEffect, useContext } from 'react';
import ProductCard from '../ProductCard.jsx';

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

  // Carousel
  const carouselImages = document.querySelectorAll('[id=outfit-card]');
  const carouselButtons = document.querySelectorAll('.carousel__button');
  const numberOfImages = carouselImages.length;
  let relatedImgIndex = 1;
  let translateX = 0;

  // Carousel navigation
  carouselButtons.forEach(button => {
    button.addEventListener('click', event => {
      // Previous button
      if (event.target.id === 'prev') {
        if (relatedImgIndex !== 1) {
          relatedImgIndex--;
          translateX += 258.7;
        }
      // Next button
      } else {
        if (relatedImgIndex < (numberOfImages - 3)) {
          relatedImgIndex++;
          translateX -= 258.7;
        }
      }

      carouselImages.forEach(image => {
        image.style.transform = `translateX(${translateX}px)`;
      });
    });
  });

  return (
    <div id="outfit">
      {/* <div id="prev" className="carousel__button">&#x2190;</div> */}
      <div className="carousel">

        <div className="carousel__images">
          <div id="add-outfit-button" className="card" onClick={addOutfit}>
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

      {/* <div id="next" className="carousel__button">&#x2192;</div> */}
    </div>

  );
};

export default Outfit;

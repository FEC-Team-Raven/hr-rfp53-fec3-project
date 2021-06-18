import React, { useState, useEffect, useContext} from 'react';

import Compare from './Compare.jsx';
import { OutfitContext } from './Related.jsx';

const OutfitActionButton = ({ product, list }) => {
  const currProductId = useContext(OutfitContext).currProductData.id;
  const outfits = useContext(OutfitContext).outfits;
  const outfitIds = useContext(OutfitContext).outfitIds;
  const setOutfitIds = useContext(OutfitContext).setOutfitIds;
  const setOutfits = useContext(OutfitContext).setOutfits;

  const removeOutfit = () => {
    // Remove productid from outfidIds
    setOutfitIds(outfitIds.filter(outfitId => outfitId !== product.product_id));
    // Remove productid from outfits
    setOutfits(outfits.filter(outfit => outfit.product_id !== product.product_id));
  };

  return (
    <div>
      <button id="remove-btn" className="action-btn" onClick={removeOutfit}>&#10005;</button>
    </div>
  );
};

export default OutfitActionButton;

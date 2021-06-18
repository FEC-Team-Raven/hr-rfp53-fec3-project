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

  const renderButton = () => {
    if (list === 'outfit') {
      return <span>&#10005;</span>;
    } else {
      return <span>&#x2605;</span>;
    }
  };

  return (
    <div>
      <button className="action-btn" onClick={removeOutfit}>{renderButton()}</button>
    </div>
  );
};

export default OutfitActionButton;
// hi

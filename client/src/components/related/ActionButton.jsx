import React, {useState, useEffect, useContext} from 'react';

import {OutfitContext} from './Outfit.jsx';

const ActionButton = ({productId, listType}) => {
  // oc = outfit context
  const oc = useContext(OutfitContext);
  // console.log('context:', oc);
  // console.log('productId:', productId);

  const handleClick = (e) => {
    // Remove productid from outfidIds
    oc.setOutfitIds(oc.outfitIds.filter(outfitId => outfitId !== productId));
    // Remove productid from outfits
    oc.setOutfits(oc.outfits.filter(outfit => outfit.id !== productId));
  };

  return (
    <button onClick={handleClick}>x</button>
  );
};

export default ActionButton;

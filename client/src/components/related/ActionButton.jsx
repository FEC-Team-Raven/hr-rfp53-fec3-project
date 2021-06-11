import React, { useState, useEffect, useContext} from 'react';

import { OutfitContext } from './Outfit.jsx';

const ActionButton = ({productId, listType}) => {
  // oc = outfit context
  const oc = useContext(OutfitContext);

  const handleClick = (e) => {
    // OUTFIT ACTION BUTTON
    if (listType === 'outfit') {
      // Remove productid from outfidIds
      oc.setOutfitIds(oc.outfitIds.filter(outfitId => outfitId !== productId));
      // Remove productid from outfits
      oc.setOutfits(oc.outfits.filter(outfit => outfit.id !== productId));


    // RELATED PRODUCTS ACTION BUTTON
    } else {
      console.log('hi');
    }
  };


  const renderButton = () => {
    if (listType === 'outfit') {
      return 'x';
    } else {
      return 'star';
    }
  };

  return (
    <button onClick={handleClick}>{renderButton()}</button>
  );
};

export default ActionButton;

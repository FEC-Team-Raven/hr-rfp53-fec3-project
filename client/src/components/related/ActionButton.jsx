import React, { useState, useEffect, useContext} from 'react';

import { OutfitContext } from './Outfit.jsx';

const ActionButton = ({productId, listType}) => {
  // oc = outfit context
  const oc = useContext(OutfitContext);
  const [modal, toggleModal] = useState(false);

  const handleClick = (e) => {
    // OUTFIT ACTION BUTTON
    if (listType === 'outfit') {
      // Remove productid from outfidIds
      oc.setOutfitIds(oc.outfitIds.filter(outfitId => outfitId !== productId));
      // Remove productid from outfits
      oc.setOutfits(oc.outfits.filter(outfit => outfit.id !== productId));


    // RELATED PRODUCTS ACTION BUTTON
    } else {
      // Opens a modal window, compares details of product of current page to product that was selected from the list
      if (modal) {
        toggleModal(!modal);
      } else {
        toggleModal(true);
      }
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
    <div>
      {modal &&
      <div id="modal" onClick={handleClick}>
        <button id="close" onClick={handleClick}>X</button>
      </div>
      }
      <button onClick={handleClick}>{renderButton()}</button>
    </div>
  );
};

export default ActionButton;

import React, { useContext} from 'react';
import { OutfitContext } from './Outfit.jsx';

const OutfitActionButton = ({ productId }) => {
  const currProductId = useContext(OutfitContext).currProductId;
  const outfitIds = useContext(OutfitContext).outfitIds;
  const setOutfitIds = useContext(OutfitContext).setOutfitIds;

  const removeOutfit = () => {
    // Remove productid from outfidIds
    setOutfitIds(outfitIds.filter(outfitId => outfitId !== productId));
  };

  return (
    <div>
      <button className="remove_button" onClick={removeOutfit}>&#10005;</button>
    </div>
  );
};

export default OutfitActionButton;

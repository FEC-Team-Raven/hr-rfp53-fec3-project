import React, { useState, useEffect, useContext} from 'react';
import axios from 'axios';

import { OutfitContext } from './Outfit.jsx';

const ActionButton = ({currProductId, productId, listType}) => {
  const [currProductData, setCurrProductData] = useState({});
  const [loading, setLoading] = useState(true);
  // oc = outfit context
  const oc = useContext(OutfitContext);
  const [modal, toggleModal] = useState(false);

  useEffect(() => {
    if (loading) {
      setLoading(false);
      axios('http://localhost:3000/products/productid', {headers: {'productId': currProductId}})
        .then(response => {
          setCurrProductData(response.data);
        });
    }
  });


  const handleClick = (e) => {
    // OUTFIT ACTION BUTTON
    if (listType === 'outfit') {
      // Remove productid from outfidIds
      oc.setOutfitIds(oc.outfitIds.filter(outfitId => outfitId !== productId));
      // Remove productid from outfits
      oc.setOutfits(oc.outfits.filter(outfit => outfit.id !== productId));

    // RELATED PRODUCTS ACTION BUTTON
    } else {
      if (modal) {
        toggleModal(false);
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
      <div id="modal">
        COMPARING
        <button id="close" onClick={handleClick}>X</button>
        <div id="compare">
          <div className="current-product">
            {currProductData.name}
          </div>
          <div className="characteristics">
            Characteristics
          </div>
          <div className="compare-product">
            Compared Product
          </div>
        </div>
      </div>
      }
      <button onClick={handleClick}>{renderButton()}</button>
    </div>
  );
};

export default ActionButton;

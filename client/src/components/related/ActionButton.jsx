import React, { useState, useEffect, useContext} from 'react';
import axios from 'axios';

import Compare from './Compare.jsx';
import { OutfitContext } from './Outfit.jsx';

const ActionButton = ({ currProductId, product, list, uniqueKey}) => {
  const oc = useContext(OutfitContext); // oc = outfit context
  const [currProductData, setCurrProductData] = useState({});
  const [loading, setLoading] = useState(true);
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
    if (list === 'outfit') {
      // Remove productid from outfidIds
      oc.setOutfitIds(oc.outfitIds.filter(outfitId => outfitId !== product.id));
      // Remove productid from outfits
      oc.setOutfits(oc.outfits.filter(outfit => outfit.id !== product.id));

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
    if (list === 'outfit') {
      return <span>&#10005;</span>;
    } else {
      return <span>&#x2605;</span>;
    }
  };

  return (
    <div>
      {modal &&
      <div id="modal">
        COMPARING
        <button id="close" className="action-btn" onClick={handleClick}>&#10005;</button>
        <div id="compare">
          <div className="current-product">
            {currProductData.name}
          </div>
          <div className="compared-product">
            {product.name}
          </div>
        </div>
        <Compare
          currFeats={currProductData.features}
          compareFeats={product.features}/>
      </div>
      }
      <button className="action-btn" onClick={handleClick}>{renderButton()}</button>
    </div>
  );
};

export default ActionButton;

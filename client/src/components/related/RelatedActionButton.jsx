import React, { useState, useEffect, useContext} from 'react';
import axios from 'axios';

import Compare from './Compare.jsx';
import { RelatedContext } from './Related.jsx';

const RelatedActionButton = ({product, list}) => {
  // const handleModal = useContext(RelatedContext).handleModal;
  const setComparedProductData = useContext(RelatedContext).setComparedProductData;
  const modal = useContext(RelatedContext).modal;
  const toggleModal = useContext(RelatedContext).toggleModal;

  const handleModal = (e) => {
    setComparedProductData(product);
    if (modal) {
      toggleModal(false);
    } else {
      toggleModal(true);
    }
  };

  return (
    <div>
      <button id="compare-btn" className="action-btn light-2" onClick={handleModal}>&#x2605;</button>
    </div>
  );
};

export default RelatedActionButton;

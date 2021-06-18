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

  const renderButton = () => {
    if (list === 'outfit') {
      return <span>&#10005;</span>;
    } else {
      return <span>&#x2605;</span>;
    }
  };

  // Async:
  // (1) Set the state of the product being compared to
  // (2) Toggle the modal window

  return (
    <div>
      <button className="action-btn" onClick={handleModal}>{renderButton()}</button>
    </div>
  );
};

export default RelatedActionButton;

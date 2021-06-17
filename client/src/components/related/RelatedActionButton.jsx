import React, { useState, useEffect, useContext} from 'react';
import axios from 'axios';

import Compare from './Compare.jsx';
import { RelatedContext } from './Related.jsx';

const RelatedActionButton = ({product, list}) => {
  const handleModal = useContext(RelatedContext).handleModal;
  const setComparedProductData = useContext(RelatedContext).setComparedProductData;
  setComparedProductData(product);

  const renderButton = () => {
    if (list === 'outfit') {
      return <span>&#10005;</span>;
    } else {
      return <span>&#x2605;</span>;
    }
  };

  return (
    <div>
      <button className="action-btn" onClick={handleModal}>{renderButton()}</button>
    </div>
  );
};

export default RelatedActionButton;

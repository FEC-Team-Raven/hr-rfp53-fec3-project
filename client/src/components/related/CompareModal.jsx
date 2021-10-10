import React, { useState, useContext } from 'react';
import CompareHelper from './CompareHelper.jsx';

import { ModalContext } from './ProductCard.jsx';

const CompareModal = ({ currProductData, comparedProductData }) => {
  const modalStatus = useContext(ModalContext).showModal;
  const toggleModal = useContext(ModalContext).setShowModal;

  return (
    <div id="modal">
      <div id="modal-header" className="dark-1">
        COMPARING
      </div>
      <button id="close" className="action-btn" onClick={() => toggleModal(false)}>&#10005;</button>
      <div className="compare_container">
        <div id="compare">
          <div className="current-product">
            {currProductData.name}
          </div>
          <div className="compared-product">
            {comparedProductData.name}
          </div>
        </div>
        <CompareHelper
          currFeats={currProductData.features}
          compareFeats={comparedProductData.features}/>
      </div>
    </div>
  );
};

export default CompareModal;

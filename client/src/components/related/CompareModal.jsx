import React, { useState, useEffect } from 'react';
import CompareHelper from './CompareHelper.jsx';

const CompareModal = ({ currProductData, comparedProductData }) => {

  // console.log(currProductData, comparedProductData);

  // // Get the modal
  // let modal = document.getElementById('compare-modal');

  // console.log('modal:', modal);

  // // Get the button that opens the modal
  // let openModal = document.getElementById('open-compare-modal');
  // let closeModal = document.getElementById('close-compare-modal');


  // // When the user clicks on the button, open the modal
  // openModal.onclick = () => modal.style.display = 'block';

  // // When the user clicks on (x), close the modal
  // closeModal.onclick = () => modal.style.display = 'none';

  // // When the user lcicks on anywhere outside of the modal, close it
  // window.onclick = (e) => {
  //   if (e.target === modal) {
  //     modal.style.display = 'none';
  //   }
  // };

  return (
    <div id="compare-modal">

      {/* Modal Content */}
      <div className="compare-modal-content">
        <div id="modal-header" className="dark-1">
          COMPARING
        </div>
        <button id="close-compare-modal" className="action-btn" onClick={() => toggleModal(false)}>&#10005;</button>
        <div className="compare_container">
          <div id="compare">
            <div className="current_product">
              {currProductData.name}
            </div>
            <div className="compared_product">
              {comparedProductData.name}
            </div>
          </div>
          <CompareHelper
            currFeats={currProductData.features}
            compareFeats={comparedProductData.features}/>
        </div>
      </div>
    </div>
  );
};

export default CompareModal;

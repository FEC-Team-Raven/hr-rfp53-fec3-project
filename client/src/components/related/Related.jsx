import React, { useState, useEffect, useContext } from 'react';
import RelatedProducts from './RelatedProducts.jsx';
import Outfit from './Outfit.jsx';
import axios from 'axios';

export const ModalContext = React.createContext([]);

const Related = ({ currProductId }) => {

  // Modal Window state
  const [ currProductData, setCurrProductData ] = useState({});
  const [ comparedProductData, setComparedProductData] = useState({});
  const [ showModal, setShowModal ] = useState(false);

  // Modal Context values
  const modalVals = {
    showModal,
    setShowModal,
    comparedProductData,
    setComparedProductData
  };

  // When user clicks on star button, opens modal window
  const modalFunction = (event) => {
    let modal = document.getElementById('compare-modal');
    if (event.target.id === 'open-compare-modal') {
      modal.style.display = 'block';
    } else {
      modal.style.display = 'none';
    }
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    let modal = document.getElementById('compare-modal');
    if (event.target === modal) modal.style.display = 'none';
  };

  return (
    <div>
      <button id="open-compare-modal" className="action_button" onClick={modalFunction}>&#x2605;</button>

      <div id="compare-modal">

        <div className="compare-modal-content">
          <div id="modal-header" className="dark-1">
            COMPARING
            <span id="close-compare-modal" className="action-btn" onClick={modalFunction}>&#10005;</span>
          </div>
        </div>
      </div>

      <h1 id="title">RELATED PRODUCTS</h1>
      <RelatedProducts currProductId={currProductId}/>
      <h1 id="title">YOUR OUTFITS</h1>
      <Outfit currProductId={currProductId}/>
    </div>
  );
};

export default Related;

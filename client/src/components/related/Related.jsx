import React, { useState, useEffect, useContext } from 'react';
import RelatedProducts from './RelatedProducts.jsx';
import CompareHelper from './CompareHelper.jsx';
import Outfit from './Outfit.jsx';
import axios from 'axios';

export const ModalContext = React.createContext([]);

const Related = ({ currProductId }) => {
  // Modal Window state
  const [ currProductData, setCurrProductData ] = useState({});
  const [ comparedProductData, setComparedProductData] = useState({});
  const [ loading, setLoading ] = useState(true);

  useState(() => {
    if (loading) {

      // Retrieves current product data
      axios({
        method: 'GET',
        url: `products/${currProductId}`
      })
        .then(res => setCurrProductData(res.data))
        .catch(err => console.error(err));
    }
  });

  // When user clicks on star button, opens modal window
  const openModal = (event) => {
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

  // Modal Context values
  const modalVals = {
    comparedProductData,
    setComparedProductData,
    openModal
  };

  return (
    <div>
      <div id="compare-modal">
        <div className="compare-modal-content">
          <div id="modal-header" className="dark-1">
            COMPARING
            <span id="close-compare-modal" className="action-btn" onClick={openModal}>&#10005;</span>
          </div>

          <div className="compare-container">
            <div id="compare">
              <div className="current-product">
                {currProductData.name}
              </div>
              <div className="compared-product">
                {comparedProductData.name}
              </div>

              <CompareHelper
                currFeats={currProductData.features}
                compareFeats={comparedProductData.features}/>
            </div>
          </div>
        </div>
      </div>

      <ModalContext.Provider value={modalVals}>
        <h1 id="title">RELATED PRODUCTS</h1>
        <RelatedProducts currProductId={currProductId}/>
      </ModalContext.Provider>

      <h1 id="title">YOUR OUTFITS</h1>
      <Outfit currProductId={currProductId}/>
    </div>
  );
};

export default Related;

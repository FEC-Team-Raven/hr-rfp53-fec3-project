<<<<<<< HEAD
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
=======
import React, {useState, useEffect, useContext} from 'react';
import RelatedProducts from './RelatedProducts.jsx';
import Outfit from './Outfit.jsx';
import Compare from './Compare.jsx';
import sampleData from './sampleData.jsx';

import axios from 'axios';

export const RelatedContext = React.createContext([]);
export const OutfitContext = React.createContext([]);

let relatedTranslateX = 0;
let outfitTranslateX = 0;

const Related = ({currProductId}) => {

  // Related products IDs and data
  const [relatedIds, setRelatedIds] = useState([]);
  const [relatedStyles, setRelatedStyles] = useState([]);
  const [relatedProductData, setRelatedProductData] = useState([]);
  const [relatedRatings, setRelatedRatings] = useState([]);

  // Current product data
  const [currProductData, setCurrProductData] = useState({});
  const [currProductStyles, setCurrProductStyles] = useState({});

  // Carousel card indexes
  const [relatedImgIndex, setRelatedImageIndex] = useState(1);
  const [outfitImgIndex, setOutfitImageIndex] = useState(1);

  // Comparison modal window
  const [modal, toggleModal] = useState(false);
  const [comparedProductData, setComparedProductData] = useState({});

  // Your Outfit state components
  const [outfitIds, setOutfitIds] = useState([]);
  const [outfits, setOutfits] = useState([]);

  // Loads data
  const [loading, setLoading] = useState(true);

  // Data retrieval
  useEffect(() => {
    if (loading) {
      setLoading(false);
      // Retrieves an ARRAY of related IDs of a specific product
      axios('http://localhost:3000/products/relatedIds', {headers: {'productId': currProductId}})
        .then(response => {
          setRelatedIds(response.data);
          return response.data;
        })

        // Retrieves data of specific products
        .then(related => {
          let stylePromises = [];
          let relatedPromises = [];
          let ratingPromises = [];
          for (var i = 0; i < related.length; i++) {
            stylePromises.push(
              axios(`http://localhost:3000/products/${related[i]}/styles`, {params: {'productId': related[i]}})
                .then(response => {
                  return response.data;
                })
            );
            relatedPromises.push(
              axios(`http://localhost:3000/products/${related[i]}`, {params: {'productId': related[i]}})
                .then(response => {
                  return response.data;
                })
            );
            ratingPromises.push(
              axios('http://localhost:3000/reviews/meta', {params: {'productId': related[i]}})
                .then(response => {
                  return response.data;
                })
            );
          }
          Promise.all(stylePromises).then((styles) => {
            setRelatedStyles(styles);
          });
          Promise.all(relatedPromises).then((product) => {
            setRelatedProductData(product);
          });
          Promise.all(ratingPromises).then((rating) => {
            setRelatedRatings(rating);
          });
        })

        .catch(err => {
          console.error(err);
          setLoading(true);
        });

      // Gets current product data
      axios('http://localhost:3000/products/productid', {params: {'productId': currProductId}})
        .then(response => {
          setCurrProductData(response.data);
        });

      axios('http://localhost:3000/products/styles', {params: {'productId': currProductId}})
        .then(response => {
          setCurrProductStyles(response.data);
        });
    }
  });

  // Related Products carousel
  const relatedCarouselCards = document.querySelector('.carousel__cards');
  const cards = document.querySelector('.related');
  const totalCards = 7;
  const handleRelatedNav = (e) => {
    if (e.target.id === 'related prev') {
      relatedTranslateX += 256.5;
      setRelatedImageIndex(relatedImgIndex - 1);
    } else if (e.target.id === 'related next') {
      if (relatedImgIndex !== totalCards) {
        relatedTranslateX -= 256.5;
        setRelatedImageIndex(relatedImgIndex + 1);
      }
    }
    relatedCarouselCards.style.transform = `translateX(${relatedTranslateX}px)`;
    // Your Outfit button behavior
    //   if (e.target.id === 'outfit prev') {
    //     outfitTranslateX += 256.5;
    //     setOutfitImageIndex(outfitImgIndex - 1);
    //   } else if (e.target.id === 'outfit next') {
    //     outfitTranslateX -= 256.5;
    //     setOutfitImageIndex(outfitImgIndex + 1);
    //   }
    //   relatedCarouselCards.style.transform = `translateX(${outfitTranslateX}px)`;
    // }
  };


  // Related Context values
  const relatedVals = {
    relatedStyles,
    relatedProductData,
    relatedRatings,
    modal,
    toggleModal,
    setComparedProductData
  };

  // Outfit Context values
  const outfitVals = {
    currProductData,
    currProductStyles,
    outfitIds,
    setOutfitIds,
    outfits,
    setOutfits
>>>>>>> c6dae24a3bb8735cc8c7c165af69a525b4300fec
  };

  return (
    <div>
<<<<<<< HEAD
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
=======
      <h1>RELATED PRODUCTS</h1>
      {modal &&
        <div id="modal">
          COMPARING
          <button id="close" className="action-btn" onClick={() => toggleModal(false)}>&#10005;</button>
          <div id="compare">
            <div className="current-product">
              {currProductData.name}
            </div>
            <div className="compared-product">
              {comparedProductData.name}
            </div>
          </div>
          <Compare
            currFeats={currProductData.features}
            compareFeats={comparedProductData.features}/>
        </div>
      }

      <div className="carousel">
        {relatedImgIndex > 1 &&
        <button id="related prev" className="carousel__button prev" onClick={handleRelatedNav}>{'<'}</button>
        }
        <RelatedContext.Provider value={relatedVals}>
          <RelatedProducts />
        </RelatedContext.Provider>
        {(relatedImgIndex !== (totalCards - 4) && totalCards > 4) &&
          <button id="related next" className="carousel__button next" onClick={handleRelatedNav}>{'>'}</button>
        }
      </div>

      <h1>YOUR OUTFITS</h1>
      <div className="carousel">
        {false &&
        <button id="outfit prev" className="carousel__button prev" onClick={handleRelatedNav}>{'<'}</button>
        }
        <OutfitContext.Provider value={outfitVals}>
          <Outfit/>
        </OutfitContext.Provider>
        {false &&
          <button id="outfit next" className="carousel__button next" onClick={handleRelatedNav}>{'>'}</button>
        }
      </div>
>>>>>>> c6dae24a3bb8735cc8c7c165af69a525b4300fec
    </div>
  );
};

export default Related;

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
  const [relatedProducts, setRelatedProducts] = useState([]);

  // Carousel card indexes
  const [relatedImgIndex, setRelatedImageIndex] = useState(1);
  const [outfitImgIndex, setOutfitImageIndex] = useState(1);

  // Comparison modal window
  const [modal, toggleModal] = useState(false);
  const [currProductData, setCurrProductData] = useState({});
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
          let promises = [];
          for (var i = 0; i < related.length; i++) {
            promises.push(
              axios('http://localhost:3000/products/styles', {headers: {'productId': related[i]}})
                .then(response => {
                  return response.data;
                })
            );
          }
          Promise.all(promises).then((products) => {
            setRelatedProducts(products);
          });
        })

        .catch(err => {
          console.error(err);
          setLoading(true);
        });

      // Gets current product data
      axios('http://localhost:3000/products/productid', {headers: {'productId': currProductId}})
        .then(response => {
          setCurrProductData(response.data);
        });
    }
  });

  // Related Products carousel
  const relatedCarouselCards = document.querySelector('.carousel__cards');
  const cards = document.querySelector('.related');
  console.log('cards:', relatedCarouselCards);
  const totalCards = sampleData.length;
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
    //   // Your Outfit button behavior
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

  // Action button functionalities
  const handleModal = (e) => {
    if (modal) {
      toggleModal(false);
    } else {
      toggleModal(true);
    }
  };

  // Related Context values
  const relatedVals = {
    currProductId,
    relatedProducts,
    modal,
    toggleModal,
    handleModal,
    setComparedProductData
  };

  // Outfit Context values
  const outfitVals = {
    currProductData,
    outfitIds,
    setOutfitIds,
    outfits,
    setOutfits
  };

  return (
    <div>
      <h1>RELATED PRODUCTS</h1>
      {modal &&
        <div id="modal">
          COMPARING
          <button id="close" className="action-btn" onClick={handleModal}>&#10005;</button>
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
        {true &&
        <button id="outfit prev" className="carousel__button prev" onClick={handleRelatedNav}>{'<'}</button>
        }
        <OutfitContext.Provider value={outfitVals}>
          <Outfit productId={currProductId}/>
        </OutfitContext.Provider>
        {true &&
          <button id="outfit next" className="carousel__button next" onClick={handleRelatedNav}>{'>'}</button>
        }
      </div>
    </div>
  );
};

export default Related;

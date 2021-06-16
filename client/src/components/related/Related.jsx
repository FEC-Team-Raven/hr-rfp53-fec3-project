import React, {useState, useEffect, useContext} from 'react';
import RelatedProducts from './RelatedProducts.jsx';
import Outfit from './Outfit.jsx';
import sampleData from './sampleData.jsx';

import axios from 'axios';

export const RelatedContext = React.createContext([]);

let translateX = 0;

const Related = ({currProductId}) => {
  const [relatedIds, setRelatedIds] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [relatedImgIndex, setImageIndex] = useState(1);
  const [loading, setLoading] = useState(true);

  const providerVal = {
    currProductId,
    relatedProducts
  };

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
    }
  });

  // Carousel behavior
  const carouselCards = document.querySelector('.carousel__cards');
  const totalCards = sampleData.length;
  const handleClick = (e) => {
    console.log('relatedImgIndex:', relatedImgIndex);
    if (e.target.id === 'prev') {
      translateX += 256.5;
      setImageIndex(relatedImgIndex - 1);
    } else {
      if (relatedImgIndex !== totalCards) {
        translateX -= 256.5;
        setImageIndex(relatedImgIndex + 1);
      }
    }
    carouselCards.style.transform = `translateX(${translateX}px)`;
  };

  return (
    <div>
      <h1>RELATED PRODUCTS</h1>
      <div className="carousel">
        {relatedImgIndex > 1 &&
        <button id="prev" className="carousel__button prev" onClick={handleClick}>{'<'}</button>
        }
        <RelatedContext.Provider value={providerVal}>
          <RelatedProducts />
        </RelatedContext.Provider>
        {relatedImgIndex !== (totalCards - 4) &&
          <button id="next" className="carousel__button next" onClick={handleClick}>{'>'}</button>
        }
      </div>
      <div className="carousel">
        {relatedImgIndex > 1 &&
        <button id="prev" className="carousel__button prev" onClick={handleClick}>{'<'}</button>
        }
        <h1>YOUR OUTFITS</h1>
        <Outfit productId={currProductId}/>
        {relatedImgIndex !== (totalCards - 4) &&
          <button id="next" className="carousel__button next" onClick={handleClick}>{'>'}</button>
        }
      </div>
    </div>
  );
};

export default Related;

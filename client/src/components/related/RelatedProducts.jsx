import React, { useState, useEffect, useContext } from 'react';
import ProductCard from './ProductCard.jsx';
import CompareModal from './CompareModal.jsx';

import axios from 'axios';

const RelatedProducts = ({ currProductId }) => {
  const [ relatedIds, setRelatedIds ] = useState([]);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    if (loading) {
      axios({
        method: 'GET',
        url: `products/${currProductId}/related`
      })
        .then(res => {
          setRelatedIds(res.data);
          setLoading(false);
        })
        .catch(err => console.error(err));
    }
  }, []);

  // Carousel
  const carouselImages = document.querySelectorAll('.card');
  const carouselButtons = document.querySelectorAll('.carousel__button');
  const numberOfImages = carouselImages.length;
  let relatedImgIndex = 1;
  let translateX = 0;

  // Carousel navigation
  carouselButtons.forEach(button => {
    button.addEventListener('click', event => {
      // Previous button
      if (event.target.id === 'prev') {
        if (relatedImgIndex !== 1) {
          relatedImgIndex--;
          translateX += 258.7;
        }
      // Next button
      } else {
        if (relatedImgIndex < (numberOfImages - 3)) {
          relatedImgIndex++;
          translateX -= 258.7;
        }
      }
      carouselImages.forEach(image => {
        image.style.transform = `translateX(${translateX}px)`;
      });
    });
  });

  return (
    <div className="related">
      <div id="prev" className="carousel__button">&#x2190;</div>

      <div className="carousel">
        <div className="carousel__images">
          {relatedIds.map(productId =>
            <ProductCard
              currProductId={currProductId}
              productId={productId}
              list={'related'}/>
          )}
        </div>
      </div>

      <div id="next" className="carousel__button">&#x2192;</div>

    </div>

  );

};

export default RelatedProducts;

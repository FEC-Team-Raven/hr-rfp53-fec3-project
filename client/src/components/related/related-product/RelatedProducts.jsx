import React, { useState, useEffect } from 'react';
import ProductCard from '../ProductCard.jsx';
import axios from 'axios';

const RelatedProducts = ({ currProductId }) => {
  const [ relatedIds, setRelatedIds ] = useState([]);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    // Retrieves related id's of currently displayed product
    if (loading) {
      axios({
        method: 'GET',
        url: `products/${currProductId}/related`
      })
        .then(res => {
          let result = [...new Set(res.data)]; // Filters out duplicate id's
          setRelatedIds(result);
          setLoading(false);
        })
        .catch(err => console.error(err));
    }
  }, []);

  // Carousel Component
  let carouselImages = document.querySelectorAll('[id=related-card]');
  const carouselButtons = document.querySelectorAll('.carousel__button');
  const numberOfImages = carouselImages.length;
  let relatedImgIndex = 1;
  let translateX = 0;

  // Carousel Navigation Functionality
  carouselButtons.forEach(button => {
    button.addEventListener('click', event => {
      // Previous Button
      if (event.target.id === 'prev') {
        if (relatedImgIndex !== 1) {
          relatedImgIndex--;
          translateX += 258.7;
        }
      // Next Button
      } else {
        if (relatedImgIndex <= (numberOfImages - 4)) {
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
              list={'related'}
              key={productId}/>
          )}
        </div>
      </div>

      <div id="next" className="carousel__button">&#x2192;</div>
    </div>

  );

};

export default RelatedProducts;

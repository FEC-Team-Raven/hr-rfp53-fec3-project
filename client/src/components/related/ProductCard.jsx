import React, {useState, useEffect, useContext} from 'react';
import Stars from '../Stars.jsx';
import ActionButton from './ActionButton.jsx';


const sampleImg = 'http://pm1.narvii.com/7060/c0f21f5ee6e0f9dff1d677ce423d57b35ebbbffcr1-738-1083v2_uhq.jpg';

let relatedCardNum = 1;
let outfitCardNum = 1;

let count = 0;

const ProductCard = ({currProductId, product, list}) => {
  const renderCard = () => {
    count++;
    console.log('count:', count);

    let cardId;

    if (list === 'related') {
      cardId = 'related carousel__slide' + relatedCardNum;
      relatedCardNum++;

    } else {
      cardId = 'outfit carousel__slide' + outfitCardNum;
      outfitCardNum++;
    }

    let nextSlide = '#carousel__slide' + outfitCardNum + 1;

    return (
      <li id={cardId} className="carousel__slide">
        <div className="card carousel__snapper">
          <img src={sampleImg} width="250" height="300"></img>
          <ActionButton
            currProductId={currProductId}
            product={product}
            list={list}/>
          <div className="category">CATEGORY
            <div>{product.name}</div>
            <div>{product.default_price}</div>
            <Stars />
          </div>
          <a href={nextSlide}
            className="carousel__next">Go to next slide</a>
        </div>
      </li>
    );
  };

  return (
    renderCard()
  );
};

export default ProductCard;

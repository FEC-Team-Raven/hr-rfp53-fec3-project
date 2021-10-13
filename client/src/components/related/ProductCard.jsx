import React, { useState, useEffect, useContext } from 'react';
import Stars from '../Stars.jsx';
import OutfitActionButton from './your-outfits/OutfitActionButton.jsx';
import axios from 'axios';

import { ModalContext } from './Related.jsx';

const sampleImg = 'https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg';

const ProductCard = ({ productId, list }) => {
  const [ productData, setProductData ] = useState({});
  const [ stylesData, setStyles ] = useState({});
  const [ averageRating, setAverageRating ] = useState(0);
  const [ loading, setLoading ] = useState(true);

  // Modal Window component
  const openModal = useContext(ModalContext).openModal;
  const setComparedProductData = useContext(ModalContext).setComparedProductData;

  useEffect(() => {
    if (loading) {
      // Retrieves product data and updates compared product data
      axios({
        method: 'GET',
        url: `products/${productId}`
      })
        .then(res => {
          setProductData(res.data);
          setComparedProductData(res.data);
        })
        .catch(err => console.error(err));

      // Retrieves product styles data
      axios({
        method: 'GET',
        url: `products/${productId}/styles`
      })
        .then(res => setStyles(res.data))
        .catch(err => console.error(err));

      // Retrieves product rating data
      axios({
        method: 'GET',
        url: `/reviews/meta/${productId}`
      })
        .then (res => {
          let totalRatings = Object.values(res.data.ratings).reduce((a, b) => Number(a) + Number(b));
          let totalStarCount = Object.keys(res.data.ratings).map(starCount => starCount * res.data.ratings[starCount]).reduce((a, b) => a + b);
          setAverageRating(totalStarCount / totalRatings);
          setLoading(false);
        })
        .catch(err => console.error(err));
    }
  }, []);

  // Retrieves thumbnail url. By default, thumbnail the missing picture png
  let thumbnail = sampleImg;
  if (stylesData.results) {
    thumbnail = stylesData.results[0].photos[0].thumbnail_url;
  }

  // Modal Window action button
  const modalFunction = (event) => {
    setComparedProductData(productData);
    openModal(event);
  };

  // Renders action button depending on list type
  const actionButton = (list) => {
    // Renders button that opens modal window
    if (list === 'related') {
      return (
        <button
          id="open-compare-modal"
          className="action_button"
          onClick={modalFunction}
        >&#x2605;</button>
      );
    } else {
      // Renders button that removes an outfit from user's saved outfits
      return (
        <OutfitActionButton productId={productId}/>
      );
    }
  };

  if (loading) {
    return (<div className="card">Loading product...</div>);
  }

  return (
    <div className="card">
      <img className="thumbnail" src={thumbnail}/>
      {actionButton(list)}
      <div className="product_info">
        <div className="category">{productData.category}</div>
        <div className="product_name">{productData.name}</div>
        <div className="product_price">{'$' + productData.default_price}</div>
        <div className="product_rating">
          <Stars rating={averageRating}/>
        </div>
      </div>

    </div>
  );

};

export default ProductCard;

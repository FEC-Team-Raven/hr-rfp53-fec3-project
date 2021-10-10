import React, {useState, useEffect, useContext} from 'react';
import Stars from '../Stars.jsx';
import RelatedActionButton from './RelatedActionButton.jsx';
import OutfitActionButton from './OutfitActionButton.jsx';

import axios from 'axios';

import product from './sampleData.js';
import styles from './sampleData.js';

const sampleImg = 'https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg';

// Product Card Components:
// Category
// Name
// Price
// Rating

const ProductCard = ({ productId, list }) => {
  const [ productData, setProductData ] = useState(product.product);
  const [ stylesData, setStyles ] = useState(styles.styles);
  const [ averageRating, setAverageRating ] = useState(0);

  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    if (loading) {
      // Retrieves product data
      axios({
        method: 'GET',
        url: `products/${productId}`
      })
        .then(res => {
          setProductData(res.data);
        })
        .catch(err => console.error(err));

      // Retrieves product styles data
      axios({
        method: 'GET',
        url: `products/${productId}/styles`
      })
        .then(res => {
          setStyles(res.data);
          setLoading(false);
        })
        .catch(err => console.error(err));


      // Retrieves product rating data
      axios({
        method: 'GET',
        url: `/reviews/meta/${productId}`
      })
        .then (res => {
          console.log('results:', res.data);
          let totalRatings = Object.values(res.data.ratings).reduce((a, b) => Number(a) + Number(b));
          let totalStarCount = Object.keys(res.data.ratings).map(starCount => starCount * res.data.ratings[starCount]).reduce((a, b) => a + b);
          setAverageRating(totalStarCount / totalRatings);
        })
        .catch(err => {
          console.error(err);
        });
    }
  });

  console.log('product data:', productData);
  console.log('styles data:', stylesData);

  // Retrieves thumbnail url
  let thumbnail = sampleImg;
  if (stylesData.results) {
    thumbnail = stylesData.results[0].photos[0].thumbnail_url;
  }

  // Renders action button depending on list type
  const actionButton = (list) => {
    if (list === 'related') {
      return (
        <button className="action_button">&#x2605;</button>
      );
    } else {
      return (
        <button className="action_button">&#x0353;</button>
      );
    }
  };

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

// <div className="carousel__photo">
//   <img className="carousel__photo" src={thumbnail}></img>
//   <div>button</div>
//   <div>product info
//     <div>{productData.category}</div>
//     <div>{productData.name}</div>
//     <div>price</div>
//     <div>rating</div>
//   </div>
// </div>

// // Rating calculator helper function
// const computeRating = () => {
//   let ratingObj = product.rating;
//   let totalRatings = 0;
//   let numberOfRatings = 0;
//   for (var score in ratingObj) {
//     totalRatings += (Number(score) * Number(ratingObj[score]));
//     numberOfRatings += Number(ratingObj[score]);
//   }
//   return totalRatings / numberOfRatings;

// };
// let rating = computeRating();

// let styles = product.results;
// let previewImg, defaultPrice, salePrice;

// // Renders product price and default image
// const renderProductInfo = () => {
//   for (let i = 0; i < styles.length; i++) {
//     if (styles[i]['default?']) {
//       previewImg = styles[i].photos[0].url;
//       defaultPrice = '$' + styles[i].original_price;
//       if (salePrice) {
//         defaultPrice = '<del>' + defaultPrice + '</del>';
//       }
//       break;
//     } else if (!styles[styles.length - 1]['default?']) {
//       defaultPrice = 'N/A';
//     }
//   }
// };
// renderProductInfo();

// // If missing image, then use placeholder image
// if (!previewImg) {
//   previewImg = sampleImg;
// }

// // Renders action button, depending on which list the button appears within
// const renderActionBtn = () => {
//   if (list === 'related') {
//     return (
//       <RelatedActionButton
//         product={product} list={list}/>
//     );
//   } else {
//     return (
//       <OutfitActionButton
//         product={product} list={list}/>
//     );
//   }
// };

// return (
//   <div id={product.product_id} className="card">
//     <img className="preview" src={previewImg} width="250" height="300"></img>
//     {renderActionBtn()}
//     <div className="category">CATEGORY
//       <div id="product-name">{product.name}</div>
//       <div id="product-price">{defaultPrice}</div>
//       <div>{salePrice}</div>
//       <Stars rating={rating}/>
//     </div>
//   </div>
// );
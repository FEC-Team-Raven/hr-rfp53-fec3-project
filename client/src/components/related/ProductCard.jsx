import React, {useState, useEffect, useContext} from 'react';
import Stars from '../Stars.jsx';
import RelatedActionButton from './RelatedActionButton.jsx';
import OutfitActionButton from './OutfitActionButton.jsx';

import axios from 'axios';

const sampleImg = 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Missing-image-232x150.png';

// Product Card Components:
// Category
// Name
// Price
// Rating

const ProductCard = ({ productId, list }) => {
  const [ productData, setProductData ] = useState({});
  const [ styles, setStyles ] = useState({});

  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    if (loading) {
      axios({
        method: 'GET',
        url: `products/${productId}`
      })
        .then(res => {
          setProductData(res.data);
        })
        .catch(err => console.error(err));

      axios({
        method: 'GET',
        url: `products/${productId}/styles`
      })
        .then(res => {
          setStyles(res.data);
          setLoading(false);
        })
        .catch(err => console.error(err));

    }
  });

  console.log('product data:', productData);
  console.log('styles:', styles);

  return (
    <div className="card">
      <div>image</div>
      <div>button</div>
      <div>product info
        <div>{productData.category}</div>
        <div>{productData.name}</div>
        <div>price</div>
        <div>rating</div>
      </div>
    </div>
  );

};

export default ProductCard;

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
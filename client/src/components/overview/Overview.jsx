import React from 'react';
import ProductInfo from './product-info/ProductInfo.jsx';
import ImageGallery from './image-gallery/ImageGallery.jsx';
import AddToCart from './add-to-cart/AddToCart.jsx';
import StyleSelect from './style-selector/StyleSelect.jsx';

const Overview = props => (
  <div className="overview">
    <ImageGallery product={props.product}/>
    <ProductInfo product={props.product}/>
    <StyleSelect product={props.product}/>
  </div>
);

export default Overview;

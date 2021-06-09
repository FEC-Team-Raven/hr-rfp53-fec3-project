import React from 'react';
import ProductInfo from './product-info/ProductInfo.jsx';
import ImageGallery from './image-gallery/ImageGallery.jsx';
import AddToCart from './add-to-cart/AddToCart.jsx';
import StyleSelect from './style-selector/StyleSelect.jsx';
import ProductDescription from './product-desc/ProductDescription.jsx';

const Overview = props => (
  <div id="overview">
    <ImageGallery product={props.product}/>
    <div id="product-ui">
      <ProductInfo product={props.product}/>
      <StyleSelect product={props.product}/>
      <AddToCart product={props.product}/>
    </div>
    <ProductDescription product={props.product}/>
  </div>
);

export default Overview;

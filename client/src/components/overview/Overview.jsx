import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductInfo from './product-info/ProductInfo.jsx';
import ImageGallery from './image-gallery/ImageGallery.jsx';
import AddToCart from './add-to-cart/AddToCart.jsx';
import StyleSelect from './style-selector/StyleSelect.jsx';
import ProductDescription from './product-desc/ProductDescription.jsx';


const Overview = props => {
  const [ averageRating, setAverageRating ] = useState(0);
  const [ styleIndex, setStyleIndex ] = useState(0);
  const [ styles, setStyles ] = useState([]);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    if (loading) {
      axios({
        method: 'GET',
        url: `/products/${props.productId}/styles`
      })
        .then(res => {
          setStyles(res.data.results);
          setLoading(false);
          return;
        })
        .then(() => {
          axios.get(`/reviews/meta/${props.productId}`)
            .then (res => {
              let totalRatings = Object.values(res.data.ratings).reduce((a, b) => Number(a) + Number(b));
              let totalStarCount = Object.keys(res.data.ratings).map(starCount => starCount * res.data.ratings[starCount]).reduce((a, b) => a + b);
              setAverageRating(totalStarCount / totalRatings);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.error(err);
        });
    }
  }, []);

  if (loading) {
    return (
      <div>Loading overview...</div>
    );
  }

  const changeStyle = styleIndex => {
    setStyleIndex(styleIndex);
  };

  return (
    <div id="overview">
      <ImageGallery product={props.product} images={styles[styleIndex].photos} style={styles[styleIndex]} />
      <div id="product-ui">
        <ProductInfo product={props.product} rating={averageRating} style={styles[styleIndex]}/>
        <div id="style-name"><b>STYLE &gt;</b> {styles[styleIndex].name.toUpperCase()}</div>
        <StyleSelect product={props.product} styles={styles} selectStyle={changeStyle} />
        <AddToCart product={props.product} styleSKUs={styles[styleIndex].skus}/>
      </div>
      <ProductDescription product={props.product}/>
    </div>
  );
};

export default Overview;

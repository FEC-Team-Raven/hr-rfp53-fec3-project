import React, { useEffect } from 'react';
import Thumbnail from './../shared/Thumbnail.jsx';

const ImageGallery = props => {

  return (
    <div id="image-gallery">
      <div id="image-gallery-thumbnail-list">
        <Thumbnail selected={true}/>
        <Thumbnail />
        <Thumbnail />
        <Thumbnail />
        <Thumbnail />
        <Thumbnail />
        <Thumbnail />
      </div>
      Image Gallery
    </div>
  );
};

export default ImageGallery;
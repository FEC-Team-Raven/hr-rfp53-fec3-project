import React from 'react';
import Thumbnail from './../shared/Thumbnail.jsx';

const ImageGallery = props => {
  return (
    <div id="image-gallery">
      <div id="image-gallery-thumbnail-list">
        <Thumbnail order="1"/>
        <Thumbnail order="2"/>
        <Thumbnail order="3"/>
        <Thumbnail order="4"/>
        <Thumbnail order="5"/>
        <Thumbnail order="6"/>
        <Thumbnail order="7"/>
      </div>
      Image Gallery
    </div>
  );
};

export default ImageGallery;
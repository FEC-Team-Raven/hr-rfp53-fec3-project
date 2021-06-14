import React, { useEffect, useState } from 'react';
import Thumbnail from './../shared/Thumbnail.jsx';

const ImageGallery = props => {
  const [ thumbnailListBoundaries, setThumbnailListBoundaries ] = useState(() => ({start: 0, end: 6 }));
  const [ mainImageIndex, setMainImageIndex ] = useState(0);

  const adjustThumbnailListBoundaries = direction => {
    let newStart = thumbnailListBoundaries.start + 7 * direction;
    let newEnd = thumbnailListBoundaries.end + 7 * direction;
    if (props.images.slice(newStart, newEnd + 1).filter(imageURL => imageURL !== undefined)[0] !== undefined) {
      setThumbnailListBoundaries(() => ({start: newStart, end: newEnd}));
      setMainImageIndex((direction > 0 ? thumbnailListBoundaries.start : thumbnailListBoundaries.end) + direction);
    }
  };

  const select = (event, direction) => {
    const changeSelected = (newVal, direction) => {
      if (newVal >= thumbnailListBoundaries.start && newVal <= thumbnailListBoundaries.end && props.images[newVal]) {
        // if thumbnail at index newVal is currently on-screen and does exist
        document.querySelector('#image-gallery-thumbnail-list').querySelector('.selected').classList.remove('selected');
        setMainImageIndex(newVal);
      } else if (props.images[newVal] !== undefined) {
        // if thumbnail at index newVal does exist but is off-screen
        adjustThumbnailListBoundaries(direction);
        setMainImageIndex(newVal);
      } else {
        return;
      }
    };

    if (event === null) {
      // if we clicked on a select arrow
      changeSelected(Number.parseInt(mainImageIndex) + direction, direction);
    } else {
      // if we clicked on a thumbnail to select
      if (event.target.closest('.thumbnail').classList.contains('selected')) { return; }
      changeSelected(Number.parseInt(event.target.closest('.thumbnail').dataset.index, direction));
    }
  };

  const expand = () => { document.querySelector('#image-gallery').classList.toggle('expanded'); };

  const zoom = () => {
    if (event.target.classList.contains('expanded')) {
      document.querySelector('#zoomed-modal').classList.remove('hidden');
    }
  };

  const thumbnailList = props.images.map((image, index) =>
    <Thumbnail key={index} imageURL={image} data-index={index} selectHandler={select} />
  );

  useEffect(() => {
    if (mainImageIndex > thumbnailListBoundaries.end || mainImageIndex < thumbnailListBoundaries.start) {
      setMainImageIndex(thumbnailListBoundaries.start);
    }
  }, [thumbnailListBoundaries]);

  useEffect(() => {
    // if we change the mainImage, make sure the corresponding thumbnail is selected just in case
    document.querySelector('#image-gallery').style.backgroundImage = `url(${props.images[mainImageIndex]})`;
    Array.prototype.slice.call(document.querySelector('#image-gallery-thumbnail-list').getElementsByClassName('thumbnail')).forEach(thumbnail => {
      if (Number.parseInt(thumbnail.dataset.index) === Number.parseInt(mainImageIndex)) {
        thumbnail.classList.add('selected');
      }
    });
  }, [mainImageIndex]);

  return (
    <div id="image-gallery" onClick={event => { zoom(event); }}>
      <div id="image-gallery-thumbnail-list">
        <button id="image-gallery-thumbnail-list-scroll-up" onClick={event => { adjustThumbnailListBoundaries(-1); }}>&#11105;</button>
        {thumbnailList.slice(thumbnailListBoundaries.start, thumbnailListBoundaries.end + 1)}
        <button id="image-gallery-thumbnail-list-scroll-down" onClick={event => { adjustThumbnailListBoundaries(1); }}>&#11107;</button>
      </div>
      <button id="select-image-left" onClick={() => { select(null, -1); }}>&#9664;</button>
      <div id="select-gap"></div>
      <button id="select-image-right" onClick={() => { select(null, 1); }}>&#9654;</button>
      <button id="expand-image-gallery" onClick={expand}>&#11034;</button>
      <div id="zoomed-modal"
        className="hidden"
        onClick={event => event.target.classList.add('hidden')}
        onMouseMove={event => {
          const imageGalleryWindow = document.querySelector('#image-gallery');
          let [ oldWidthRatio, oldHeightRatio ] = event.target.style.backgroundPosition.split(' ').map(ratioStr => ratioStr.split('%')[0]);
          let widthRatio = (event.clientX / imageGalleryWindow.clientWidth) * 100;
          let heightRatio = (event.clientY / imageGalleryWindow.clientHeight) * 100;
          widthRatio = Number.parseInt(widthRatio);
          heightRatio = Number.parseInt(heightRatio);
          event.target.style.backgroundPosition = `${widthRatio <= 100 ? widthRatio : oldWidthRatio}% ${heightRatio <= 100 ? heightRatio : oldHeightRatio}%`;
        }}
        style={{backgroundImage: `url(${props.images[mainImageIndex]})`}}
      ></div>
    </div>
  );
};

export default ImageGallery;
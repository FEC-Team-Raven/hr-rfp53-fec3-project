import React, { useEffect, useState } from 'react';
import Thumbnail from './../shared/Thumbnail.jsx';

const ImageGallery = props => {
  const images = [
    'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xvdGhpbmd8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1445205170230-053b83016050?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2xvdGhpbmd8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1560243563-062bfc001d68?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8Y2xvdGhpbmd8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1525562723836-dca67a71d5f1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGNsb3RoaW5nfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1571867424485-369464ed33cc?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGNsb3RoaW5nfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fGNsb3RoaW5nfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1524275539700-cf51138f679b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGNsb3RoaW5nfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1588099768531-a72d4a198538?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGNsb3RoaW5nfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGNsb3RoaW5nfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1572804013427-4d7ca7268217?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGNsb3RoaW5nfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1543508282-6319a3e2621f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjR8fGNsb3RoaW5nfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
  ];

  const [ thumbnailSetNumber, setThumbnailSetNumber ] = useState(0);
  const [ thumbnailListBoundaries, setThumbnailListBoundaries ] = useState({start: 0, end: 6});
  const [ mainImageIndex, setMainImageIndex ] = useState(0);

  const adjustThumbnailListBoundaries = direction => {
    let newStart = thumbnailListBoundaries.start + 7 * direction;
    let newEnd = thumbnailListBoundaries.end + 7 * direction;
    if (images.slice(newStart, newEnd + 1).filter(imageURL => imageURL !== undefined)[0] !== undefined) {
      setThumbnailListBoundaries({start: newStart, end: newEnd});
    }
  };

  const select = (event, direction) => {
    const changeSelected = newVal => {
      if (newVal >= thumbnailListBoundaries.start && newVal <= thumbnailListBoundaries.end && images[newVal]) {
        // if thumbnail at index newVal is currently on-screen and does exist
        document.querySelector('#image-gallery-thumbnail-list').querySelector('.selected').classList.remove('selected');
        setMainImageIndex(newVal);
      } else if (images[newVal] !== undefined) {
        // if thumbnail at index newVal does exist but is off-screen
        adjustThumbnailListBoundaries(direction);
        setMainImageIndex(newVal);
      } else {
        return;
      }
    };


    if (event === null) {
      // if we clicked on a select arrow
      changeSelected(Number.parseInt(mainImageIndex) + direction);
    } else {
      // if we clicked on a thumbnail to select
      if (event.target.closest('.thumbnail').classList.contains('selected')) { return; }
      changeSelected(event.target.closest('.thumbnail').dataset.index);
    }
  };

  const [ thumbnailList, setThumbnailList ] = useState(images.map((image, index) =>
    <Thumbnail key={index} imageURL={image} data-index={index} selectHandler={select} />
  ));

  useEffect(() => {
    // if we change the mainImage, make sure the corresponding thumbnail is selected just in case
    Array.prototype.slice.call(document.querySelector('#image-gallery-thumbnail-list').getElementsByClassName('thumbnail')).forEach(thumbnail => {
      if (Number.parseInt(thumbnail.dataset.index) === Number.parseInt(mainImageIndex)) {
        thumbnail.classList.add('selected');
      }
    });
  }, [mainImageIndex]);

  return (
    <div style={{backgroundImage: `url(${images[mainImageIndex]})`}} id="image-gallery">
      <div id="image-gallery-thumbnail-list">
        <button id="image-gallery-thumbnail-list-scroll-up" onClick={adjustThumbnailListBoundaries.bind(null, -1)}>&#11105;</button>
        {thumbnailList.slice(thumbnailListBoundaries.start, thumbnailListBoundaries.end + 1)}
        <button id="image-gallery-thumbnail-list-scroll-down" onClick={adjustThumbnailListBoundaries.bind(null, 1)}>&#11107;</button>
      </div>
      <button id="select-image-left" onClick={select.bind(null, null, -1)}>&#9664;</button>
      <div id="select-gap"></div>
      <button id="select-image-right" onClick={select.bind(null, null, 1)}>&#9654;</button>
    </div>
  );
};

export default ImageGallery;
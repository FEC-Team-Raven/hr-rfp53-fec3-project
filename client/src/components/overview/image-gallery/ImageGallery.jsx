import React, { useEffect, useState } from 'react';
import Thumbnail from './../shared/Thumbnail.jsx';

let currentLowestThumbnailIndex = 0;
let currentHighestThumbnailIndex = 6;

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

  const [ thumbnailList, setThumbnailList ] = useState(images.slice(0, 7));
  const [ mainImageIndex, setMainImageIndex ] = useState(0);

  const select = event => {
    if (event.target.closest('.thumbnail').classList.contains('selected')) { return; }
    document.querySelector('#image-gallery-thumbnail-list').querySelector('.selected').classList.remove('selected');
    setMainImageIndex(event.target.closest('.thumbnail').dataset.index);
  };

  const getThumbnailList = (index, direction) => {
    let preGetIndexes = [currentLowestThumbnailIndex, currentHighestThumbnailIndex];
    if (direction === 1) {
      currentLowestThumbnailIndex += 7;
      currentHighestThumbnailIndex += 7;
    } else {
      currentHighestThumbnailIndex -= 7;
      currentLowestThumbnailIndex -= 7;
    }
    let newImageList = images.slice(currentLowestThumbnailIndex, currentHighestThumbnailIndex + 1).filter(imageURL => imageURL !== undefined);
    if (newImageList[0] !== undefined) {
      // if we got any new images
      return newImageList;
    } else {
      // if we're out of images
      [ currentLowestThumbnailIndex, currentHighestThumbnailIndex ] = preGetIndexes;
      return images.slice(preGetIndexes[0], preGetIndexes[1] + 1);
    }
  };

  useEffect(() => {
    setMainImageIndex(0);
    Array.prototype.slice.call(document.getElementsByClassName('thumbnail')).forEach(thumbnail => thumbnail.classList.remove('selected'));
    document.querySelector('#image-gallery').getElementsByClassName('thumbnail')[0].classList.add('selected');
  }, [thumbnailList]);

  useEffect(() => {
    Array.prototype.slice.call(document.querySelector('#image-gallery-thumbnail-list').getElementsByClassName('thumbnail')).forEach(thumbnail => {
      if (Number.parseInt(thumbnail.dataset.index) === Number.parseInt(mainImageIndex)) {
        thumbnail.classList.add('selected');
      }
    });
  }, [mainImageIndex]);

  return (
    <div style={{backgroundImage: `url(${thumbnailList[mainImageIndex]})`}} id="image-gallery">
      <div id="image-gallery-thumbnail-list">
        <button id="image-gallery-thumbnail-list-scroll-up" onClick={setThumbnailList
          .bind(null, getThumbnailList
            .bind(null, currentHighestThumbnailIndex, -1))
        }>&#11105;</button>
        {thumbnailList.map((thumbnail, index) => <Thumbnail key={index} selectHandler={select} imageURL={thumbnail} data-index={index} />)}
        <button id="image-gallery-thumbnail-list-scroll-down" onClick={setThumbnailList
          .bind(null, getThumbnailList
            .bind(null, currentHighestThumbnailIndex, 1))
        }>&#11107;</button>
      </div>
      <button id="select-image-left">&#9664;</button>
      <button id="select-image-right">&#9654;</button>
    </div>
  );
};

export default ImageGallery;
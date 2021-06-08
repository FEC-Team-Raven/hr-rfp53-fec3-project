import React, {useState} from 'react';
import Stars from '../Stars.jsx';


const ReviewTile = (props) => {
  const [expandBody, setExpandBody] = useState(false);
  const [displayModal, setDisplayModal] = useState(false);
  const [modalImage, setModalImage] = useState('');

  var renderDate = (date) => {
    var date = new Date(date);
    var options = {year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  //Add check icon
  var renderRecommend = recommend => {
    if (recommend) {
      return <div>
        <i class="fas fa-check"></i>
        I recommend this product
      </div>;
    }
  };

  var renderResponse = response => {
    if (response) {
      return (
        <div className="response">
          Response: <br/>
          {response}
        </div>
      );
    }
  };

  var renderBody = body => {
    if (body.length > 250 && !expandBody) {
      var display = body.slice(0, 250) + '...';
      return (
        <div>
          {display} <br />
          <a className="showMore" onClick={() => setExpandBody(true)}>Show More</a>
        </div>
      );
    }
    return <div>{body}</div>;
  };

  var renderImageModal = () => {
    if (displayModal) {
      return (
        <div className="imageModal">
          <span className="close" onClick={() => setDisplayModal(false)}>X</span>
          <img className="modal-content" src={modalImage}></img>
        </div>
      );
    }
  };

  var updateModal = url => {
    setModalImage(url);
    setDisplayModal(true);
  };

  return (
    <div className="reviewTile">
      <div className="reviewRow between">
        <Stars rating={props.review.rating} />
        <div>{props.review.reviewer_name}, {renderDate(props.review.date)}</div>
      </div>
      {renderBody(props.review.body)}
      {renderRecommend(props.review.recommend)}
      {renderResponse('TEST RESPONSE')}
      {props.review.photos.map(photo => {
        return <img className="reviewImage" src={photo.url} onClick={() => updateModal(photo.url)}></img>;
      })}
      {renderImageModal()}
      <div className="reviewRow">
        Helpful?
        <button>Yes ({props.review.helpfulness})</button>
        <button>No</button>
      </div>
    </div>
  );
};

export default ReviewTile;

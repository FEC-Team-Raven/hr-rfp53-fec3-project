import React, {useState, useEffect} from 'react';
import Stars from '../Stars.jsx';
import axios from 'axios';


const ReviewTile = (props) => {
  const [helpfulness, setHelpfullness] = useState(props.review.helpfulness);
  const [voted, setVoted] = useState(false);
  const [expandBody, setExpandBody] = useState(false);
  const [displayModal, setDisplayModal] = useState(false);
  const [modalImage, setModalImage] = useState('');

  useEffect(() => {
    setHelpfullness(props.review.helpfulness);
  }, [props]);

  var renderDate = (date) => {
    var date = new Date(date);
    var options = {year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  var renderRecommend = recommend => {
    if (recommend) {
      return <div>
        <i className="fas fa-check" style={{'margin-right': '5px'}}></i>
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

  var postHelpfulness = () => {
    console.log('HELLO');
    if (!voted) {
      console.log('HELLO');
      setVoted(true);
      axios({
        url: 'http://localhost:3000/reviews/helpful',
        method: 'PUT',
        params: {
          reviewId: props.review.review_id,
        }
      })
        .then(() => {
          setHelpfullness(helpfulness + 1);
        })
        .catch(err => {
          console.log(err);
        });
    }
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
        <button onClick={() => postHelpfulness()} style={{'margin-left': '5px'}}>Yes ({helpfulness})</button>
      </div>
    </div>
  );
};

export default ReviewTile;

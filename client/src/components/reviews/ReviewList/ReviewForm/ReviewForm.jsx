import React, {useState, useEffect} from 'react';
import StarSelector from './StarSelector.jsx';
import CharacteristicInput from './CharacteristicInput.jsx';
import axios from 'axios';

const ReviewForm = props => {
  const [starRating, setStarRating] = useState(0);
  const [characteristics, setCharacteristics] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (props.productId !== 0) {
      getMetaData(props.productId);
    }
  }, [props.productId]);

  var getMetaData = reviewId => {
    axios('http://localhost:3000/reviews/meta', {
      params: {
        productId: props.productId
      }
    })
      .then(meta => {
        setCharacteristics(meta.data.characteristics);
        setLoading(false);
      });
  };

  var ratingToWidth = rating => {
    rating = Math.floor(rating / 0.25) * 0.25;
    var decimal = rating - Math.floor(rating);
    rating *= 20;
    if (decimal === 0.25) {
      rating += 3;
    } else if (decimal === 0.75) {
      rating -= 3;
    }
    return rating;
  };

  var renderRatingMessage = () => {
    if (starRating === 1) {
      return <span>Poor</span>;
    } else if (starRating === 2) {
      return <span>Fair</span>;
    } else if (starRating === 3) {
      return <span>Average</span>;
    } else if (starRating === 4) {
      return <span>Good</span>;
    } else if (starRating === 5) {
      return <span>Great</span>;
    }
  };

  var renderCharacteristics = () => {
    if (characteristics) {
      return Object.keys(characteristics).map(characteristic => {
        return <CharacteristicInput characteristic={characteristic} />;
      });
    }
  };

  var handleSubmit = event => {
    event.preventDefault();
  };

  var renderForm = () => {
    if (!loading) {
      return (
        <form onSubmit={handleSubmit}>
          <input id="star" name="star" type="hidden" value={starRating}></input>
          <div className="reviewRow">
            <span>Select a rating: </span>
            <span className="starContainer" >
              <StarSelector setStarRating={setStarRating}/>
            </span>
            {renderRatingMessage()}
          </div>
          <div>
            Do you recommend this product?
            <input id="recommendedYes" name="recommended" type="radio" value={true}></input>
            <label for="recommendedYes">Yes</label>
            <input id="recommendedNo" name="recommended" type="radio" value={false}></input>
            <label for="recommendedNo">No</label>
          </div>
          {renderCharacteristics()}
          <div>
            <label for="summary">Review Summary</label>
            <input id="summary" name="summary" type="text" maxlength="60"></input>
          </div>
          <div>
            {/* FIGURE OUT HOW TO PASS INTO FORM */}
            <textarea className="reviewBody" rows="5" columns="100" wrap="hard" maxlength="1000" placeholder="Why did you like the product or not?"></textarea>
          </div>

          <div>
            Upload images <br />
            <input id="photos" name="photos" type="file" accept="image"></input>
          </div>

          <div>
            <label for="nickname">Nickname: </label>
            <input type="text" id="nickname" name="nickname" maxlength="60"></input>
          </div>
          <div>
            <label for="email">Email: </label>
            <input type="text" id="email" name="email" maxlength="60"></input>
          </div>
          <input type="submit"></input>
        </form>
      );
    }
  };

  return (
    <div className="reviewFormModal">
      <span className="close" onClick={() => props.setDisplayFormModal(false)}>X</span>
      <div className="reviewFormContainer">
        {renderForm()}
      </div>
    </div>
  );
};

export default ReviewForm;

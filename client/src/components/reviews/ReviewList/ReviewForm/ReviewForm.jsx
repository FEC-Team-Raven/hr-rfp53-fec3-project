import React, {useState, useEffect, useContext} from 'react';
import StarSelector from './StarSelector/StarSelector.jsx';
import CharacteristicInput from './CharacteristicInput/CharacteristicInput.jsx';
import axios from 'axios';
import {ReviewContext} from '../../Reviews.jsx';

const ReviewForm = props => {
  const [starRating, setStarRating] = useState(0);
  const [displayRequireStars, setDisplayRequireStars] = useState(false);
  const [recommended, setRecommended] = useState(null);
  const [summary, setSummary] = useState('');
  const [body, setBody] = useState('');
  const [photos, setPhotos] = useState([]);
  const [displayPhotos, setDisplayPhotos] = useState([]);
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');

  const productCharacteristics = useContext(ReviewContext).metaData[0].characteristics;
  var characteristicRatings = {
    Size: useState(0),
    Width: useState(0),
    Comfort: useState(0),
    Quality: useState(0),
    Length: useState(0),
    Fit: useState(0)
  };

  var renderRatingMessage = () => {
    if (starRating === 1) {
      return <div className="rating">Poor</div>;
    } else if (starRating === 2) {
      return <div className="rating">Fair</div>;
    } else if (starRating === 3) {
      return <div className="rating">Average</div>;
    } else if (starRating === 4) {
      return <div className="rating">Good</div>;
    } else if (starRating === 5) {
      return <div className="rating">Great</div>;
    }
  };

  var renderCharacteristics = () => {
    return Object.keys(productCharacteristics).map(characteristic => {
      return <CharacteristicInput characteristic={characteristic} setCharacteristicValue={characteristicRatings[characteristic][1]}/>;
    });
  };

  var renderRequireRating = () => {
    if (displayRequireStars) {
      return <div className="rating">Please select a rating</div>;
    }
  };

  var renderBodyMessage = () => {
    if (body.length < 50) {
      return <div>Minimum required characters left: [{50 - body.length}]</div>;
    } else {
      return <div>Minimum reached</div>;
    }
  };

  var handleSubmit = event => {
    event.preventDefault();
    if (starRating === 0) {
      setDisplayRequireStars(true);
      return;
    }
    if (body.length < 50) {
      return;
    }

    var charInputs = {};
    for (var key in productCharacteristics) {
      charInputs[productCharacteristics[key].id] = characteristicRatings[key][0];
    }

    var formData = new FormData();
    formData.append('product_id', props.productId);
    formData.append('rating', starRating);
    formData.append('summary', summary);
    formData.append('body', body);
    formData.append('recommend', recommended);
    formData.append('name', nickname);
    formData.append('email', email);
    formData.append('characteristics', JSON.stringify(charInputs));
    for (var i = 0; i < photos.length; i++) {
      formData.append(`file${i}`, photos[i]);
    }

    axios({
      method: 'POST',
      url: 'http://localhost:3000/reviews',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(() => {
        props.setDisplayFormModal(false);
      });
  };

  var handleImageUpload = event => {
    if (event.target.files.length <= 5) {
      var images = [];
      for (var i = 0; i < event.target.files.length; i++) {
        images.push(URL.createObjectURL(event.target.files[i]));
      }
      setDisplayPhotos(images);
      setPhotos(event.target.files);
    }
  };

  return (
    <div className="reviewFormModal">
      <div className="reviewFormContainer">
        <i className="fas fa-times closeForm" onClick={() => props.setDisplayFormModal(false)}></i>
        <form className="reviewForm" onSubmit={handleSubmit}>
          <div className="reviewRow">
            <div className="rating">Select a rating: </div>
            <div className="starContainer" >
              <input type="hidden" required></input>
              <StarSelector setStarRating={setStarRating} setDisplayRequireStars={setDisplayRequireStars}/>
            </div>
            {renderRatingMessage()}
            {renderRequireRating()}
          </div>

          <div>
            Do you recommend this product?
            <input
              id="recommendedYes"
              name="recommended"
              type="radio"
              value={true}
              onChange={(e) => setRecommended(e.target.value)}
              required
            />
            <label for="recommendedYes">Yes</label>
            <input
              id="recommendedNo"
              name="recommended"
              type="radio"
              value={false}
              onChange={(e) => setRecommended(e.target.value)}
              required
            />
            <label for="recommendedNo">No</label>
          </div>

          {renderCharacteristics()}

          <div>
            <label for="summary">Review Summary</label>
            <input
              id="summary"
              name="summary"
              type="text"
              maxlength="60"
              onChange={e => setSummary(e.target.value)}
            />
          </div>

          <div>
            <textarea
              className="reviewBody"
              rows="5"
              columns="100"
              wrap="hard"
              maxlength="1000"
              placeholder="Why did you like the product or not?"
              onChange={e => setBody(e.target.value)}
              required
            />
            {renderBodyMessage()}
          </div>

          <div>
            Upload up to 5 images <br />
            <input
              id="photos"
              name="photos"
              type="file"
              accept="image/png, image/jpeg"
              onChange={handleImageUpload}
              multiple
            />
            <div className="reviewRow">
              {displayPhotos.map(photo => {
                return <img className="reviewImage" src={photo}></img>;
              })}
            </div>
          </div>

          <div>
            <label for="nickname">Nickname: </label>
            <input
              type="text"
              id="nickname"
              name="nickname"
              maxlength="60"
              onChange={e => setNickname(e.target.value)}
              placeholder="Example: jackson11!"
              required
            />
            <div>For privacy reasons, do not use your full name or email address</div>
          </div>

          <div>
            <label for="email">Email: </label>
            <input
              type="email"
              id="email"
              name="email"
              maxlength="60"
              onChange={e => setEmail(e.target.value)}
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
              placeholder="Example: jackson11@email.com"
              required
            />
            <div>For authentication reasons, you will not be emailed</div>
          </div>

          <input type="submit" className="reviewButton" />
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;

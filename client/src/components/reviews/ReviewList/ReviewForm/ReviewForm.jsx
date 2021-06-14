import React, {useState, useEffect} from 'react';
import StarSelector from './StarSelector.jsx';
import CharacteristicInput from './CharacteristicInput.jsx';
import axios from 'axios';

const ReviewForm = props => {
  const [productCharacteristics, setProductCharacteristics] = useState({});
  const [loading, setLoading] = useState(true);
  const [starRating, setStarRating] = useState(0);
  const [displayRequireStars, setDisplayRequireStars] = useState(false);
  const [recommended, setRecommended] = useState(null);
  var characteristicRatings = {
    Size: useState(0),
    Width: useState(0),
    Comfort: useState(0),
    Quality: useState(0),
    Length: useState(0),
    Fit: useState(0)
  };
  const [summary, setSummary] = useState('');
  const [body, setBody] = useState('');
  const [photos, setPhotos] = useState([]);
  const [displayPhotos, setDisplayPhotos] = useState([]);
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');

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
        setProductCharacteristics(meta.data.characteristics);
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



  var renderForm = () => {
    if (!loading) {
      return (
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
            <input id="recommendedYes" name="recommended" type="radio" value={true} onChange={(e) => setRecommended(e.target.value)} required></input>
            <label for="recommendedYes">Yes</label>
            <input id="recommendedNo" name="recommended" type="radio" value={false} onChange={(e) => setRecommended(e.target.value)} required></input>
            <label for="recommendedNo">No</label>
          </div>
          {renderCharacteristics()}
          <div>
            <label for="summary">Review Summary</label>
            <input id="summary" name="summary" type="text" maxlength="60" onChange={e => setSummary(e.target.value)}></input>
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
            >
            </textarea>
            {renderBodyMessage()}
          </div>

          <div>
            Upload up to 5 images <br />
            <input id="photos" name="photos" type="file" accept="image/png, image/jpeg" onChange={handleImageUpload} multiple></input>
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
            >
            </input>
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
            >
            </input>
            <div>For authentication reasons, you will not be emailed</div>
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

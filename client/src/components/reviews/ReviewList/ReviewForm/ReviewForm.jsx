import React, {useState, useEffect} from 'react';
import StarSelector from './StarSelector.jsx';
import CharacteristicInput from './CharacteristicInput.jsx';
import axios from 'axios';

const ReviewForm = props => {
  const [productCharacteristics, setProductCharacteristics] = useState({});
  const [loading, setLoading] = useState(true);
  const [starRating, setStarRating] = useState(0);
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
        console.log(meta.data.characteristics);
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
    return Object.keys(productCharacteristics).map(characteristic => {
      return <CharacteristicInput characteristic={characteristic} setCharacteristicValue={characteristicRatings[characteristic][1]}/>;
    });
  };

  var handleSubmit = event => {
    event.preventDefault();
    var charInputs = {};
    for (var key in productCharacteristics) {
      charInputs[productCharacteristics[key].id] = characteristicRatings[key][0];
    }
    console.log(charInputs);
    var formData = new FormData();
    formData.append('product_id', props.productId);
    formData.append('rating', starRating);
    formData.append('summary', summary);
    formData.append('body', body);
    formData.append('recommended', recommended);
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
      console.log(event.target.files[0]);
    }
  };

  var renderForm = () => {
    if (!loading) {
      return (
        <form onSubmit={handleSubmit}>
          <div className="reviewRow">
            <span>Select a rating: </span>
            <span className="starContainer" >
              <StarSelector setStarRating={setStarRating}/>
            </span>
            {renderRatingMessage()}
          </div>

          <div>
            Do you recommend this product?
            <input id="recommendedYes" name="recommended" type="radio" value={true} onChange={(e) => setRecommended(e.target.value)}></input>
            <label for="recommendedYes">Yes</label>
            <input id="recommendedNo" name="recommended" type="radio" value={false} onChange={(e) => setRecommended(e.target.value)}></input>
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
            >
            </textarea>
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
            <input type="text" id="nickname" name="nickname" maxlength="60" onChange={e => setNickname(e.target.value)}></input>
          </div>

          <div>
            <label for="email">Email: </label>
            <input type="text" id="email" name="email" maxlength="60" onChange={e => setEmail(e.target.value)}></input>
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

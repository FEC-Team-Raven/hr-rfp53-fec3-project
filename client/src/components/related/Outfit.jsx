import React, {useState, useEffect, useContext} from 'react';
import ProductCard from './ProductCard.jsx';

import axios from 'axios';

class Outfit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: false,
      outfitIds: [],
      outfits: []
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      isClicked: true
    });
    this.addOutfit();
  }

  addOutfit() {
    if (this.state.outfitIds.includes(this.props.productId)) {
      console.log('Outfit already added!');
    } else {
      if (this.state.isClicked) {
        this.setState({
          isClicked: false,
        });
        axios('http://localhost:3000/product', {headers: {'productId': this.props.productId}})
          .then(response => {
            this.setState({
              outfitIds: [...this.state.outfits, response.data.id],
              outfits: [...this.state.outfits, response.data],
            });
          });
      }
    }
  }

  render() {
    return (
      <div className="grid-container">
        <div className="card addOutfit">
          <button onClick={this.handleClick}>+</button>
          <h2>Add to Outfit</h2>
        </div>
        {this.state.outfits.map(outfit =>
          <ProductCard product={outfit} key={outfit.id}/>)
        }
      </div>
    );
  }
}

// const Outfit = ({productId}) => {
//   const [outfits, setOutfits] = useState([]);
//   // const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     function addOutfit() {
//       console.log('hello');
//     }
//   }, [outfits]);

//   // useEffect(() => {
//   //   // addOutfit button:
//   //     // Adds current product to outfit state
//   //       // Retrieve current product information
//   //       // Adds that product info to the outfit state
//   //       // Render outfit state

//   //   function addOutfit(outfit) {
//   //     setOutfits(outfit);
//   //   };

//   //   // if (loading) {
//   //   //   setLoading(false);
//   //   //   axios('http://localhost:3000/product', {headers: {'productId': productId}})
//   //   //     .then(response => {
//   //   //       setOutfits(response.data);
//   //   //       return response.data;
//   //   //     });
//   //   // }
//   // });

//   return (
//     <div>
//       <div className="card addOutfit">
//         <button>+</button>
//         <h2>Add to Outfit</h2>
//       </div>
//       {outfits.map(outfit =>
//         <Product product={outfit}/>)
//       }
//     </div>
//   );
// };

export default Outfit;

// Card width x height: 250px, 500px